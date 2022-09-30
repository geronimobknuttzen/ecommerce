const express = require('express');
const multer = require('multer')
const router = express.Router();
const { database } = require('../config/helpers');
const fs = require('fs').promises;



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

    database.table('news as n')
        .withFields([
            'n.id',
            'n.title',
            'n.url',
            'n.description',
            'n.section',
            'n.image',
            'n.position',
            'n.marginLeft'
        ])
        .sort({id: 1})
        .getAll()
        .then(news => {
            if (news.length > 0) {
                res.status(200).json({
                    count: news.length,
                    images: news
                })
            } else {
                res.json({message: 'No se encontraron imágenes'})
            }
        })
        .catch(err => console.log(err));
});
/* GET ONE IMAGE. */
router.get('/:newsID', (req,res)=>{
    let newsId = req.params.newsID;

    database.table('news as n')
        .withFields([
            'n.id',
            'n.title',
            'n.url',
            'n.description',
            'n.section',
            'n.image',
            'n.position',
            'n.marginLeft'
        ])
        .filter({'n.id' : newsId})
        .get()
        .then(news => {
            if (news) {
                res.status(200).json(news);
            } else {
                res.json({message: 'No hay novedades'})
            }
        })
        .catch(err => console.log(err));
})

router.post('/upload', (req, res)=>{
    if(req.method == 'POST'){
        let {title, title_second, link, subtitle} = req.body;
        if(!req.files || Object.keys(req.files).length === 0){
        return res.status(400).send('No se subieron archivos');}
        news = req.files.news;
        console.log(news)
        uploadPath = `https://www.anitathomas.com.ar/assets/images/news/` + news.name
        savePath = `https://www.anitathomas.com.ar/assets/images/news/`+ news.name
        if(news.mimetype == 'image/jpeg' || news.mimetype == 'image/png'|| news.mimetype == 'image/jpg' ){
            news.mv(uploadPath, (error)=>{
                if(error)
                    return res.status(500).send(error);
                
                database.table('news')
                    .insert({
                        title: title,
                        title_second: title_second,
                        subtitle: subtitle,
                        link: link,
                        image: savePath
                    })
                    .then(newNews=>{
                        res.json({message:'Se cargó la noticia', success: true})
                    })
                    .catch(error=>console.log(error))
            })
        } else {
            message = 'El formato no se permite, solo permitido JPG, JPEG y PNG',
            res.json({message: message})
        }    
    }
})
/* UPDATE NEWS DATA */
router.patch('/update/:newsId', async (req, res) => {
    let newsId = req.params.newsId;     // Get the News ID from the parameter

  // Search User in Database if any
    let news = await database.table('news').filter({id: newsId}).get();
    if (news) {
        let {title, title_second, link, subtitle} = req.body;

        // Replace the user's information with the form data ( keep the data as is if no info is modified )
        database.table('news').filter({id: newsId}).update({
            title: title !== undefined ? title : news.title,
            title_second: title_second !== undefined ? title_second : news.title_second,
            link: link !== undefined ? link : news.link,
            subtitle: subtitle !== undefined ? subtitle : news.subtitle
        }).then(result => res.json({message:'Novedad Actualizada exitosamente!', success:true})).catch(err => res.json(err));
    }
});
/* DELETE ONE NEW. */
router.delete('/delete/:id', (req, res)=>{
    let id = req.params.id;
    database.table('news as n')
    .filter({'n.id': id})
    .get()
    .then(news => {
        if (news) {
            let imgPath = news.image
            console.log(news)
            fs.unlink(imgPath)
                .then(()=>{
                    console.log('File Removed')
                }).catch((e)=>{
                    console.log('Error, something happend: ',e)
                })
            database.table('news')
                .filter({id: news.id})
                .remove()
                .then(novedad => {
                    if (novedad.affectedRows>0) {
                        res.status(200).json({message: 'Se eliminó', success: true});
                    } else {
                        res.json({message: 'No se encontró imagen', success: false})
                    }
            });
        } else {
            res.json({message: 'Imagen no encontrada con ese id', success: false})
        }
    })
    .catch(err => console.log(err));
    // console.log(id)
})

module.exports = router;
