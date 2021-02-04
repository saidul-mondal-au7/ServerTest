const mongoose = require('mongoose');
const ServerSchema = new mongoose.Schema({
    RUM:{
        type:String,
        required:true,
        trim:true,

    },
    CPU:{
        type:String,
        required:true,
        trim:true,

    },
    OperatingSystem:{
        type:String,
        required:true,
        trim:true,

    },
    Graphics:{
        type:String,
        required:true,
        trim:true,

    },
    Storage:{
        type:String,
        required:true,
        trim:true,

    }
},
{
    timestamps:true
});
const Server = mongoose.model('Server', ServerSchema);

module.exports = Server;


