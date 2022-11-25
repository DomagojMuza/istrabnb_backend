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
        type: Number,
        required: [true, 'Enter price'],
    },
    pool:
    {
        type: Boolean,
        default: false,
    },
    baclony:
    {
        type: Boolean,
        default: false,
    },
    pets:
    {
        type: Boolean,
        default: false,
    },
    beds:
    {
        type: Number,
        default: 2,
    },
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: 'User' //sa kojim modelom se povezuje
    },
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
            index: '2dsphere',
            required: [true, 'Enter location'],
        },
    },
    images: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Image' }],
    pricelist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Pricelist' }]
}, {
    timestamps: true
})


const Object = mongoose.model('Object', ObjectSchema)


module.exports = Object