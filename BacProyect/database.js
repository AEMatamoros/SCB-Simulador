const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/TIBDB',{ useNewUrlParser: true,useUnifiedTopology: true })
.then(res=>console.log("DB Conected"))
.catch(err=>console.log(err))



