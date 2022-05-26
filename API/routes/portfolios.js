const express = require('express');
const router = express.Router();
const { database } = require('../config/helpers');

/* GET ALBUMS. */
router.get('/', function(req, res) {

    database.table('categories as c')
        .withFields([
            'c.id',
            'c.title as name',
            'c.img_url'
        ])
        .sort({id: -1})
        .getAll()
        .then(alb => {
            if (alb.length > 0) {
                res.status(200).json({
                    count: alb.length,
                    albums: alb
                })
            } else {
                res.json({message: 'No se encontraron albums'})
            }
        })
        .catch(err => console.log(err));
});
/*GET ONE ALBUM*/
router.get('/:albumId', (req,res)=>{
    let albumId = req.params.albumId;
    console.log(albumId)

    database.table('categories as c')
        .withFields([
            'c.id',
            'c.title as name'
        ])
        .filter({'c.id' : albumId})
        .get()
        .then(album => {
            if (album) {
                res.status(200).json(album);
            } else {
                res.json({message: 'No se encontró carpeta'})
            }
        })
        .catch(err => console.log(err));})

/* GET ALL IMAGES FROM AN ALBUM. */
router.get('/portfolio/:catTitle', (req, res)=>{
    const cat_title = req.params.catTitle;

    database.table('images as i')
        .join([{
            table: 'categories as c',
            on: `c.id = i.cat_id WHERE c.title LIKE '${cat_title}%'`
        }])
        .withFields(['c.title as category',
            'i.id',
            'i.name',
            'i.description',
            'i.img_url',
            'i.createdAt',
            'i.updatedAt'
        ])
        .sort({id: -1})
        .getAll()
        .then(imgs => {
            if (imgs.length > 0) {
                res.status(200).json({
                    count: imgs.length,
                    images: imgs
                })
            } else {
                res.json({message: `No se encontraron imagenes en el album ${cat_title}`})
            }
        })
        .catch(err => console.log(err));
})
module.exports = router;
