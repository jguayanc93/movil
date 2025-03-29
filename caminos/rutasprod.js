// RUTAS A SEGUIR SIEMPRE EN TESTEO
const desarrollo="http://127.0.0.1:3000/v1"
const produccion="https://pulpo.compudiskett.com.pe/v1"

// const rutalogin="https://pulpo.compudiskett.com.pe/v1/login";
const rutalogin=produccion+"/login";
// const rutacuota="https://pulpo.compudiskett.com.pe/v1/vendedor/cuota";
const rutacuota=produccion+"/vendedor/cuota";

const httpcors2="https://pulpo.compudiskett.com.pe/login/chekear";////REVISAR
const cookiedata="https://pulpo.compudiskett.com.pe/login/mostrar";////REVISAR
const cookieclear="https://pulpo.compudiskett.com.pe/login/clean";////REVISAR


const rutactualisar=produccion+"/vendedor/modificar";///SON PARA CONOCER DATOS DE LA FACTURA
const rutarevelar="http://127.0.0.1:3000/v1/vendedor/recomendacion";///FACTURA TIPO DE ENTREGA

const rutaropc2="http://127.0.0.1:3000/v1/vendedor/opc2";
const rutaropc3="http://127.0.0.1:3000/v1/vendedor/opc3";
const rutaropc4="http://127.0.0.1:3000/v1/vendedor/opc4";
const rutaropc5="http://127.0.0.1:3000/v1/vendedor/opc5";
const rutaropc6="http://127.0.0.1:3000/v1/vendedor/revisar";
const rutaropc7="http://127.0.0.1:3000/v1/vendedor/revisar";

const rutabcliente="http://127.0.0.1:3000/v1/coti/busqueda";
const rutafindcli="http://127.0.0.1:3000/v1/coti/identificador";////posible colision de ruta
const rutarevisar="http://127.0.0.1:3000/v1/vendedor/revisar";/////revisar todas las rutas

const rutabproducto="http://127.0.0.1:3000/v1/coti/producto";
const rutabproductoid="http://127.0.0.1:3000/v1/coti/productoid";

const rutacrentabilidad="http://127.0.0.1:3000/v1/coti/rentabilidad";////rentabilidad

const rutapromocion="http://127.0.0.1:3000/v1/coti/opg";///aplicar promocion

const rutacreacion=produccion+"/coti/creacion";///no te olvides de crear la ruta para la creacion

const rutacotizacion=produccion+"/coti/buscar";

const rutaprom=produccion+"/prom/verificar";

const rutaaddprom=produccion+"/prom/add";

const rutabfacturavalida=produccion+"/vendedor/programar";
const rutafacturaprogramada=produccion+"/vendedor/programarventanilla";
const rutafacturaprogramadaminutos=produccion+"/vendedor/programarventanillaminutos";


const rutapivot="http://127.0.0.1:3000/v1/prom/pivot";
const rutacuotageneral="http://127.0.0.1:3000/v1/cuotas/general";

const rutalistacoti=produccion+"/lista/cotis";
const rutalistacotidia=produccion+"/lista/cotis/dia";

const rutalistapedi=produccion+"/lista/pedis";
const rutalistapedidia=produccion+"/lista/pedis/dia";

const rutalistafac=produccion+"/lista/factus";
const rutalistafacdia=produccion+"/lista/factus/dia";

const rutalistadespacho=produccion+"/lista/despacho";
const rutalistadespachodia=produccion+"/lista/despacho/dia";