const express = require('express');
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
        .slice(startValue, endValue)
        .sort({id: -1})
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
    console.log(imgId)

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
module.exports = router;
