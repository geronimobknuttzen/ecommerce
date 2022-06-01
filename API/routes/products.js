const express = require('express');
const router = express.Router();
const { database } = require('../config/helpers');

/* GET IMAGES. */

router.get('/', function(req, res) {

    database.table('products as p')
        .withFields([
            'p.id',
            'p.title as name',
            'p.description',
            'p.image',
            'p.precioPesos',
            'p.price',
            'p.short_desc'
        ])
        .sort({id: -1})
        .getAll()
        .then(prods => {
            if (prods.length > 0) {
                res.status(200).json({
                    count: prods.length,
                    presets: prods
                })
            } else {
                res.json({message: 'No se encontraron presets'})
            }
        })
        .catch(err => console.log(err));
});

router.get('/:presId', (req,res)=>{
    let presetId = req.params.presId;
    console.log(presetId)

    database.table('products as p')
        .withFields([
            'p.id',
            'p.title as name',
            'p.price',
            'p.precioPesos',
            'p.description',
            'p.image',
            'p.short_desc'
        ])
        .filter({'p.id' : presetId})
        .get()
        .then(preset => {
            if (preset) {
                res.status(200).json(preset);
            } else {
                res.json({message: 'No se encontró preset'})
            }
        })
        .catch(err => console.log(err));})

module.exports = router;
