const productoPrecio = require('../modelBd/entity/ProductoPrecio');   

/**
 * @description Función que permite consultar los precios por producto
 * @creation David Villanueva 05/01/2020
 * @update
 */
exports.consultarProductoPrecio = async function (oFiltro) { 
    const oResponse = {};
    try {
        var oFiltroLista = {}; 
        oFiltroLista.where ={}; 
        if(oFiltro.sProductoCod !== undefined){
            oFiltroLista.where.ProductoCod  = oFiltro.sProductoCod; 
        } 
        if(oFiltro.iId !== undefined){
            oFiltroLista.where.Id  = oFiltro.iId; 
        }  
        oFiltroLista.where.EstadoId     = 1;  
        const consultarListaResponse = await  productoPrecio.findAll(oFiltroLista); 
        if(consultarListaResponse.length > 0){
            oResponse.iCode     = 1;
            oResponse.sMessage  = 'OK'; 
            oResponse.oData     = consultarListaResponse;
        }else{
            oResponse.iCode     = 2;
            oResponse.sMessage  = 'No se encontro información de precios'; 
            oResponse.oData     = oFiltro;
        }
    } catch (e) { 
        oResponse.iCode     = -1;
        oResponse.sMessage  = 'Ocurrio un error en la tabla: producto_precio, error: '+ e.message;
        oResponse.oData     = oFiltro;
    }  
    return oResponse;
}