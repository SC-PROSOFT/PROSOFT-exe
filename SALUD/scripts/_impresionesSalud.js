///      IMPRESIONES DE SALUD ///
function FAC145(params, callback) {
    console.debug(params);
    params.LOTE = undefined ? alert('Falta definir el Lote') : params.LOTE = params.LOTE;
    params.COMPROBANTE = undefined ? alert('Falta definir el Comprobante') : params.COMPROBANTE = params.COMPROBANTE;
    params.MAYOEU1 = undefined ? alert('Falta definir el Mayordeu1') : params.MAYDEU1 = params.MAYDEU1;
    params.MAYDEU2 = undefined ? alert('Falta definir el Mayordeu2') : params.MAYDEU2 = params.MAYDEU2;
    params.MAYDEU3 = undefined ? alert('Falta definir el Mayordeu1') : params.MAYDEU3 = params.MAYDEU3;
    let URL = get_url("APP/SALUD/FAC145.DLL");
    postData({
        datosh: datosEnvio() + params.LOTE + '|' + params.COMPROBANTE + '|' + params.MAYORDEU1 + '|' + params.MAYORDEU2 + '|' + params.MAYORDEU3 + '|'
    }, URL)
        .then((data) => {
            console.debug(data);
            FAC145.IMPRESION = new Object;
            FAC145.IMPRESION.NITTER = data.IMPRESION[0].NIT_TER;
            moment.updateLocale('es', {
                months: [
                    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio",
                    "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
                ]
            }
            );
            let fecha = data.IMPRESION[0].FECHA_MOV;
            if ((parseInt(fecha) > 0) && (parseInt(fecha) < 70)){
                fecha = '20' + data.IMPRESION[0].FECHA_MOV;
            } else {
                fecha = '19' + data.IMPRESION[0].FECHA_MOV;
            }
            FAC145.IMPRESION.FECHAMOV = moment(fecha).format('MMMM DD YYYY');
            FAC145.IMPRESION.REFERMOV = data.IMPRESION[0].REFER_MOV;
            FAC145.IMPRESION.OTROMOV = data.IMPRESION[0].OTRO_MOV;
            FAC145.IMPRESION.TIPOCOMP = data.IMPRESION[0].TIPO_COMP;
            FAC145.IMPRESION.IDPAC = data.IMPRESION[0].ID_PAC;
            FAC145.IMPRESION.DESCRIPTER = data.IMPRESION[0].DESCRIP_TER;
            FAC145.IMPRESION.DIRECCPACI = data.IMPRESION[0].DIRECC_PACI;
            FAC145.IMPRESION.TELTER = data.IMPRESION[0].TEL_TER;
            FAC145.IMPRESION.DETALLEMOV = data.IMPRESION[0].DETALLE_MOV;
            FAC145.IMPRESION.OPERMOV = data.IMPRESION[0].OPER_MOV;
            FAC145.IMPRESION.NOMBREPACI = data.IMPRESION[0].NOMBRE_PACI;
            FAC145.IMPRESION.APELLIDOPACI = data.IMPRESION[0].APELLIDO_PACI;
            FAC145.IMPRESION.TELEFONOPACI = data.IMPRESION[0].TELEFONO_PACI;
            FAC145.IMPRESION.NETO = data.IMPRESION[0].NETO;
            FAC145.IMPRESION.NOMBREMAE = data.IMPRESION[0].NOMBRE_MAE;
            FAC145.IMPRESION.DOCUMMOV = data.IMPRESION[0].DOCUM_MOV;
            FAC145.IMPRESION.CUENTAMOV = data.IMPRESION[0].CUENTA_MOV;
            FAC145.IMPRESION.TOTALDDB = data.IMPRESION[0].TOTAL_DB;
            FAC145.IMPRESION.TOTALCR = data.IMPRESION[0].TOTAL_CR;
            FAC145.IMPRESION.LOTE = params.LOTE;
            FAC145.IMPRESION.COMPROBANTE = params.COMPROBANTE;
            FAC145.IMPRESION.NOMBREUSU = $_USUA_GLOBAL[0].NOMBRE;
            FAC145.IMPRESION.SUCURSAL = $_USUA_GLOBAL[0].PREFIJ;
            FAC145.IMPRESION.NITUSU = $_USUA_GLOBAL[0].NIT;
            FAC145.IMPRESION.DIRECCIONUSU = $_USUA_GLOBAL[0].DIRECC;
            FAC145.IMPRESION.TELEFONOUSU = $_USUA_GLOBAL[0].TEL;
            FAC145.IMPRESION.NOMBRECIU = data.IMPRESION[0].NOMBRE_CIU;
            let valor = FAC146(data.IMPRESION[0].NETO);
            FAC145.IMPRESION.VALORENLETRAS = valor;
            FAC145.IMPRESION.NIT = $_USUA_GLOBAL[0].NIT.toString().substring(1,9);
            opcionesImpresion_FAC145 = {
                datos: FAC145.IMPRESION,
                tipo:'pdf',
                formato: 'salud/FAC145.html',
                nombre: 'PRUEBAFAC145'
            }
            imprimir(opcionesImpresion_FAC145, callback);
            // callback(data);
        })
        .catch((error) => {
            console.log(error);
        });
}