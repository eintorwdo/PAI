const mongoose = require('mongoose');


const dbConnect = async () => {
    let env = ''
    if(process.env.NODE_ENV === "test"){
        env = 'DEV'
    }
    else{
        env = 'PROD'
    }
    const dbUrl = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0-i7tju.mongodb.net/${env}?retryWrites=true&w=majority`
    const connection = mongoose.connect(dbUrl, { useNewUrlParser: true });
    return connection;
}

module.exports = { dbConnect };