/////NUEVA COTIZACION
var cliente_data=[];/////////data exacta del cliente seleccionado
let almc_id="01";////////////identificador para la seleccion del almacen
const agrupacion={};///////conjunto de productos seleccionados por el vendedor
var promos_insertadas={};////PODRIA NO VALER NADA
///////////////////
////MODIFICAR COTIZACION
let cotimodi_tipcli=[];////variable temporal para saber el tipo de cliente de esa coti que se modificara,etc
let cotimodi_tmpitems={};///variable temporal para guardar los agregados,cantidades,removidos items segun seleccion
//////////////////
////MODIFICAR FACTURA

//////////////////
////MANEJADOR PROMOCIONES
var coti_cant=0;/////variable para guardar el acumulado de cuantos items tiene esta cotizacion
let cont_grupo_id=[];///variable para guardar el id de grupo(promocion dar el mejor premio) y no repetir por cada ves q se busca promo
var prom_numero={};//////variable de emergencia para recodar las prom
let promos_conjunto_diferenciales=[];/////////promos acumuladas con posibles resultados devueltos
//////////////////
var acumulador=[];


/////VARIABLES PARA PROGRAMAR LAS FACTURAS REVISAR DESPUES
const objprogramar={}

let objfactura=[];///////VARIABLES PARA LA MODIFICACION DE LA FACTURA TEMPORAL Y SUS CAMPOS 0CODIGOCLIENTE 1FACTURA


let marca_seleccionada="";///variable temporal para guardar la seleccion del usuario se reiniciara cada ves q entre