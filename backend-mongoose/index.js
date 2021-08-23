const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const app = require('./server.js');


const port = process.env.PORT || 8000;

mongoose.connect(process.env.DATABASE_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .catch(err => console.error(`Connection To database failed..., ${err}`))
    .then(() => { app.listen(port, () => console.log(`Listening on port, ${port}`)) });

