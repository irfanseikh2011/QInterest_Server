const mongoose = require('mongoose')


const url = "mongodb+srv://irfan12:nukleshukle12@cluster0.ik7ej.mongodb.net/?retryWrites=true&w=majority"


module.exports.connect = () => {
    mongoose.connect(url).then((res) => console.log("MongoDB Connected")).catch((err)=> console.log('Errorr...',err))
}