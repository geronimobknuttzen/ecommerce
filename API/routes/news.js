const express = require('express');
const multer = require('multer')
const router = express.Router();
const { database } = require('../config/helpers');



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
            'n.title_first',
            'n.title_second',
            'n.subtitle',
            'n.link',
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
            'n.title_first',
            'n.title_second',
            'n.subtitle',
            'n.link',
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
        let {title_first, title_second, link, subtitle} = req.body;
        if(!req.files || Object.keys(req.files).length === 0){
        return res.status(400).send('No se subieron archivos');}
        news = req.files.news;
        uploadPath = `../anitaecom/src/assets/images/news/` + news.name
        savePath = `assets/images/news/`+ news.name
        console.log(news)
        if(news.mimetype == 'image/jpeg' || news.mimetype == 'image/png'|| news.mimetype == 'image/jpg' ){
            news.mv(uploadPath, (error)=>{
                if(error)
                    return res.status(500).send(error);
                
                database.table('news')
                    .insert({
                        title_first: title_first,
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


module.exports = router;
