const mongoose= require('mongoose');

const processDataSchema = new mongoose.Schema({
    N:{
        type:Number
    },
    N0:{
        type:Number
    },
    tc:{
        type:Number
    },
    t0:{
        type:Number
    },
    tf:{
        type:Number
    },
    date:{
        type:Date,
        default:Date.now
    }
});

module.exports = mongoose.model('ProcesData',processDataSchema);