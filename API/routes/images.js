const express = require('express');
const multer = require('multer')
const router = express.Router();
const { database } = require('../config/helpers');

/* GET ALL IMAGES. */

router.get('/', function(req, res) {
    let page = (req.query.page !== undefined && req.query.page !== 0) ? 1 : req.query.page;
    const limit = (req.query.limit !== undefined && req.query.limit !== 0) ? req.query.limit : 10;

    let startValue;
    let endValue;
    if (page > 0) {
        startValue = (page * limit) - limit
        endValue = page * limit;
    } else {
        startValue = 0;
        endValue = 10;
    }

    database.table('images as i')
        .join([{
            table: 'categories as c',
            on: 'c.id = i.cat_id'
        }])
        .withFields(['c.title as category',
            'i.id',
            'i.name',
            'i.description',
            'i.img_url',
            'i.createdAt',
            'i.updatedAt'
        ])
        .sort({id: 1})
        .getAll()
        .then(imgs => {
            if (imgs.length > 0) {
                res.status(200).json({
                    count: imgs.length,
                    images: imgs
                })
            } else {
                res.json({message: 'No se encontraron imágenes'})
            }
        })
        .catch(err => console.log(err));
});
/* GET ONE IMAGE. */
router.get('/:imgID', (req,res)=>{
    let imgId = req.params.imgID;

    database.table('images as i')
        .join([{
            table: 'categories as c',
            on: 'c.id = i.cat_id'
        }])
        .withFields(['c.title as category',
            'i.id',
            'i.name',
            'i.description',
            'i.img_url',
            'i.createdAt',
            'i.updatedAt'
        ])
        .filter({'i.id' : imgId})
        .get()
        .then(img => {
            if (img) {
                res.status(200).json(img);
            } else {
                res.json({message: 'No se encontró imagen'})
            }
        })
        .catch(err => console.log(err));
})

router.post('/upload', (req, res)=>{
    if(req.method == 'POST'){
        let {name, description, cat_id, category} = req.body;
        if(!req.files || Object.keys(req.files).length === 0){
        return res.status(400).send('No se subieron archivos');}
        image = req.files.image;
        uploadPath = `../anitaecom/src/assets/images/portfolio/${category}/` + image.name
        savePath = `assets/images/portfolio/${category}/`+ image.name
        console.log(image)
        if(image.mimetype == 'image/jpeg' || image.mimetype == 'image/png'|| image.mimetype == 'image/jpg' ){
            image.mv(uploadPath, (error)=>{
                if(error)
                    return res.status(500).send(error);
                
                database.table('images')
                    .join([
                        {
                        table:'categories as c',
                        on:'c.id = images.cat_id'
                        },
                    ])
                    .insert({
                        name: name,
                        description: description,
                        cat_id: cat_id,
                        img_url: savePath,
                        createdAt: Date.now()
                    })
                    .then(newImage=>{
                        res.json({message:'Se cargó la nueva imagen', success: true})
                    })
                    .catch(error=>console.log(error))
            })
        } else {
            message = 'El formato no se permite, solo permitido JPG, JPEG y PNG',
            res.json({message: message})
        }    
    }
})


module.exports = router;
