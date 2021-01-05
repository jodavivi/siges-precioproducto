const Sequelize =  require('sequelize');
const db = require('../../config/db'); 

db.createSchema("ventas").then(() => {
    // esquema para el ventas
});

const ProductoPrecio = db.define('producto_precio', { 
    Id : {
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement : true
    },
    EstadoId            : Sequelize.INTEGER,
    UsuarioCreador      : Sequelize.STRING(64),
    FechaCreacion       : Sequelize.DATE,
    TerminalCreacion    : Sequelize.STRING(64),
    UsuarioModificador  : Sequelize.STRING,
    FechaModificacion   : Sequelize.DATE,
    TerminalModificador : Sequelize.STRING(64),
    TransaccionId       : Sequelize.STRING(64),
    SociedadId          : Sequelize.INTEGER, 
    Sociedad            : Sequelize.STRING(32),
    SedeId              : Sequelize.INTEGER, 
    Sede                : Sequelize.STRING(64),
    AlmacenId           : Sequelize.INTEGER, 
    Almacen             : Sequelize.STRING(64), 
    NumeroDocumento     : Sequelize.STRING(64), 
    ProductoId          : Sequelize.INTEGER,
    ProductoCod         : Sequelize.STRING(16),
    ProductoCodBarra    : Sequelize.STRING(64), 
    Producto            : Sequelize.STRING(128),   
    PrecioVenta         : Sequelize.FLOAT,
    PrecioDefecto       : Sequelize.INTEGER, //1:Precio por Defecto
    Comentario          : Sequelize.STRING(128)
} 
,
{
    schema: "ventas"
});

 
module.exports = ProductoPrecio;