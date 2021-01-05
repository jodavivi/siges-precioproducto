const utils 	     	 	= require('../utils/utils'); 
const productoPrecioTxDao 		= require('../dao/ProductoPrecioTxDao');   

/**
 * @description Función que permite registrar los precios del producto
 * @creation David Villanueva 05/01/2020
 * @update
 */
exports.registrarProductoPrecio = async (req, res) => { 
	 var oResponse			= {};
	 oResponse.oData		= {};
	 var oRequest			= null;
     try {
		 oRequest		 = utils.customRequest(req); 
		 
		 var oRegistroPrd = {};
		 oRegistroPrd.oAuditRequest  = oRequest.oAuditRequest;
		 oRegistroPrd.oData		  	 = oRequest.oData; 
		 const crearProductoPrecioResponse = await  productoPrecioTxDao.crearProductoPrecio(oRegistroPrd);
		 if(crearProductoPrecioResponse.iCode !== 1){
			throw new Error(crearProductoPrecioResponse.iCode + "||" + crearProductoPrecioResponse.sMessage);
		 } 

     	 oResponse.iCode 		= 1; 
		 oResponse.sMessage		= 'OK';
		 oResponse.oData		= crearProductoPrecioResponse.oData;
		
     } catch (e) {
        var oError = utils.customError(e);
		if (e.name === 'Error') {
			oResponse.iCode 	= oError.iCode; 
			oResponse.sMessage	= oError.sMessage;
		}else{
			oResponse.iCode 		= -2;
			oResponse.sMessage	= "Ocurrio un error en el proceso: " +  e.message +" ,Ubicación Error: "+oError.sMessage
		} 
		oResponse.oData	= oRequest.oData;
     }finally{
     	oResponse.sIdTransaccion =  req.headers.sidtransaccion;
     	oResponse = utils.customResponse(oResponse);
     }  
     res.json(oResponse) 
};


/**
 * @description Función que permite actualizar el precio de producto
 * @creation David Villanueva 05/01/2020
 * @update
 */
exports.actualizarProductoPrecio = async (req, res) => { 
	var oResponse		 = {};
	oResponse.oData		 = {};
	var oRequest		 = null;
	try { 
		oRequest		 = utils.customRequest(req);
	 
		var oRegistro = {};
		oRegistro.oAuditRequest  = oRequest.oAuditRequest;
		oRegistro.oData		     = oRequest.oData; 
		oRegistro.oData.iId	     = parseInt(req.params.id, 10); 
		const actualizarProductoPrecioResponse = await  productoPrecioTxDao.actualizarProductoPrecio(oRegistro);
		if(actualizarProductoPrecioResponse.iCode !== 1){
		   throw new Error(actualizarProductoPrecioResponse.iCode + "||" + actualizarProductoPrecioResponse.sMessage);
		}
		oResponse.iCode 		= 1; 
		oResponse.sMessage		= 'OK';
		oResponse.oData			= actualizarProductoPrecioResponse.oData; 
	   
	} catch (e) {
	   var oError = utils.customError(e);
	   if (e.name === 'Error') {
		   oResponse.iCode 	= oError.iCode; 
		   oResponse.sMessage	= oError.sMessage;
	   }else{
		   oResponse.iCode 		= -2;
		   oResponse.sMessage	= "Ocurrio un error en el proceso: " +  e.message +" ,Ubicación Error: "+oError.sMessage
	   } 
	   oResponse.oData	= oRequest.oData;
	}finally{
		oResponse.sIdTransaccion =  req.headers.sidtransaccion;
		oResponse = utils.customResponse(oResponse);
	}  
	res.json(oResponse) 
};

/**
 * @description Función que permite eliminar el precio del producto
 * @creation David Villanueva 05/01/2020
 * @update
 */
exports.eliminarProductoPrecio = async (req, res) => { 
	var oResponse			= {};
	oResponse.oData		= {};
	var oRequest			= null;
	try {
		oRequest		 = utils.customRequest(req);
		 
		oRequest.oData.aItems.forEach(async function(e){
			var oRegistro = {};
			oRegistro.oAuditRequest  = oRequest.oAuditRequest;
			oRegistro.oData		  	 = {}; 
			oRegistro.oData.iId	  	 = parseInt(e, 10); 
			const eliminarProductoPrecioResponse = await  productoPrecioTxDao.eliminarProductoPrecio(oRegistro);
			if(eliminarProductoPrecioResponse.iCode !== 1){
				throw new Error(eliminarProductoPrecioResponse.iCode + "||" + eliminarProductoPrecioResponse.sMessage);
			} 
		});
		oResponse.iCode 		= 1; 
		oResponse.sMessage		= 'OK';
	   
	} catch (e) {
	   var oError = utils.customError(e);
	   if (e.name === 'Error') {
		   oResponse.iCode 	= oError.iCode; 
		   oResponse.sMessage	= oError.sMessage;
	   }else{
		   oResponse.iCode 		= -2;
		   oResponse.sMessage	= "Ocurrio un error en el proceso: " +  e.message +" ,Ubicación Error: "+oError.sMessage
	   } 
	   oResponse.oData	= oRequest.oData;
	}finally{
		oResponse.sIdTransaccion =  req.headers.sidtransaccion;
		oResponse = utils.customResponse(oResponse);
	}  
	res.json(oResponse) 
};

