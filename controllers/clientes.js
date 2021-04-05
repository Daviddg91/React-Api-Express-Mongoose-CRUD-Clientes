const { response } = require('express');
const Cliente = require('../models/Cliente');

const getClientes = async( req, res = response ) => {

    const clientes = await Cliente.find();
                                //.populate('user','name');
    res.json({
        ok: true,
        clientes
    });
}

const crearCliente = async ( req, res = response ) => {

    const cliente = new Cliente( req.body );

    try {

       // evento.user = req.uid;
        
        const clienteGuardado = await cliente.save();

        res.json({
            ok: true,
            cliente: clienteGuardado
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

const actualizarCliente = async( req, res = response ) => {
    
    const eventoId = req.params.id;
    const uid = req.uid;

    try {

        const cliente = await Cliente.findById( eventoId );

        if ( !cliente ) {
            return res.status(404).json({
                ok: false,
                msg: 'Cliente no existe por ese id'
            });
        }

       /* if ( cliente.user.toString() !== uid ) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegio de editar este evento'
            });
        }*/

        const nuevoCliente = {
            ...req.body,
            //user: uid
        }

        const eventoActualizado = await Cliente.findByIdAndUpdate( eventoId, nuevoCliente, { new: true } );

        res.json({
            ok: true,
            evento: eventoActualizado
        });

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

}

const eliminarCliente = async( req, res = response ) => {
     
    const dni = req.params.dni;
   
    try {

        const cliente = await Cliente.find({dni : dni});
        const clienteObject = (cliente[0]);
        
        if ( !clienteObject ) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe ningun cliente por ese dni'
            });
        }
        
         await Cliente.findByIdAndDelete(  clienteObject._id );

         res.json( { ok: true }).status(200);

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

}
const FindClientByDNI = async( req, res = response ) => {

     const dni = req.params.dni;

     try {
 
            
      const cliente =  await Cliente.find({ dni: dni });

         if ( !cliente ) {
             return res.status(404).json({
                 ok: false,
                 msg: 'Cliente no existe por ese DNI'
             });
         }
         
         res.json({ ok: true, cliente });
 
         
     } catch (error) {
         console.log(error);
         res.status(500).json({
             ok: false,
             msg: 'Hable con el administrador'
         });
     }
 
 }

 
module.exports = {
    getClientes,
    crearCliente,
    actualizarCliente,
    eliminarCliente,
    FindClientByDNI
}