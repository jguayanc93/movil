// RUTAS A SEGUIR SIEMPRE EN TESTEO
const desarrollo="http://127.0.0.1:3000/v1"
const produccion="https://pulpo.compudiskett.com.pe/v1"

////// nuevas rutas con respecto a cerrar sesion
const rutalogout=produccion+"/logout";
////// nuevas rutas con respecto al LOGEO
const rutalogin=produccion+"/login";
const rutaidentificador=produccion+"/login/identificador";
const rutaloginregistro=produccion+"/login/registro";
const rutaloginregistrocompletado=produccion+"/login/registro/completado";
//////nuevas rutas con respecto al VENDEDOR
const rutavendedor=produccion+"/vendedor";
//////////nuevas rutas con respecto ala COTIZACION raiz principal con accesos dinamicos
const rutacotizacionpermisos=produccion+"/cotizacion";
//////nuevas rutas con respecto al CLIENTE ya se busqueda o identificar
const rutaclientebusqueda=produccion+"/cliente/buscar";
const rutaclienteid=produccion+"/cliente/id";
//////nuevas rutas con respecto al PRODUCTO ya sea busqueda o identificar
const rutaproductobuscar=produccion+"/producto/buscar";
const rutaproductoid=produccion+"/producto/id";
const rutaproductoencontrado=produccion+"/producto/encontrado";
/////nuevas rutas con respecto ala rentabilidad o es para ver el carro ? chekear bien esto despues porq no recuerdo
const rutacarritorentabilidad=produccion+"/producto/rentabilidad";
////nuevas rutas con respecto ala COTIZACION CREAR
const rutacotizacioncrear=produccion+"/cotizacion/create";
///nuevos rutas con respecto ala COTIZACION LEER
const rutacotizacionleer=produccion+"/cotizacion/read";
const rutacotizacionleerprom=produccion+"/cotizacion/readprom";
///nuevas rutas con respecto ala COTIZACION MODIFICAR
const rutacotizacionactualizar=produccion+"/cotizacion/update";
///nuevas rutas con respecto ala COTIZACION CAMBIAR ALMACEN
const rutacotizacioncambiaralmacen=produccion+"/cotizacion/almacen";
//////////nuevas rutas con respecto ala PROMOCION raiz principal con accesos dinamicos
const rutapromocionpermisos=produccion+"/promocion";
///nuevas rutas con respecto a PROMOCION BUSCAR Y ADJUNTAR
const rutapromocionbuscador=produccion+"/promocion/revisar";
const rutapromocionrecojedor=produccion+"/promocion/mostrar";
const rutapromocionacoplador=produccion+"/promocion/acoplar";
///nuevas rutas con respecto a PROMOCION ELIMINAR
const rutapromocioneliminar=produccion+"/promocion/eliminar";

///nuevas rutas con respecto ala CUOTA raiz principal con accesos dinamicos
const rutacuotapermisos=produccion+"/cuota"
const rutacuotarevisarregistro=produccion+"/cuota/revisar";
const rutacuotarevisarregistromarca=produccion+"/cuota/marcarevisar";
const rutacuotarevisarregistromarca2=produccion+"/cuota/marcawach";
///nuevas rutas con respecto ala CUOTA registrar
const rutacuotaregistro=produccion+"/cuota/update";
const rutacuotaregistromarcaseleccionada=produccion+"/cuota/marcaupdate";
///nuevas rutas con respecto ala CUOTA para mostrar
const rutacuotamostrar=produccion+"/cuota/mostrar";
const rutacuotamostrarmarca=produccion+"/cuota/marcamostrar";///puede q no sea necesario
///nuevas rutas con respecto ala PRODUCTOS en la BUSQUEDA DE MARCAS
const rutaproductobuscarmarcas=produccion+"/producto/marcas";

///nuevas rutas con respecto ala LISTA raiz principal con accesos dinamicos
const rutalistapermisos=produccion+"/lista";
const rutalistacoti=produccion+"/lista/cotis";
const rutalistacotixdia=produccion+"/lista/cotisxdia";
const rutalistapedi=produccion+"/lista/pedidos";
const rutalistapedixdia=produccion+"/lista/pedidosxdia";
const rutalistafactus=produccion+"/lista/facturas"
const rutalistafactusxdia=produccion+"/lista/facturasxdia";

///////nuevas rutas con respecto al PROGRAMADOR raiz principal con accesos dinamicos
const rutaprogramadorpermisos=produccion+"/programador";
const rutaprogramadordespacharhoy=produccion+"/programador/despacho"
const rutaprogramadorfacturavalida=produccion+"/programador/programar";
const rutaprogramadorfacturaxdia=produccion+"/programador/despachoxdia";

///////nuevas rutas con respecto al FACTURA MODIFICACION raiz principal con accesos dinamicos
const rutafacturapermisos=produccion+"/factura";
const rutafacturacampodespacho=produccion+"/factura/despacho";
const rutafacturacampotransportista=produccion+"/factura/transporte";
const rutafacturacampoatencion=produccion+"/factura/atencion";
const rutafacturacampodireccion=produccion+"/factura/direccion";
const rutafacturacampovendedor=produccion+"/factura/vendedor";
const rutafacturacampoobservacion=produccion+"/factura/observacion";
const rutafacturacampoorden=produccion+"/factura/orden";
/////////nuevas rutas con respecto al FACTURA MODIFICACION CAMPO SELECCIONADO
const rutafacturacambiodespacho=produccion+"/factura/despacho/cambio";
const rutafacturacambiotransportista=produccion+"/factura/transporte/cambio";
const rutafacturacambioatencion=produccion+"/factura/atencion/cambio";
const rutafacturacambiodireccion=produccion+"/factura/direccion/cambio";
const rutafacturacambiovendedor=produccion+"/factura/vendedor/cambio";
const rutafacturacambioobservacion=produccion+"/factura/observacion/cambio";
const rutafacturacambioorden=produccion+"/factura/orden/cambio";
/////////nuevas rutas con respecto al FACTURA MODIFICACION CAMPO ACTUALISADO
const rutafacturacampoactualisar=produccion+"/factura/cambiado";

const rutacuota=desarrollo+"/vendedor/cuota";

const httpcors2="https://pulpo.compudiskett.com.pe/login/chekear";////REVISAR
const cookiedata="https://pulpo.compudiskett.com.pe/login/mostrar";////REVISAR
const cookieclear="https://pulpo.compudiskett.com.pe/login/clean";////REVISAR


const rutactualisar=desarrollo+"/vendedor/modificar";///SON PARA CONOCER DATOS DE LA FACTURA
const rutarevelar=desarrollo+"/vendedor/recomendacion";///FACTURA TIPO DE ENTREGA

const rutaropc2="http://127.0.0.1:3000/v1/vendedor/opc2";
const rutaropc3="http://127.0.0.1:3000/v1/vendedor/opc3";
const rutaropc4="http://127.0.0.1:3000/v1/vendedor/opc4";
const rutaropc5="http://127.0.0.1:3000/v1/vendedor/opc5";
const rutaropc6="http://127.0.0.1:3000/v1/vendedor/revisar";
const rutaropc7="http://127.0.0.1:3000/v1/vendedor/revisar";

const rutabcliente=produccion+"/coti/busqueda";
const rutafindcli="http://127.0.0.1:3000/v1/coti/identificador";////posible colision de ruta
const rutarevisar="http://127.0.0.1:3000/v1/vendedor/revisar";/////revisar todas las rutas

const rutabproducto="http://127.0.0.1:3000/v1/coti/producto";
const rutabproductopartnumber="http://127.0.0.1:3000/v1/coti/productopartnumber";///para buscar por partnumber
const rutabproductoid="http://127.0.0.1:3000/v1/coti/productoid";

const rutacrentabilidad="http://127.0.0.1:3000/v1/coti/rentabilidad";////rentabilidad

const rutapromocion="http://127.0.0.1:3000/v1/coti/opg";///aplicar promocion

const rutacreacion=desarrollo+"/coti/creacion";///no te olvides de crear la ruta para la creacion

const rutacotizacion=desarrollo+"/coti/buscar";

const rutaprom=desarrollo+"/prom/verificar";

const rutaaddprom=desarrollo+"/prom/add";

// const rutabfacturavalida=desarrollo+"/vendedor/programar";
const rutafacturaprogramada=desarrollo+"/vendedor/programarventanilla";
const rutafacturaprogramadaminutos=desarrollo+"/vendedor/programarventanillaminutos";


const rutapivot="http://127.0.0.1:3000/v1/prom/pivot";
const rutacuotageneral="http://127.0.0.1:3000/v1/cuotas/general";

// const rutalistacoti=desarrollo+"/lista/cotis";
const rutalistacotidia=desarrollo+"/lista/cotis/dia";

// const rutalistapedi=desarrollo+"/lista/pedis";
const rutalistapedidia=desarrollo+"/lista/pedis/dia";

const rutalistafac=desarrollo+"/lista/factus";
const rutalistafacdia=desarrollo+"/lista/factus/dia";

const rutalistadespacho=desarrollo+"/lista/despacho";
const rutalistadespachodia=desarrollo+"/lista/despacho/dia";

const rutacotizacionbmodificar=desarrollo+"/coti/modificar";
const rutacotizacionbprdagregar=desarrollo+"/coti/idprdmodificadoagregado";
const rutacotizacioncmodificacion=desarrollo+"/coti/crearmodificacion";

const rutamarcas=produccion+"/reporte/marcas";
const rutastock=produccion+"/reporte/stoc";
const rutatiempo=produccion+"/reporte/tiempo";
const rutamarcaprecios=produccion+"/reporte/precios";