const mongoose = require('mongoose');
const Object = require('./object.js')



const PricelistSchema = new mongoose.Schema({
    dateFrom: {
      type: Date,
      required: [true, 'Enter starting date'],
  },
    dateTo: {
      type: Date,
      required: [true, 'Enter ending date'],
  },
    price: {
      type: Number,
      required: [true, 'Enter price'],
      },
    object_id:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Object' //sa kojim modelom se povezuje
    }
}, {
    timestamps: true
})

// ImageSchema.pre('remove', async function(next){
//     const image = this
//     console.log(image);
//     await Object.updateOne({ _id: image.object_id}, {
//         $pullAll: {
//             images: [{_id: image._id}]
//         }
//     });
//     next()
// })

const Pricelist = mongoose.model('Pricelist', PricelistSchema)


module.exports = Pricelist