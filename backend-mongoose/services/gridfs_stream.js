const Grid = require('gridfs-stream');
const mongoose = require('mongoose');

const connectDB = require('./db.js');


const init = async () => {
    await connectDB();
    const conn = mongoose.connection;
    const gfs = await Grid(conn.db, mongoose.mongo);
    gfs.collection('uploads');
    return gfs;
}
module.exports = init;