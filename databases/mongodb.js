const mongoose = require('mongoose');

exports.init = () => {
    mongoose.Promise = global.Promise;
    mongoose.connect('mongodb+srv://crawl-api:crawl-api@cluster0-ti6s4.mongodb.net/test?retryWrites=true', { useNewUrlParser: true });
    const conn = mongoose.connection;
    conn.on('connected', () => console.log('MongoDB connected'));
    conn.on('error', (err) => console.log(err));
    conn.on('disconnected', () => console.log('MongoDB disconnected'));
};