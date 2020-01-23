// basado en la re_liquidacion del inv450A, SALUD
function re_liquidar_SALUD(data, tarifas, callback) {
    var sw_Cl
    var dato = data
    var tarifas_liq = tarifas
    var tablas_liq = []
    var maest_Artic = []
    var medicamentos = []

    console.log(dato)

    dato.VALOR_IVA = ''

    if (dato.CLASE == '0') {
        obtenerDatosCompletos({ nombreFd: 'ARTICULOS' }, function (articulos) {
            maest_Artic = articulos.ARTICULOS;
            maest_Artic.pop()
            console.log(maest_Artic)
            obtenerDatosCompletos({ nombreFd: 'MEDICAMENTOS' }, function (data) {
                medicamentos = data.MEDICAMENTOS;
                medicamentos.pop()
                console.log(medicamentos)

                dato.TARIF = ''

                for (var i in dato.TABLA) {
                    if (dato.TABLA[i].GRUPO.trim() != '') {
                        var articulo_busqueda = '0' + dato.TABLA[i].ARTICULO.trim()
                        var busquedaArtic = maest_Artic.find(artic => artic.LLAVE_ART.trim() == articulo_busqueda)

                        if (!busquedaArtic) {
                            busquedaArtic = [{ 'VR_VENTA_1': '', 'VR_ULT_COMPRA': '', 'IVA': '', 'VLR_LISTA_COMP': '', 'VLR_REF': '' }]
                            busquedaArtic.VR_VENTA_1 = dato.TABLA[i].VALOR_FACT / dato.TABLA[i].CANTIDAD
                            busquedaArtic.VR_ULT_COMPRA = busquedaArtic.VR_VENTA_1
                        }

                        dato['VALOR_BASE1_IVA'] = ''
                        dato['VALOR_BASE2_IVA'] = ''
                        dato['VALOR_BASE3_IVA'] = ''
                        dato['VALOR_IVA_FACT'] = ''
                        dato['FACTOR_INCREM'] = ''
                        

                        switch (tarifas_liq.BASE_MED) {
                            case '1':
                                leer_promedio_SALUD(dato, i, busquedaArtic, tarifas_liq, medicamentos, '1')
                                break;
                            case '2':
                                if (busquedaArtic.VR_ULT_COMPRA.trim() == '' || busquedaArtic.VR_ULT_COMPRA == '0') {

                                    if (busquedaArtic.VLR_LISTA_COMP > '0') {
                                        busquedaArtic.VR_ULT_COMPRA = busquedaArtic.VLR_LISTA_COMP
                                        busquedaArtic.VR_VENTA_1 = busquedaArtic.VR_ULT_COMPRA
                                        leer_convenio_SALUD(dato, i, busquedaArtic, tarifas_liq, medicamentos)
                                    } else {
                                        leer_promedio_SALUD(dato, i, busquedaArtic, tarifas_liq, medicamentos, '2')
                                    }
                                }
                                break;
                            case '4':
                                if (busquedaArtic.VLR_REF > '0') {
                                    busquedaArtic.VR_VENTA_1 = busquedaArtic.VLR_REF
                                }
                                leer_convenio_SALUD(dato, i, busquedaArtic, tarifas_liq, medicamentos)
                                break;
                            default:
                                leer_convenio_SALUD(dato, i, busquedaArtic, tarifas_liq, medicamentos)
                                break;
                        }
                    }
                }
            }, 'OFF')
        }, 'ON')

    } else {
        obtenerDatosCompletos({ nombreFd: 'TABLAS' }, function (tablas) {
            tablas_liq = tablas.TABLA;
            tablas_liq.pop()
            console.log(tablas_liq)

            sw_Cl = dato.CLASE
            if (dato.CLASE == '7') sw_Cl = '5'

            tablas_liq = tablas_liq.filter(tabla => tabla.TIPO == dato.CLASE && tabla.COD == tarifas_liq.TABLA[sw_Cl])
            console.log(tablas_liq)

            for (var i in dato.TABLA) {
                if (dato.TABLA[i].GRUPO.trim() != '') {
                    var busquedaTabla_Articulo = tablas_liq.find(tab => tab.COD_SER.trim() == dato.TABLA[i].ARTICULO.trim())
                    console.log(busquedaTabla_Articulo)
                    if (busquedaTabla_Articulo) leerMonto_SALUD(dato, i, tarifas_liq, busquedaTabla_Articulo)
                }
            }
            console.log(dato)

        }, 'ONLY');
    }
}

function leer_promedio_SALUD(dato, i, busquedaArtic, tarifas_liq, medicamentos, orden) {
    var almacen
    var articulo = busquedaArtic.ALMACEN.split('')
    articulo = articulo[1]

    if (articulo != '9') {
        obtenerDatosCompletos({ nombreFd: 'SALDOS' }, function (data) {
            var arraySaldos = data.SALDOS
            arraySaldos.pop()
            almacen = 'ALM01'
            if ($_USUA_GLOBAL[0].PUC_USU == '4' || $_USUA_GLOBAL[0].PUC_USU == '6') almacen = 'DR001'

            var busquedaSaldos = arraySaldos.find(saldo => saldo.COD_ALMAC == almacen && saldo.COD_ARTIC.trim() == busquedaArtic.ALMACEN.trim())

            if (busquedaSaldos) busquedaArtic.VR_VENTA_1 = busquedaSaldos.SALDO_ACT_CANT / SALDO_ACT_VLR
            if (orden == '2') busquedaArtic.VR_ULT_COMPRA = busquedaArtic.VR_VENTA_1

            leer_convenio_SALUD(dato, i, busquedaArtic, tarifas_liq, medicamentos)
        })
    } else {
        leer_convenio_SALUD(dato, i, busquedaArtic, tarifas_liq, medicamentos)
    }
}

function leer_convenio_SALUD(dato, i, busquedaArtic, tarifas_liq, medicamentos) {
    var busqMedicamentos = medicamentos.find(med => med.TARIF == dato.CONVENIO_NUM && med.ARTICULO.trim() == dato.TABLA[i].ARTICULO.trim())

    if (busqMedicamentos) {
        busquedaArtic.VR_VENTA_1 = busqMedicamentos.MONTO
    } else {
        busqMedicamentos = [{ 'REGUL': ' ', 'MONTO': '0' }]
    }

    //AHORA SIGUE PROCESO DATO-DROGAS

    if (tarifas_liq.BASE_MED == '1' || tarifas_liq.BASE_MED == '2' || tarifas_liq.BASE_MED == '3' || tarifas_liq.BASE_MED == '4') {
        switch (dato.TABLA[i].GRUPO) {
            case 'PO': dato.FACTOR_INCREM = parseFloat(tarifas_liq.PORC_PO) / 100
                break;
            case 'NP': dato.FACTOR_INCREM = parseFloat(tarifas_liq.PORC_NP) / 100
                break;
            case 'MO': dato.FACTOR_INCREM = parseFloat(tarifas_liq.PORC_MO) / 100
                break;
            default: dato.FACTOR_INCREM = parseFloat(tarifas_liq.PORC_MQ) / 100
                break;
        }
    } else {
        dato.FACTOR_INCREM = 1
    }

    if (busquedaArtic.IVA.trim() != '') {
        switch (busquedaArtic.IVA) {
            case '1': dato.VALOR_BASE1_IVA = dato.VALOR_BASE1_IVA + parseFloat(busquedaArtic.VR_VENTA_1)
                break;
            case '2': dato.VALOR_BASE2_IVA = dato.VALOR_BASE2_IVA + parseFloat(busquedaArtic.VR_VENTA_1)
                break;
            case '3': dato.VALOR_BASE3_IVA = dato.VALOR_BASE3_IVA + parseFloat(busquedaArtic.VR_VENTA_1)
                break;
        }
    }

    dato.VALOR_IVA_FACT = (dato.VALOR_BASE1_IVA * parseInt($_USUA_GLOBAL[0].IVA1)) + (dato.VALOR_BASE2_IVA * parseInt($_USUA_GLOBAL[0].IVA2)) + (dato.VALOR_BASE3_IVA * parseInt($_USUA_GLOBAL[0].IVA3))
    
}

function leerMonto_SALUD(dato, i, tarifas_liq, tabla) {
    var SW_APR
    console.log(tabla)

    if ((tabla.COD == 'I4' || tabla.COD == 'I4') && (dato.PREFIJO == 'P') && (tabla.GR_SER == '93')) {
        if ((tabla.CD_SER == '1000') || (tabla.CD_SER == '9400') || (tabla.CD_SER == '8300') || (tabla.CD_SER == '7000')) {
            tabla.MONTO = parseFloat(tabla.MONTO) * 1.1
        }
    }

    var numerico = $.isNumeric(tarifas_liq.SAL_MIN)
    if (tarifas_liq.SAL_MIN == '000000000' || numerico == false) tarifas_liq.SAL_MIN = $_USUA_GLOBAL[0].SAL_MIN / 30

    switch (tabla.FORMA_LIQ) {
        case '1':
            SW_APR = '1'
            dato.TABLA[i].VALOR_UNIT = Math.round(parseFloat(tabla.MONTO) * tarifas_liq.HN_QUIR)
            break;
        case '2':
            SW_APR = '100'
            dato.TABLA[i].VALOR_UNIT = tabla.MONTO
            break;
        case '4':
            SW_APR = '100'
            dato.TABLA[i].VALOR_UNIT = Math.round(parseFloat(tabla.MONTO) * tarifas_liq.SAL_MIN)
            break;
        default:
            SW_APR = '10'
            dato.TABLA[i].VALOR_UNIT = parseFloat(tabla.MONTO)
            break;
    }
    //buscar-incremento
    if (tabla.INCREM == '0') {
        if (dato.CLASE == '7') {

            switch (dato.TABLA[i].GRUPO) {
                case '90':
                    tabla.INCREM = '2'
                    break;
                case '87':
                    tabla.INCREM = '3'
                    break;
                case '88':
                    tabla.INCREM = '3'
                    break;
                case '89':
                    tabla.INCREM = '5'
                    break;
                default:
                    if (dato.TABLA[i].GRUPO < '87') {
                        tabla.INCREM = '1'
                    } else {
                        tabla.INCREM = '4'
                    }
                    break;
            }

        } else {
            tabla.INCREM = dato.CLASE
        }
    }

    if (tabla.INCREM = '9') {
        dato.FACTOR_W = '1'
    } else {
        dato.FACTOR_W = Math.round(parseFloat(tarifas_liq.TABLA[tabla.INCREM].PORC_TABLA) / 100)
    }
    //

    var VALOR_APROX = ''

    dato.NIT.replace(/,/g, '')
    if ((tarifas_liq.COD = 'H4') || (dato.NIT == '830092718')) {
        VALOR_APROX = Math.round(dato.TABLA[i].VALOR_UNIT / SW_APR)
        dato.TABLA[i].VALOR_UNIT = Math.round(VALOR_APROX * SW_APR)
    }

    dato.TABLA[i].VALOR_UNIT = Math.round(dato.TABLA[i].VALOR_UNIT * dato.FACTOR_W)

    if (tarifas_liq.COD = 'H4') {
        VALOR_APROX = Math.round(dato.TABLA[i].VALOR_UNIT * 1)
        dato.TABLA[i].VALOR_UNIT = VALOR_APROX

    } else if (tabla.INCREM != '9') {
        VALOR_APROX = Math.round(dato.TABLA[i].VALOR_UNIT / SW_APR)
        dato.TABLA[i].VALOR_UNIT = Math.round(VALOR_APROX * SW_APR)
    }

    if (tarifas_liq.COD == 'PP') {
        dato.TABLA[i].VALOR_FACT = Math(dato.TABLA[i].VALOR_UNIT * dato.TABLA[i].CANTIDAD)
    } else {
        dato.TABLA[i].VALOR_FACT = Math.round(dato.TABLA[i].VALOR_UNIT * dato.TABLA[i].CANTIDAD)
        dato.TABLA[i].VALOR_FACT.toString()
    }
}
