const express = require('express')
const Objects = require('../database/schemas/object.js')


const object = new express.Router()

let arr = 
    [
        {
            name: 'Apartman 1',
            location:{
                type: 'Point',
                coordinates: [13.8353227, 44.8574043]
            }
        },
        {
            name: 'Apartman 2',
            location:{
                type: 'Point',
                coordinates: [13.8359865, 44.8605346]
            }
        },
    ]

object.post('/api/object', async (req, res) => {
    // res.status(200).send(...arr[0])
    try {
        let obj = new Objects(
            req.body
        )
        await obj.save();
    res.status(200).send(obj)

    } catch (error) {
        res.status(400).send(error)
    }

})

object.patch('/api/object', async (req, res) => {
    const notAllowed = ['_id', 'createdAt', 'updatedAt', '_v'];
    try {
        let updates = Object.keys(req.body)
        updates = updates.filter( el => {
            return ! notAllowed.includes(el);
        });
        let obj = await Objects.findOne({_id: req.body._id})
        updates.forEach((update) => {
            console.log(obj[update], req.body[update]);
            if (req.body[update]) obj[update] = req.body[update]
        })
        // if (req.body.location.coordinates) obj.location.coordinates = req.body.location.coordinates
        console.log(obj);
        await obj.save();
        if(!obj){
            return res.status(404).send()
        }
        res.status(200).send(obj)

    } catch (error) {
        console.log(error);
        res.status(400).send(error)
    }

})

object.get('/api/object', async (req, res) => {
    let search = {};

    if (req.query.sw && req.query.ne)
    {
        search.location = {
            $geoWithin: {
                $box: [
                    req.query.sw.split(','),
                    req.query.ne.split(',')
                ]
            }
        }
    }
    try {
        let objects = await Objects.find(search)
            .populate('images')

        res.status(200).send(objects)
    } catch (error) {
        console.log(error);
        res.status(400).send(error)
    }
})
object.get('/api/object/:id', async (req, res) => {
    const _id = req.params.id;
    try {
        let object = await Objects.findOne({
            _id
        }).populate('images')
        res.status(200).send(object)
    } catch (error) {
        console.log(error);
        res.status(400).send(error)
    }
})



module.exports = object