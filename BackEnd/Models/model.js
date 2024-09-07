const mongoose = require('mongoose');
const keeper =new mongoose.Schema({
    title :{
        type :'String',
        required : true
    },
    description :{
        type :'String',
        required : true
    }
})

const Task = new mongoose.model("Task" , keeper);
module.exports = Task