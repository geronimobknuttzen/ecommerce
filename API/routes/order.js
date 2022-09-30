const express = require("express");
const router = express.Router();
const { database } = require("../config/helpers");

const { transporter } = require("../config/mailer");

//GET ALL ORDERS

router.get("/", (req, res) => {
  database
    .table("orders_details as od")
    .join([
      {
        table: "orders as o",
        on: "o.id = od.order_id",
      },
      {
        table: "products as p",
        on: "p.id = od.product_id",
      },
    ])
    .withFields([
      "o.id",
      "p.title as name",
      "p.description",
      "p.price",
      "p.image",
    ])
    .sort({ id: -1 })
    .getAll()
    .then((orders) => {
      if (orders.length > 0) {
        res.status(200).json(orders);
      } else {
        res.json({ message: "No tiene compras pendientes" });
      }
    })
    .catch((err) => console.log(err));
});
//GET ONE ORDER
router.get("/:id", (req, res) => {
  const orderId = req.params.id;

  database
    .table("orders_details as od")
    .join([
      {
        table: "orders as o",
        on: "o.id = od.order_id",
      },
      {
        table: "products as p",
        on: "p.id = od.product_id",
      },
    ])
    .withFields([
      "o.id",
      "p.title as name",
      "p.description",
      "p.price",
      "p.image",
    ])
    .filter({ "o.id": orderId })
    .getAll()
    .then((orders) => {
      if (orders.length > 0) {
        res.status(200).json(orders);
      } else {
        res.json({ message: "No tiene compras pendientes" });
      }
    })
    .catch((err) => console.log(err));
});

/*PLACE A NEW ORDER*/
router.post("/new", (req, res) => {
  let { email, name, products } = req.body;

  if (email !== null && name !== null) {
    database
      .table("orders")
      .insert({
        email: email,
        fname: name,
      })
      .then((newOrderId) => {
        if (newOrderId.insertId > 0) {
          console.log(newOrderId);
          products.forEach(async (products) => {
            let data = await database
              .table("products as p")
              .filter({ "p.id": products.id })
              .withFields(["p.quantity"])
              .get();

            let inCart = products.incart;
            // Deducir la orden de la base de datos
            if (data.quantity > 0) {
              data.quantity = data.quantity - inCart;

              if (data.quantity < 0) {
                data.quantity = 0;
              }
            } else {
              data.quantity = 0;
            }
            // INSERTAR LOS DETALLES DE LA ORDEN
            let emailData1 = {
              from: '"Preset Adquirido" <presets@anitathomas.com.ar>',
              to: `${email}`,
              subject: "Gracias por adquirir Nature Preset Pack",
              html: `<p><span style="font-size:16px">Hola ${name},</span><br />
                                &iexcl;Gracias por tu compra!<br />
                                <br />
                                Ac&aacute; vas a encontrar un link de Dropbox , tocalo y te va a llevar a la carpeta donde est&aacute;n tus presets [Nature Pack]<br />
                                <br />
                                <div style="display: flex; justify-content: center;">
                                  <a href="https://www.dropbox.com/sh/n427m4wmgp08zuk/AABlN6YGSkn_XlVlbnhU9ZSIa?dl=1" target="_blank" rel="noopener">
                                    <button style="width: 150px; height: 50px ;border-radius: 5%; border:none; background-color: black; color: white; height: 25px; font-size: 14px; font-family: Arial; font-weight: 500; cursor: hand;">
                                      DESCARGAR</button>
                                    </a><br /><br /><br />
                                </div>
                                * link de descarga valido por 5 d&iacute;as*<br />
                                <br />
                                Tambi&eacute;n te dejo el link al video instructivo para que puedas descargar todo y ya puedas empezar a editar.&nbsp;<br />
                                <a href="https://youtu.be/3DpK-1ZOZ4g" target="_blank">https://youtu.be/3DpK-1ZOZ4g</a><br />
                                <br />
                                <strong>TIPS:</strong><br />
                                * Desc&aacute;rgate la app Adobe Lightroom para celular (No hace falta tener una suscripcion paga para usar los presets)<br />
                                <br />
                                * Cuanto m&aacute;s conocimiento de Lightroom tengas, mas vas a poder aprovechar los presets. En el video te doy unas ideas y despu&eacute;s es cuesti&oacute;n de ir probando.&nbsp;<br />
                                <br />
                                * Si un preset no se ajusta bien a tu foto, probablemente sea porque la foto que estas editando tiene mucha o muy poca luz o saturaci&oacute;n. Prob&aacute; ajustando esos valores para que quede perfecta.&nbsp;<br />
                                <br />
                                * Para tener un feed de IG prolijo, lo ideal es que encuentres uno o dos presets que m&aacute;s te gustan y los apliques a todas tus fotos.&nbsp;<br />
                                <br />
                                <br />
                                &iexcl;Espero que disfrutes estos Presets tanto como yo!&nbsp;<br />
                                Si subis a tus historias una foto del antes y despu&eacute;s con los presets taggeame en ambas as&iacute; puedo compartirlo&nbsp;<img alt="😍" src="https://fonts.gstatic.com/s/e/notoemoji/14.0/1f60d/32.png" /><br />
                                <br />
                                Cualquier consulta que tengas, podes responder a este mail.<br />
                                <br />
                                <strong>Te mando un saludo,<br />
                                <span style="font-size:16px">Anita</span>.</strong><br />
                                <br />
                                <br />
                                <span style="font-size:10px"><em>Las compras digitales no tienen devoluci&oacute;n.&nbsp;<br />
                                La comercializaci&oacute;n de los productos Anita Thomas sin autorizaci&oacute;n est&aacute; prohibida.</em></span></p>
                                `,
            };
            let emailData2 = {
              from: '"Preset Adquirido" <presets@anitathomas.com.ar>',
              to: `${email}`,
              subject: "Gracias por adquirir Original Preset Pack",
              html: `<p><span style="font-size:16px">Hola ${name},</span><br />
                                &iexcl;Gracias por tu compra!<br />
                                <br />
                                Ac&aacute; vas a encontrar un link de Dropbox , tocalo y te va a llevar a la carpeta donde est&aacute;n tus presets [Original Pack]<br />
                                <br />
                                <div style="display: flex; justify-content: center;">
                                  <a href="https://www.dropbox.com/sh/g390d3f48y92n7e/AADabcbMUaxYAd4agHOAnGYRa?dl=1" target="_blank">
                                    <button style="width: 150px; height: 50px ;border-radius: 5%; border:none; background-color: black; color: white; height: 25px; font-size: 14px; font-family: Arial; font-weight: 500; cursor: hand;">
                                      DESCARGAR
                                    </button>
                                  </a><br /><br /><br />
                                </div>
                                * link de descarga valido por 5 d&iacute;as*<br />
                                <br />
                                Tambi&eacute;n te dejo el link al video instructivo para que puedas descargar todo y ya puedas empezar a editar.&nbsp;<br />
                                <a href="https://youtu.be/3DpK-1ZOZ4g" target="_blank">https://youtu.be/3DpK-1ZOZ4g</a><br />
                                <br />
                                <strong>TIPS:</strong><br />
                                * Desc&aacute;rgate la app Adobe Lightroom para celular (No hace falta tener una suscripcion paga para usar los presets)<br />
                                <br />
                                * Cuanto m&aacute;s conocimiento de Lightroom tengas, mas vas a poder aprovechar los presets. En el video te doy unas ideas y despu&eacute;s es cuesti&oacute;n de ir probando.&nbsp;<br />
                                <br />
                                * Si un preset no se ajusta bien a tu foto, probablemente sea porque la foto que estas editando tiene mucha o muy poca luz o saturaci&oacute;n. Prob&aacute; ajustando esos valores para que quede perfecta.&nbsp;<br />
                                <br />
                                * Para tener un feed de IG prolijo, lo ideal es que encuentres uno o dos presets que m&aacute;s te gustan y los apliques a todas tus fotos.&nbsp;<br />
                                <br />
                                <br />
                                &iexcl;Espero que disfrutes estos Presets tanto como yo!&nbsp;<br />
                                Si subis a tus historias una foto del antes y despu&eacute;s con los presets taggeame en ambas as&iacute; puedo compartirlo&nbsp;<img alt="😍" src="https://fonts.gstatic.com/s/e/notoemoji/14.0/1f60d/32.png" /><br />
                                <br />
                                Cualquier consulta que tengas, podes responder a este mail.<br />
                                <br />
                                <strong>Te mando un saludo,<br />
                                <span style="font-size:16px">Anita</span>.</strong><br />
                                <br />
                                <br />
                                <span style="font-size:10px"><em>Las compras digitales no tienen devoluci&oacute;n.&nbsp;<br />
                                La comercializaci&oacute;n de los productos Anita Thomas sin autorizaci&oacute;n est&aacute; prohibida.</em></span></p>
                                `,
            };
            let emailData3 = {
              from: '"Preset Adquirido" <presets@anitathomas.com.ar>',
              to: `${email}`,
              subject: "Gracias por adquirir Movie Preset Pack",
              html: `<p><span style="font-size:16px">Hola ${name},</span><br />
                                &iexcl;Gracias por tu compra!<br />
                                <br />
                                Ac&aacute; vas a encontrar un link de Dropbox , tocalo y te va a llevar a la carpeta donde est&aacute;n tus presets [Movie Pack]<br />
                                <br />
                                <div style="display: flex; justify-content: center;">
                                  <a href="https://www.dropbox.com/sh/g390d3f48y92n7e/AADabcbMUaxYAd4agHOAnGYRa?dl=1" target="_blank">
                                    <button style="width: 150px; height: 50px ;border-radius: 5%; border:none; background-color: black; color: white; height: 25px; font-size: 14px; font-family: Arial; font-weight: 500; cursor: hand;">
                                      DESCARGAR
                                    </button>
                                  </a><br /><br /><br />
                                </div>
                                * link de descarga valido por 5 d&iacute;as*<br />
                                <br />
                                Tambi&eacute;n te dejo el link al video instructivo para que puedas descargar todo y ya puedas empezar a editar.&nbsp;<br />
                                <a href="https://youtu.be/3DpK-1ZOZ4g" target="_blank">https://youtu.be/3DpK-1ZOZ4g</a><br />
                                <br />
                                <strong>TIPS:</strong><br />
                                * Desc&aacute;rgate la app Adobe Lightroom para celular (No hace falta tener una suscripcion paga para usar los presets)<br />
                                <br />
                                * Cuanto m&aacute;s conocimiento de Lightroom tengas, mas vas a poder aprovechar los presets. En el video te doy unas ideas y despu&eacute;s es cuesti&oacute;n de ir probando.&nbsp;<br />
                                <br />
                                * Si un preset no se ajusta bien a tu foto, probablemente sea porque la foto que estas editando tiene mucha o muy poca luz o saturaci&oacute;n. Prob&aacute; ajustando esos valores para que quede perfecta.&nbsp;<br />
                                <br />
                                * Para tener un feed de IG prolijo, lo ideal es que encuentres uno o dos presets que m&aacute;s te gustan y los apliques a todas tus fotos.&nbsp;<br />
                                <br />
                                <br />
                                &iexcl;Espero que disfrutes estos Presets tanto como yo!&nbsp;<br />
                                Si subis a tus historias una foto del antes y despu&eacute;s con los presets taggeame en ambas as&iacute; puedo compartirlo&nbsp;<img alt="😍" src="https://fonts.gstatic.com/s/e/notoemoji/14.0/1f60d/32.png" /><br />
                                <br />
                                Cualquier consulta que tengas, podes responder a este mail.<br />
                                <br />
                                <strong>Te mando un saludo,<br />
                                <span style="font-size:16px">Anita</span>.</strong><br />
                                <br />
                                <br />
                                <span style="font-size:10px"><em>Las compras digitales no tienen devoluci&oacute;n.&nbsp;<br />
                                La comercializaci&oacute;n de los productos Anita Thomas sin autorizaci&oacute;n est&aacute; prohibida.</em></span></p>
                                `,
            };
            if (products.id == 1) {
              transporter.sendMail(emailData1, (error) => {
                if (error) {
                  console.log("Error al enviar email", error);
                } else {
                  console.log("Correo enviado correctamente");
                }
                transporter.close();
              });
            } else if (products.id == 2) {
              transporter.sendMail(emailData2, (error) => {
                if (error) {
                  console.log("Error al enviar email", error);
                } else {
                  console.log("Correo enviado correctamente");
                }
                transporter.close();
              });
            } else if (products.id == 3) {
              transporter.sendMail(emailData3, (error) => {
                if (error) {
                  console.log("Error al enviar email", error);
                } else {
                  console.log("Correo enviado correctamente");
                }
                transporter.close();
              });
            } else if (
              products.id == 1 &&
              products.id == 2 &&
              products.id == 3
            ) {
              transporter.sendMail(emailData1, (error) => {
                if (error) {
                  console.log("Error al enviar email", error);
                } else {
                  console.log("Correo enviado correctamente");
                }
                transporter.close();
              });
              transporter.sendMail(emailData2, (error) => {
                if (error) {
                  console.log("Error al enviar email", error);
                } else {
                  console.log("Correo enviado correctamente");
                }
                transporter.close();
              });
              transporter.sendMail(emailData3, (error) => {
                if (error) {
                  console.log("Error al enviar email", error);
                } else {
                  console.log("Correo enviado correctamente");
                }
                transporter.close();
              });
            } else if (products.id == 1 && products.id == 2) {
              transporter.sendMail(emailData1, (error) => {
                if (error) {
                  console.log("Error al enviar email", error);
                } else {
                  console.log("Correo enviado correctamente");
                }
                transporter.close();
              });
              transporter.sendMail(emailData2, (error) => {
                if (error) {
                  console.log("Error al enviar email", error);
                } else {
                  console.log("Correo enviado correctamente");
                }
                transporter.close();
              });
            } else if (products.id == 2 && products.id == 3) {
              transporter.sendMail(emailData2, (error) => {
                if (error) {
                  console.log("Error al enviar email", error);
                } else {
                  console.log("Correo enviado correctamente");
                }
                transporter.close();
              });
              transporter.sendMail(emailData3, (error) => {
                if (error) {
                  console.log("Error al enviar email", error);
                } else {
                  console.log("Correo enviado correctamente");
                }
                transporter.close();
              });
            } else if (products.id == 1 && products.id == 3) {
              transporter.sendMail(emailData1, (error) => {
                if (error) {
                  console.log("Error al enviar email", error);
                } else {
                  console.log("Correo enviado correctamente");
                }
                transporter.close();
              });
              transporter.sendMail(emailData3, (error) => {
                if (error) {
                  console.log("Error al enviar email", error);
                } else {
                  console.log("Correo enviado correctamente");
                }
                transporter.close();
              });
            }

            database
              .table("orders_details")
              .insert({
                order_id: newOrderId.insertId,
                product_id: products.id,
                quantity: inCart,
              })
              .then((newId) => {
                database
                  .table("products")
                  .filter({ id: products.id })
                  .update({ quantity: data.quantity })
                  .then((successNum) => {})
                  .catch((error) => console.log(error));
              })
              .catch((error) => console.log(error));
            console.log(products.id);
          });
        } else {
          res.json({
            message:
              "Falla al agregar los detalles de la orden a la nueva orden",
            success: false,
          });
        }
        res.json({
          message: "Orden realizada con exito",
          success: true,
          order_id: newOrderId.insertId,
          products: products,
        });
      });
  } else {
    res.json({
      message: "Fallo el pedido",
      success: false,
    });
  }
});
/*PAYMENT GATEWAY CALL*/
router.post("/payment", (res, req) => {
  setTimeout(() => {
    req.status(200).json({ success: true });
  }, 2000);
});

module.exports = router;
