const { Schema, model } = require('mongoose');

const ClienteSchema = Schema({

    nombre: {
        type: String,
        required: true
    },
    apellidos: {
        type: String,     
        required: true   
    },
	   direccion: {
        type: String,    
        required: true    
    },
	   dni: {
        type: String,   
        required: true     
    },
	   cp: {
        type: Number,      
        required: true  
    },
    telefono: {
        type: Number,      
        required: true  
    },
    edad: {
        type: Number,      
        required: true  
    },

    correo:{
        type: String,      
        required: true  
        
    },
    id: {
        type: Schema.Types.ObjectId,
    }

});

ClienteSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});



module.exports = model('Cliente', ClienteSchema );

