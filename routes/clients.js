/*
    Event Routes
    /api/events
*/
const { Router } = require('express');
const { check } = require('express-validator');

//const { isDate } = require('../helpers/isDate');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { getClientes, crearCliente, actualizarCliente, eliminarCliente } = require('../controllers/clientes');
const { isDni } = require ('../helpers/isDni');
const router = Router();

// Todas tienes que pasar por la validación del JWT
router.use( validarJWT );


// Obtener clientes 
router.get('/', getClientes );

// Crear un nuevo clientes
router.post(
    '/',
    [
        check('nombre','El nombre es obligatorio').not().isEmpty(),
        check('apellidos','El apellido es obligatorio').not().isEmpty(),
        check('direccion','La direccion es obligatorio').not().isEmpty(),
        check('edad','La edad es obligatorio').not().isEmpty(),
        check('edad','La edad tiene que ser mayor de 18 y menor de 100 ').not().isLength({ min: 18, max:100 }),
        check('cp','El cp es obligatorio').not().isEmpty(),
        check('cp','El Código postal es no es correcto').not().isLength({ min: 1000, max:999999 }),
        check('dni','El dni no es correcto').custom( isDni ),
        check('dni','El dni esta repetido').exists(),
        check('dni','El dni es obligatorio').not().isEmpty(),
        check('correo','El correo es obligatorio').not().isEmpty(),
        check('correo','El correo no es correcto').isEmail(),
        check('telefono','El telefono es obligatorio').not().isEmpty(),
        check('telefono','El telefono es no es correcto').not().isLength({ min: 99999, max:999999999 }),
        //check('start','Fecha de inicio es obligatoria').custom( isDate ),
        validarCampos
    ],
    crearCliente 
);

// Actualizar cliente
router.put(
    '/:id', 
    [
        check('nombre','El nombre es obligatorio').not().isEmpty(),
        check('apellidos','El apellido es obligatorio').not().isEmpty(),
        check('direccion','La direccion es obligatorio').not().isEmpty(),
        check('edad','La edad es obligatorio').not().isEmpty(),
        check('edad','La edad tiene que ser mayor de 18 y menor de 100 ').not().isLength({ min: 18, max:100 }),
        check('cp','El cp es obligatorio').not().isEmpty(),
        check('cp','El Código postal es no es correcto').not().isLength({ min: 1000, max:999999 }),
        check('dni','El dni no es correcto').custom( isDni ),
        check('dni','El dni es obligatorio').not().isEmpty(),
        check('correo','El correo es obligatorio').not().isEmpty(),
        check('correo','El correo no es correcto').isEmail(),
        check('telefono','El telefono es obligatorio').not().isEmpty(),
        check('telefono','El telefono es no es correcto').not().isLength({ min: 99999, max:999999999 }),99999999 }),
        validarCampos
    ],
    actualizarCliente 
);

// Borrar cliente
router.delete('/:id', eliminarCliente );

module.exports = router;