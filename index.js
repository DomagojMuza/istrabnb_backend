const express = require('express');
const cors = require('cors');
const object = require('./src/routes/object');
const image = require('./src/routes/image');
require('./src/database/connection');

const app = express();
app.use(cors())
app.use(express.json())
app.use('/uploads', express.static('uploads'))

let port = process.env.PORT || 4000;


app.use(object)
app.use(image)


app.listen(port, ()=>{
    console.log(`Server je na portu ${port}`);
})