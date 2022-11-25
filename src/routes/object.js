const express = require('express')
const Objects = require('../database/schemas/object.js')
const Pricelist = require('../database/schemas/pricelist.js')

const auth = require('../auth/auth.js');


const object = new express.Router()

object.post('/api/object', auth, async (req, res) => {
    // res.status(200).send(...arr[0]);
    try {
        req.body.owner = req.user._id;
        let obj = new Objects(
            req.body
        )
        await obj.save();
        return res.status(200).send(obj)

    } catch (error) {
        return res.status(400).send(error)
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
            if (req.body[update]) obj[update] = req.body[update]
        })
        await obj.save();
        if(!obj){
            return res.status(404).send()
        }
        res.status(200).send(obj)

    } catch (error) {
        res.status(400).send(error)
    }

})

object.get('/api/object', auth, async (req, res) => {
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
    let limit = req.query.limit ?? 10;
    let skip = 0;
    if (req.query.skip)
    {
        skip = req.query.skip > 1 ? req.query.skip - 1 : skip;
    }
    if(req.query.forUser)
    {
        if ( ! req.user) return [];
        search.owner = req.user._id;
    }
    skip = limit * skip; 
    try {
        let objects = await Objects.find(search)
            .limit(req.query.limit ?? 10)
            .skip(skip)
            .populate('images')
            .populate('pricelist')
        let count = await Objects.countDocuments(search);
        res.status(200).send({objects, count})
    } catch (error) {
        res.status(400).send(error)
    }
})

object.get('/api/object/:id', async (req, res) => {
    const _id = req.params.id;
    try {
        let object = await Objects.findOne({
            _id
        }).populate('images').populate('pricelist');
        res.status(200).send(object)
    } catch (error) {
        res.status(400).send(error)
    }
})



module.exports = object