var acumulador=[];
///////////////////
const agrupacion={};///////conjunto de productos seleccionados por el vendedor

var cliente_data=[];/////////data exacta del cliente seleccionado
let almc_id=[];////////////identidicador para la seleccion de un almacen

var promos_insertadas={};

//////variable de emergencia para recodar las prom
var prom_numero={};

/////VARIABLES PARA PROGRAMAR LAS FACTURAS REVISAR DESPUES
const objprogramar={}

let objfactura=[];///////VARIABLES PARA LA MODIFICACION DE LA FACTURA TEMPORAL Y SUS CAMPOS 0CODIGOCLIENTE 1FACTURA

let promos_conjunto_diferenciales=[];/////////promos acumuladas con posibles resultados devueltos

var coti_cant=0;/////variable para guardar el acumulado de cuantos items tiene esta cotizacion

let cont_grupo_id=[];///variable para guardar el id de grupo(promocion dar el mejor premio) y no repetir por cada ves q se busca promo

let cotimodi_tmpitems={};///variable temporal para guardar los agregados,cantidades,removidos items segun seleccion
let cotimodi_tipcli=[];////variable temporal para saber el tipo de cliente de esa coti que se modificara,etc

let marca_seleccionada="";///variable temporal para guardar la seleccion del usuario se reiniciara cada ves q entre