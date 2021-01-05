const productoPrecio = require('../modelBd/entity/ProductoPrecio'); 
const utilsDao = require('./utils/utils'); 
const utilsGen = require('../utils/utils'); 
const config = require('../config/config.json');  

/**
 * @description Función que permite crear precios por producto
 * @creation David Villanueva 05/01/2020
 * @update
 */
exports.crearProductoPrecio = async function (oParam) { 
    const oResponse = {};
    try {
        var seqProductoPrecio = "'" +config.seqProductoPrecio +"'";
        var seq = await utilsDao.obtenetSequencia(seqProductoPrecio);
        if(seq.iCode !== 1){
            throw new Error(seq.iCode + "||" + seq.sMessage);
        }
        var oRegistro = {};
        oRegistro.Id                = parseInt(seq.oData, 10);
        oRegistro.EstadoId          = 1;
        oRegistro.UsuarioCreador    = oParam.oAuditRequest.sUsuario;
        oRegistro.FechaCreacion     = new Date(oParam.oAuditRequest.dFecha);
        oRegistro.TerminalCreacion  = oParam.oAuditRequest.sTerminal;

        oRegistro.SociedadId            = oParam.oData.iSociedadId;
        oRegistro.Sociedad              = oParam.oData.sSociedad;
        oRegistro.SedeId                = oParam.oData.iSedeId;
        oRegistro.Sede                  = oParam.oData.sSede;
        oRegistro.AlmacenId             = oParam.oData.iAlmacenId;
        oRegistro.Almacen               = oParam.oData.sAlmacen; 
        oRegistro.ProductoId            = oParam.oData.iProductoId;
        oRegistro.ProductoCod           = oParam.oData.sProductoCod;
        oRegistro.ProductoCodBarra      = oParam.oData.sProductoCodBarra;
        oRegistro.Producto              = oParam.oData.sProducto;
        oRegistro.PrecioVenta           = oParam.oData.fPrecioVenta;
        oRegistro.PrecioDefecto         = oParam.oData.iPrecioDefecto;     
        oRegistro.Comentario            = oParam.oData.sComentario;     
        const crearRegistroPromise = await productoPrecio.create(oRegistro);
        oResponse.iCode     = 1;
        oResponse.sMessage  = 'OK';
        oResponse.oData     = oRegistro;
    } catch (e) { 
        oResponse.iCode     = -1;
        oResponse.sMessage  = 'Ocurrio un error en la tabla: producto_precio, error: '+ e.message;
        oResponse.oData     = oParam;
    }  
     
    return oResponse;
}


/**
 * @description Función que permite actualizar el precio de los productos 
 * @creation David Villanueva 05/01/2020
 * @update
 */
exports.actualizarProductoPrecio = async function (oParam) { 
    const oResponse = {};
    try {
        var oRegistro = {}; 
        oRegistro.UsuarioModificador   = oParam.oAuditRequest.sUsuario;
        oRegistro.FechaModificacion    = new Date(oParam.oAuditRequest.dFecha);
        oRegistro.TerminalModificador  = oParam.oAuditRequest.sTerminal;
        
        if(oParam.oData.iSociedadId !== undefined){
            oRegistro.SociedadId     = oParam.oData.iSociedadId; 
        }
        if(oParam.oData.sSociedad !== undefined){
            oRegistro.Sociedad     = oParam.oData.sSociedad; 
        }
        if(oParam.oData.iSedeId !== undefined){
            oRegistro.SedeId     = oParam.oData.iSedeId; 
        }
        if(oParam.oData.sSede !== undefined){
            oRegistro.Sede     = oParam.oData.sSede; 
        }
        if(oParam.oData.iAlmacenId !== undefined){
            oRegistro.AlmacenId     = oParam.oData.iAlmacenId; 
        }
         
        if(oParam.oData.iProductoId !== undefined){
            oRegistro.ProductoId     = oParam.oData.iProductoId; 
        }
        if(oParam.oData.sProductoCod !== undefined){
            oRegistro.ProductoCod     = oParam.oData.sProductoCod; 
        }
        if(oParam.oData.sProductoCodBarra !== undefined){
            oRegistro.ProductoCodBarra     = oParam.oData.sProductoCodBarra; 
        }
        if(oParam.oData.sProducto !== undefined){
            oRegistro.Producto     = oParam.oData.sProducto; 
        }
        if(oParam.oData.fPrecioVenta !== undefined){
            oRegistro.PrecioVenta     = oParam.oData.fPrecioVenta; 
        }
        if(oParam.oData.iPrecioDefecto !== undefined){
            oRegistro.PrecioCostoTotal     = oParam.oData.iPrecioDefecto; 
        }
        if(oParam.oData.sComentario !== undefined){
            oRegistro.Comentario     = oParam.oData.sComentario; 
        }
         
        var oFiltro      = {};
        oFiltro.where    = {};
        oFiltro.where.Id = oParam.oData.iId;
        const acrualizarRegistroPromise = await productoPrecio.update(oRegistro, oFiltro);

        oResponse.iCode     = 1;
        oResponse.sMessage  = 'OK';
        oResponse.oData     = oRegistro;
    } catch (e) { 
        oResponse.iCode     = -1;
        oResponse.sMessage  = 'Ocurrio un error en la tabla: producto_precio , error: '+ e.message;
        oResponse.oData     = oParam;
    }  
     
    return oResponse;
}

/**
 * @description Función que permite eliminar el precio del producto 
 * @creation David Villanueva 04/01/2020
 * @update
 */
exports.eliminarProductoPrecio = async function (oParam) { 
    const oResponse = {};
    try {
 
        var oRegistro = {}; 
        oRegistro.UsuarioModificador   = oParam.oAuditRequest.sUsuario;
        oRegistro.FechaModificacion    = new Date(oParam.oAuditRequest.dFecha);
        oRegistro.TerminalModificador  = oParam.oAuditRequest.sTerminal;
        oRegistro.EstadoId             = 0;
        var oFiltro      = {};
        oFiltro.where    = {};
        oFiltro.where.Id = oParam.oData.iId;
        const acrualizarRegistroPromise = await productoPrecio.update(oRegistro, oFiltro);
        oResponse.iCode     = 1;
        oResponse.sMessage  = 'OK';
        oResponse.oData     = oRegistro;
    } catch (e) { 
        oResponse.iCode     = -1;
        oResponse.sMessage  = 'Ocurrio un error en la tabla: producto_precio, error: '+ e.message;
        oResponse.oData     = oParam;
    }  
     
    return oResponse;
}