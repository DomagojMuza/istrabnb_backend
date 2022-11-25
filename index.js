const express = require('express');
const cors = require('cors');
const object = require('./src/routes/object');
const image = require('./src/routes/image');
const user = require('./src/routes/user');
const pricelist = require('./src/routes/pricelist');
require('./src/database/connection');
require('dotenv').config({path: __dirname + '/.env'})

const app = express();
app.use(cors())
app.use(express.json())
app.use('/uploads', express.static('uploads'))

let port = process.env.PORT || 4000;


app.use(object)
app.use(image)
app.use(user)
app.use(pricelist)

console.log(process.env.TOKEN_KEY);
app.listen(port, ()=>{
    console.log(`Server je na portu ${port}`);
})