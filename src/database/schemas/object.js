const mongoose = require('mongoose');


const ObjectSchema = new mongoose.Schema({
    name:
    {
        type: String,
        required: [true, 'How you want to name your object'],
        trim: true
    },
    price:
    {
        type: Number
    },
    pool:
    {
        type: Boolean
    },
    baclony:
    {
        type: Boolean
    },
    pets:
    {
        type: Boolean
    },
    beds:
    {
        type: Number
    },
    // owner:{
    //     type: mongoose.Schema.Types.ObjectId,
    //     require: true,
    //     ref: 'User' //sa kojim modelom se povezuje
    // }
    location:
    {
        type: 
        {
            type: String,
            enum:['Point']
        },
        coordinates: 
        {
            type: Array,
            index: '2dsphere'
        },
    },
    images: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Image' }]
}, {
    timestamps: true
})


const Object = mongoose.model('Object', ObjectSchema)


module.exports = Object