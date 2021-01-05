const productoPrecioRxDao   = require('../dao/ProductoPrecioRxDao'); 
const utils 	  	  		= require('../utils/utils'); 
 
/**
 * @description Función que permite consultar los precios por producto
 * @creation David Villanueva 05/01/2020
 * @update
 */
exports.consultarProductoPrecio = async (req, res) => { 
	 var oResponse			= {};
	 oResponse.oData		= {}; 
     try { 
	 
		 var oFiltroInv 			= {}; 
		 oFiltroInv.iId 	  		= req.query.iId; 
		 var consultarProductoPrecioResponse =  await productoPrecioRxDao.consultarProductoPrecio(oFiltroInv);
		 if(consultarProductoPrecioResponse.iCode !== 1){
			throw new Error(consultarProductoPrecioResponse.iCode + "||" + consultarProductoPrecioResponse.sMessage);
		 }
     	 oResponse.iCode 		= 1; 
		 oResponse.sMessage		= 'OK';
		 oResponse.oData		= consultarProductoPrecioResponse.oData;
     } catch (e) {
        var oError = utils.customError(e);
		if (e.name === 'Error') {
			oResponse.iCode 	= oError.iCode; 
			oResponse.sMessage	= oError.sMessage;
		}else{
			oResponse.iCode 		= -2;
			oResponse.sMessage	= "Ocurrio un error en el proceso: " +  e.message +" ,Ubicación Error: "+oError.sMessage
		} 
     }finally{
     	oResponse.sIdTransaccion =  req.headers.sidtransaccion;
     	oResponse = utils.customResponse(oResponse);
     }  
     res.json(oResponse) 
};
 