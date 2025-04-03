// RUTAS A SEGUIR SIEMPRE EN TESTEO
const desarrollo="http://127.0.0.1:3000/v1"
const produccion="https://pulpo.compudiskett.com.pe/v1"

// const rutalogin="https://pulpo.compudiskett.com.pe/v1/login";
const rutalogin=desarrollo+"/login";
// const rutacuota="https://pulpo.compudiskett.com.pe/v1/vendedor/cuota";
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

const rutabcliente="http://127.0.0.1:3000/v1/coti/busqueda";
const rutafindcli="http://127.0.0.1:3000/v1/coti/identificador";////posible colision de ruta
const rutarevisar="http://127.0.0.1:3000/v1/vendedor/revisar";/////revisar todas las rutas

const rutabproducto="http://127.0.0.1:3000/v1/coti/producto";
const rutabproductoid="http://127.0.0.1:3000/v1/coti/productoid";

const rutacrentabilidad="http://127.0.0.1:3000/v1/coti/rentabilidad";////rentabilidad

const rutapromocion="http://127.0.0.1:3000/v1/coti/opg";///aplicar promocion

const rutacreacion=desarrollo+"/coti/creacion";///no te olvides de crear la ruta para la creacion

const rutacotizacion=desarrollo+"/coti/buscar";

const rutaprom=desarrollo+"/prom/verificar";

const rutaaddprom=desarrollo+"/prom/add";

const rutabfacturavalida=desarrollo+"/vendedor/programar";
const rutafacturaprogramada=desarrollo+"/vendedor/programarventanilla";
const rutafacturaprogramadaminutos=desarrollo+"/vendedor/programarventanillaminutos";


const rutapivot="http://127.0.0.1:3000/v1/prom/pivot";
const rutacuotageneral="http://127.0.0.1:3000/v1/cuotas/general";

const rutalistacoti=desarrollo+"/lista/cotis";
const rutalistacotidia=desarrollo+"/lista/cotis/dia";

const rutalistapedi=desarrollo+"/lista/pedis";
const rutalistapedidia=desarrollo+"/lista/pedis/dia";

const rutalistafac=desarrollo+"/lista/factus";
const rutalistafacdia=desarrollo+"/lista/factus/dia";

const rutalistadespacho=desarrollo+"/lista/despacho";
const rutalistadespachodia=desarrollo+"/lista/despacho/dia";

const rutacotizacionbmodificar=desarrollo+"/coti/modificar";
const rutacotizacionbprdagregar=desarrollo+"/coti/idprdmodificadoagregado";
const rutacotizacioncmodificacion=desarrollo+"/coti/crearmodificacion";