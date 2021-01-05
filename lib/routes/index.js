const express = require('express');
const router = express.Router();

const productoPrecioRxBusiness        = require('../business/ProductoPrecioRxBusiness');  
const productoPrecioTxBusiness        = require('../business/ProductoPrecioTxBusiness');  

module.exports = function(){

    //ProductoPrecio
    router.post('/', productoPrecioTxBusiness.registrarProductoPrecio); 
    router.put('/:id', productoPrecioTxBusiness.actualizarProductoPrecio); 
    router.delete('/', productoPrecioTxBusiness.eliminarProductoPrecio);  
    router.get('/', productoPrecioRxBusiness.consultarProductoPrecio); 
 
    return router;
}

