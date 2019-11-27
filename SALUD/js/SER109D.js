SER109D = [];

function loaderhearth(estado) {
    // svg {
    //     height: 100vh;
    //     width: 100vw;
    //     background-color: white;
    //   }

    //   path {
    //     stroke-dasharray: 100;
    //     animation: draw 2s infinite;
    //   }

    //   @keyframes draw {
    //     from {
    //       stroke-dashoffset: 0
    //     }
    //     to {
    //       stroke-dashoffset: 200;
    //     }
    //   }stroke-dasharray: 450;
    //   stroke-dashoffset: 450;
    // <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="640" height="640"><defs><path d="M355.13 265.47h-22.69l-5.12-10.62-4.39 19.4-4.39-48.31-11.72 91.5-10.98-117.85-8.05 84.91-6.58-32.21-2.93 13.18h-24.16" id="a"/></defs><use xlink:href="#a" fill-opacity="0" stroke="#000"/></svg>
    /* <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 300">
        <rect class="mouse" x="0" y="0" width="800" height="300"/>
        <path class="diamondSt pathTulip" d="M400,280l-90-130l90-130l90,130L400,280z"/>
        <style>
            .mouse { fill: #E5E4E3; }
            .pathTulip {
                fill: #E5E4E3;
                stroke: #CC2954;
                stroke-width: 10px;
                stroke-linejoin: round;
                stroke-linecap: round;
                stroke-dasharray: 1000;
                stroke-dashoffset: 1000;
            }
            .diamondSt {
                animation-name: diamondStroke;
                animation-duration: 4s;
                animation-iteration-count: infinite;
            }
            @keyframes diamondStroke {
                0%   { stroke-dashoffset: 1000; }
                50%   { stroke-dashoffset: 0; }
                100% { stroke-dashoffset: 1000; }
            }
        </style>
    </svg> */
    // <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="1920" height="1920"><defs><path class="diamondSt pathTulip" d="M1920 1036.2h-214.47l-49.67-200.28-31.61 188.5h-29.35l-29.34 393.49-72.25-1029.68-56.44 699.8-24.83-160.22-38.38 96.61-298-7.07-40.64-110.75-29.35 117.82h-31.61l-29.35 235.62-74.5-629.12-45.15 428.84-29.35-87.18-33.86 51.84H463.84l-47.4-35.35-60.96 47.13-36.12 68.33-69.99-207.35-51.92 139.02-27.09-32.99-20.32 21.21H0" id="a"/></defs><use xlink:href="#a" fill-opacity="0" stroke="#000"/></svg>

    $('#loader_content').append('<div id="hearthpulseanimation" style="display:flex; width: 100%; height: 100%; align-items: center; justify-content: center;"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="1920" height="1920"><defs><path class="diamondSt pathTulip" d="M1920 1036.2h-214.47l-49.67-200.28-31.61 188.5h-29.35l-29.34 393.49-72.25-1029.68-56.44 699.8-24.83-160.22-38.38 96.61-298-7.07-40.64-110.75-29.35 117.82h-31.61l-29.35 235.62-74.5-629.12-45.15 428.84-29.35-87.18-33.86 51.84H463.84l-47.4-35.35-60.96 47.13-36.12 68.33-69.99-207.35-51.92 139.02-27.09-32.99-20.32 21.21H0" id="a"/></defs><use xlink:href="#a" fill-opacity="0" stroke="#000"/></svg></div>')
}

$(document).ready(() => {
    // $('#ADICIONALES_SER109D').hide();
    _inputControl('disabled');
    _evaluarprefijo_SER109D();
    SER109D.ADMINW = localStorage.getItem('Usuario').trim();
    SER109D.FECHANUM = $_USUA_GLOBAL[0].FECHALNK;
    SER109D.NITUSU = $_USUA_GLOBAL[0].NIT;
    SER109D.SALMIN = $_USUA_GLOBAL[0].SAL_MIN;
    SER109D.ANOALFA = $_USUA_GLOBAL[0].FECHALNK.substring(0, 2);
    SER109D.PUCUSU = $_USUA_GLOBAL[0].PUC
    SER109D.ANOALFA = '20' + SER109D.ANOALFA;
    SER109D.ABONOSW = 0;
    SER109D.GLOSASW = 0;
    SER109D.NOTASW = 0;
})

function _evaluarprefijo_SER109D() {
    validarInputs({
        form: '#VALIDAR1_SER109D',
        orden: '1'
    },
        () => { _toggleNav() },
        () => {
            SER109D.PREFIJOW = prefijoMask_SER109D.value;
            let URL = get_url("APP/CONTAB/CON007.DLL");
            postData({ datosh: datosEnvio() + '9' + SER109D.PREFIJOW }, URL)
                .then(data => {
                    console.debug(data);
                    var data = data.split("|");
                    numeroprefijoMask_SER109D.typedValue = parseInt(data[1].substring(3,9));
                    _evaluarnumeroprefijo_SER109D();
                })
                .catch(err => {
                    console.debug(err);
                })
        }
    )
}

function _evaluarnumeroprefijo_SER109D() {
    validarInputs({
        form: '#VALIDAR2_SER109D',
        orden: '1'
    },
        () => { _evaluarprefijo_SER109D() },
        () => {
            SER109D.NUMEROW = numeroprefijoMask_SER109D.value;
            SER109D.LLAVEW = SER109D.PREFIJOW + SER109D.NUMEROW.padStart(6, '0');
            let URL = get_url("APP/SALUD/SER109D.DLL");
            postData({
                datosh: datosEnvio() + '1|' + SER109D.LLAVEW
            }, URL)
                .then(data => {
                    console.debug(data);
                    SER109D.NUMERACION = data.NUMERACION[0];
                    $('#entidad_SER109D').val(SER109D.NUMERACION.DESCRIP_NUM);
                    $('#nombrepaciente_SER109D').val(SER109D.NUMERACION.NOMBREPAC_NUM);
                    SER109D.ESTADOW = SER109D.NUMERACION.ESTADO_NUM;
                    switch (SER109D.NUMERACION.ESTADO_NUM) {
                        case '0':
                            $('#estadofactura_SER109D').val(SER109D.NUMERACION.ESTADO_NUM + ' Activa');
                            break;
                        case '1':
                            $('#estadofactura_SER109D').val(SER109D.NUMERACION.ESTADO_NUM + ' Cerrada');
                            break;
                        case '2':
                            $('#estadofactura_SER109D').val(SER109D.NUMERACION.ESTADO_NUM + ' Anulada');
                            break;
                        case '3':
                            $('#estadofactura_SER109D').val(SER109D.NUMERACION.ESTADO_NUM + ' Bloqueada');
                            break;
                        default:
                            break;
                    }
                    SER109D.ANORETNUM = SER109D.NUMERACION.FECHARET_NUM.substring(0, 4);
                    if ((parseInt(SER109D.ANORETNUM) > 0) && (SER109D.ANORETNUM != SER109D.ANOALFA)) {
                        CON851('2R', '2R', null, 'error', 'Error');
                        numeroprefijoMask_SER109D.typedValue = '';
                        _evaluarnumeroprefijo_SER109D();
                    } else if (SER109D.NUMERACION.FACTCAPIT_NUM == SER109D.PREFIJOW + SER109D.NUMEROW) {
                        if (SER109D.NUMERACION.FECHAING_NUM.substring(0, 4) == SER109D.ANOALFA) {
                            // INV 020H
                        }
                    } else {
                        // INV 020F
                        _validarestadonum_SER109D();
                    }
                })
                .catch(error => {
                    console.log(error);
                    _evaluarnumeroprefijo_SER109D();
                });
        }
    )
}

function _validarestadonum_SER109D() {
    if (SER109D.NUMERACION.ESTADO_NUM == '1') {
        _afectarnumeracion_SER109D();
    } else {
        let datos_envio = datosEnvio()
        datos_envio += SER109D.ADMINW + '|' + SER109D.LLAVEW + '|' + SER109D.FECHANUM + '|' + SER109D.NITUSU + '|' + SER109D.SALMIN
        console.debug(datos_envio);
        SolicitarDll({ datosh: datos_envio }, data => {
            data = data.split('|');
            if (data[0].trim() == '00') {
                let URL = get_url("APP/SALUD/SER109D.DLL");
                postData({
                    datosh: datosEnvio() + '1|' + SER109D.PREFIJOW + SER109D.NUMEROW.padStart(6, '0')
                }, URL)
                    .then(data => {
                        console.debug(data);
                        SER109D.NUMERACION = data.NUMERACION[0];
                        _afectarnumeracion_SER109D();
                    })
                    .catch(error => {
                        console.log(error);
                        _evaluarnumeroprefijo_SER109D();
                    });
            }
        }, get_url('APP/SALUD/INV020GA.DLL'));
        // INV 020GA
    }
}

function _afectarnumeracion_SER109D() {
    $('#observacion_SER109D').val(SER109D.NUMERACION.OBSERV_NUM);
    $('#anexos_SER109D').val(SER109D.NUMERACION.ANEXOS_NUM);
    if (SER109D.NUMERACION.FECHAPRE_NUM.substring(4, 6) == '00') {
        if (parseInt(SER109D.NUMERACION.FECHAPRE_NUM) > 0) {
            SER109D.FECHAFACW = SER109D.NUMERACION.FECHARET_NUM.substring(2, 8);
        } else {
            SER109D.FECHAFACW = moment().format('YYMMDD');
        }
    } else {
        SER109D.FECHAFACW = SER109D.NUMERACION.FECHAPRE_NUM.substring(2, 8);
    }
    // $('#fechafactura_SER109D').val(SER109D.FECHAFACW);
    ffacturaMask_SER109D.typedValue = '20' + SER109D.FECHAFACW;
    _afectarnumeracion2_SER109D();
}

function _afectarnumeracion2_SER109D() {
    if ((SER109D.NUMERACION.ESTADO_NUM == '0') || (SER109D.NUMERACION.ESTADO_NUM == '3')) {
        _evaluarobservaciones_SER109D('1');
    } else {
        // $('#fechafactura_SER109D').val(SER109D.FECHAFACW);
        ffacturaMask_SER109D.typedValue = '20' + SER109D.FECHAFACW;
        _evaluarfechaimpresion_SER109D();
    }
}

function _evaluarobservaciones_SER109D(orden) {
    validarInputs({
        form: '#VALIDAR3_SER109D',
        orden: orden
    },
        () => { _evaluarnumeroprefijo_SER109D() },
        () => {
            SER109D.OBSERVW = $('#observacion_SER109D').val();
            SER109D.ANEXOSW = $('#anexos_SER109D').val();
            if (SER109D.NUMERACION.ESTADO_NUM == '3') {
                _grabarnumeracion_SER109D();
            } else {
                _evaluarbloquearfactura_SER109D();
            }
        }
    )
}

function _evaluarbloquearfactura_SER109D() {
    validarInputs({
        form: '#VALIDA4_SER109D',
        orden: '1'
    },
        () => { _evaluarobservaciones_SER109D('2') },
        () => {
            SER109D.SWBLOQ = bloquearfMask._value;
            if (SER109D.SWBLOQ == 'S') {
                SER109D.ESTADOW = '3';
                SER109D.OPERBLOQNUM = ADMINW;
            }
            _grabarnumeracion_SER109D();
        }
    )
}

function _grabarnumeracion_SER109D() {
    if ((SER109D.OBSERVW != SER109D.NUMERACION.OBSERV_NUM) || (SER109D.ANEXOSW != SER109D.NUMERACION.ANEXOS_NUM) || (SER109D.ESTADOW != SER109D.NUMERACION.ESTADO_NUM)) {
        console.debug('son diferentes', SER109D.OBSERVW, SER109D.ANEXOSW, SER109D.ESTADOW);
        let URL = get_url("APP/SALUD/SER109D.DLL");
        postData({
            datosh: datosEnvio() + '2|' + SER109D.LLAVEW + '|' + SER109D.OBSERVW + '|' + SER109D.ANEXOSW + '|' + SER109D.ESTADOW
        }, URL)
            .then((data) => {
                console.debug(data);
                _evaluarfechaimpresion_SER109D();
            })
            .catch((error) => {
                console.log(error);
            });
    } else {
        _evaluarfechaimpresion_SER109D();
    }
}

function _evaluarfechaimpresion_SER109D() {
    validarInputs({
        form: '#VALIDAR5_SER109D',
        orden: '1'
    },
        () => { _evaluarobservaciones_SER109D('2') },
        () => {
            ffacturaMask_SER109D.typedValue = '20' + SER109D.FECHAFACW;
            _evaluarbloqueardrogueria_SER109D();
        }
    )
}

function _evaluarbloqueardrogueria_SER109D() {
    validarInputs({
        form: '#VALIDAR6_SER109D',
        orden: '1'
    },
        () => { _evaluarfechaimpresion_SER109D() },
        () => {
            SER109D.SWDROG = $('#bloqueardrogueria_SER109D').val();
            _evaluarcompsucur_SER109D();
        }
    )
}

function _evaluarcompsucur_SER109D() {
    validarInputs({
        form: '#VALIDAR7_SER109D',
        orden: '1'
    },
        () => { _evaluarfechaimpresion_SER109D() },
        () => {
            SER109D.SUCURW = $('#compsucur_SER109D').val();
            switch (SER109D.SUCURW) {
                case '**':
                    $('#compsucurd_SER109D').val('Todas las sucursales')
                    break;
                case 'BC':
                    $('#compsucurd_SER109D').val('Bicentenario')
                    break;
                case 'CA':
                    $('#compsucurd_SER109D').val('Campiña')
                    break;
                case 'CS':
                    $('#compsucurd_SER109D').val('Creser Amor')
                    break;
                case 'CV':
                    $('#compsucurd_SER109D').val('Hsopital Materno')
                    break;
                case 'EM':
                    $('#compsucurd_SER109D').val('El Morro')
                    break;
                case 'JL':
                    $('#compsucurd_SER109D').val('Juan Luis Londoño')
                    break;
                case 'LC':
                    $('#compsucurd_SER109D').val('La chaparrera')
                    break;
                case 'PV':
                    $('#compsucurd_SER109D').val('Provivienda')
                    break;
                case 'UM':
                    $('#compsucurd_SER109D').val('Unidad Movil')
                    break;
                case 'HT':
                    $('#compsucurd_SER109D').val('Hipo terapia')
                    break;
                default:
                    $('#compsucurd_SER109D').val('Sucursal Desconocida')
                    break;
            }
            _evaluarcambfecha_SER109D();
        }
    )
}

function _evaluarcambfecha_SER109D() {
    validarInputs({
        form: '#VALIDAR8_SER109D',
        orden: '1'
    },
        () => { _evaluarfechaimpresion_SER109D() },
        () => {
            SER109D.SWFECHA = cambfechaMask._value;
            if (parseInt(SER109D.NUMERACION.NIT_TER) > 0) {
                // CON008
                let uno = parseInt(SER109D.NUMERACION.NIT_TER.substring(0, 1)) * 43;
                let dos = parseInt(SER109D.NUMERACION.NIT_TER.substring(1, 2)) * 41;
                let tres = parseInt(SER109D.NUMERACION.NIT_TER.substring(2, 3)) * 37;
                let cuatro = parseInt(SER109D.NUMERACION.NIT_TER.substring(3, 4)) * 29;
                let cinco = parseInt(SER109D.NUMERACION.NIT_TER.substring(4, 5)) * 23;
                let seis = parseInt(SER109D.NUMERACION.NIT_TER.substring(5, 6)) * 19;
                let siete = parseInt(SER109D.NUMERACION.NIT_TER.substring(6, 7)) * 17;
                let ocho = parseInt(SER109D.NUMERACION.NIT_TER.substring(7, 8)) * 13;
                let nueve = parseInt(SER109D.NUMERACION.NIT_TER.substring(8, 9)) * 7;
                let diez = parseInt(SER109D.NUMERACION.NIT_TER.substring(9, 10)) * 3;

                SER109D.DIVIW = (uno + dos + tres + cuatro + cinco + seis + siete + ocho + nueve + diez) / 11;
                SER109D.DIVIW = SER109D.DIVIW.toString();
                let decimales = SER109D.DIVIW.split('.');
                let dec2w = decimales[1].substring(1, 2);
                let dec1w = decimales[0].substring(0, 1);
                if (parseInt(dec2w) > 0) {
                    SER109D.FACTORW = parseInt(dec1w) + 1;
                } else {
                    SER109D.FACTORW = dec1w
                } if ((SER109D.FACTORW == 0) || (SER109D.FACTORW == 1)) {
                    SER109D.DV_TEM = SER109D.FACTORW;
                } else {
                    SER109D.DV_TEM = 11 - parseInt(SER109D.FACTORW);
                }
            } else {
                SER109D.NIT_TEM = SER109D.NUMERACION.NIT_NUM;
                SER109D.DV_TEM = SER109D.NUMERACION.DV_TER;
            }
            sumarabonos_SER109D();
        }
    )
}

function sumarabonos_SER109D() {
    for (var i in SER109D.NUMERACION.TABLARBOS_NUM) {
        if ((SER109D.NUMERACION.TABLARBOS_NUM[i].LOTEABON_NUM == '1R') || (SER109D.NUMERACION.TABLARBOS_NUM[i].LOTEABON_NUM == '2R') || (SER109D.NUMERACION.TABLARBOS_NUM[i].LOTEABON_NUM == '3R') || (SER109D.NUMERACION.TABLARBOS_NUM[i].LOTEABON_NUM == '4R') || (SER109D.NUMERACION.TABLARBOS_NUM[i].LOTEABON_NUM == '5R') || (SER109D.NUMERACION.TABLARBOS_NUM[i].LOTEABON_NUM == '6R')) {
            SER109D.ABONOSW = parseFloat(SER109D.NUMERACION.TABLARBOS_NUM[i].VLRABON_NUM) + SER109D.ABONOSW;
        } else {
            if ((SER109D.NUMERACION.TABLARBOS_NUM[i].LOTEABON_NUM == 'GT') || (SER109D.NUMERACION.TABLARBOS_NUM[i].LOTEABON_NUM == 'GP') || (SER109D.NUMERACION.TABLARBOS_NUM[i].LOTEABON_NUM == 'GA')) {
                SER109D.GLOSASW = parseFloat(SER109D.NUMERACION.TABLARBOS_NUM[i].VLRABON_NUM) + SER109D.GLOSASW;
            } else {
                SER109D.NOTASW = parseFloat(SER109D.NUMERACION.TABLARBOS_NUM[i].VLRABON_NUM) + SER109D.NOTASW;
            }
        }
    }
    _consultarfactura_SER109D();
}

function _consultarfactura_SER109D(){
    console.debug(SER109D.LLAVEW);
    let URL = get_url("APP/SALUD/SER109D.DLL");
    postData({
        datosh: datosEnvio() + '3|' + SER109D.LLAVEW + '|' + SER109D.OBSERVW + '|' + SER109D.ANEXOSW + '|' + SER109D.ESTADOW + '|' + SER109D.SWFECHA + '|' + SER109D.SUCURW + '|' + parseInt(SER109D.NITUSU) + '|' + SER109D.PUCUSU + '|' + SER109D.SWDROG
    }, URL)
        .then(data => {
            console.debug(data);
            SER109D.SER109E = data.FACTURA;
            _evaluarsubtotalcomp_SER109D();
        })
        .catch(error => {
            console.log(error);
            _evaluarnumeroprefijo_SER109D();
        });
}


function _evaluarsubtotalcomp_SER109D(){
    validarInputs({
        form: '#VALIDAR9_SER109D',
        orden: '1'
    },
        () => {  },
        () => {
            SER109D.SWTOT = subtotalcompMask._value;
            SER109D.SWVALIDA = nommedicoMask._value;
            SER109D.SWABONOS = abonosMask._value;
            SER109D.SWORIGINAL = originalMask._value;
            SER109D.IMPRESION = new Object;
            if (SER109D.SWVALIDA == 'S'){
                console.debug('impresionar faltantes')
            } else {
                if ((SER109D.PREFIJOW != 'C') && (SER109D.PREFIJOW != 'E') && (SER109D.PREFIJOW != 'Ñ') && (SER109D.PREFIJOW != 'U')){ 
                    console.debug('SER109E.SC4');
                    moment.updateLocale('es',{
                        months : [
                                "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio",
                                "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
                            ]
                        }
                    );
                    SER109D.IMPRESION['NOMBREUSU'] = $_USUA_GLOBAL[0].NOMBRE;
                    SER109D.IMPRESION['NITUSU'] = SER109D.NITUSU;
                    SER109D.IMPRESION.NIT = SER109D.SER109E[0].NIT_TEM;
                    SER109D.IMPRESION['DVUSU'] = $_USUA_GLOBAL[0].DV;
                    SER109D.IMPRESION['DIRECUSU'] = $_USUA_GLOBAL[0].DIRECC;
                    SER109D.IMPRESION['FECHAIMP'] = moment().format('LL');
                    SER109D.IMPRESION['ADMINW'] = SER109D.ADMINW;
                    SER109D.IMPRESION['OPERBLOQNUM'] = SER109D.SER109E[0].OPER_NUM;
                    SER109D.IMPRESION['TELUSU'] = $_USUA_GLOBAL[0].TEL;
                    let sumarunmes = moment(SER109D.IMPRESION.FECHAIMP).add(1,'month');
                    sumarunmes = sumarunmes._d.toLocaleDateString();
                    let dia = sumarunmes.substring(0,2); let mes = sumarunmes.substring(3,5); let ano = sumarunmes.substring(6,10);
                    SER109D.IMPRESION['FECHAVENCE'] = moment(ano+mes+dia).format('LL');
                    SER109D.IMPRESION['DESCRIPNUM'] = SER109D.NUMERACION.DESCRIP_TER;
                    SER109D.IMPRESION['DIRECCTER'] = SER109D.NUMERACION.DIRECC_TER;
                    SER109D.IMPRESION['TELTER'] = SER109D.NUMERACION.TEL_TER;
                    SER109D.IMPRESION['EDADTEM'] = SER109D.SER109E[0].EDAD_TEM;
                    SER109D.IMPRESION['SEXOTEM'] = SER109D.SER109E[0].SEXO_TEM;
                    SER109D.IMPRESION['IDPACTEM'] = SER109D.SER109E[0].PACIENTE_TEM;
                    SER109D.IMPRESION['DVTER'] = SER109D.NUMERACION.DV_TER;
                    SER109D.IMPRESION['DESCRIPTAR'] = SER109D.NUMERACION.CONVENIO_NUM;
                    SER109D.IMPRESION['OBSERV'] = SER109D.OBSERVW;
                    SER109D.IMPRESION['ANEXOS'] = SER109D.ANEXOS;
                    SER109D.IMPRESION.SWORIGINAL =  SER109D.SWORIGINAL;
                    SER109D.IMPRESION.PREFIJOFACT = SER109D.PREFIJOW;
                    SER109D.IMPRESION.NUMEROFACT = SER109D.NUMEROW;
                    SER109D.FACTURASIMPRIMIR = [];
                    SER109D.SER109E.forEach(element => {
                        element.TABLA.forEach( element2 => {
                            let FACTURA = element2.CONCEPTO_TEM.trim();
                            if(FACTURA.length > 0){
                                console.debug(FACTURA)
                                SER109D.FACTURASIMPRIMIR.push(element);
                            }
                        })
                    });
                    SER109D.IMPRESION['FACTURASIMPRIMIR'] = SER109D.FACTURASIMPRIMIR;
                    opcionesImpresion_SER109D = {
                        datos: SER109D.IMPRESION,
                        tipo: 'pdf',
                        formato: 'salud/SER109E.html',
                        nombre: 'IMPRESION PRUEBA SER109D'
                    }
                    _cargandoimpresion('on');
                    imprimir(opcionesImpresion_SER109D, finImpresion_SER109D)
                } else {
                    if ((SER109D.NIT == '0830092718') || (SER109D.NIT == '0830092719') || (SER109D.NIT == '0900193162')){
                        console.debug('SER109E.SC4');
                    } else{
                        console.debug('SER109P.SC4')
                    }
                }
            }
        }
    )
}

function finImpresion_SER109D(){
    _cargandoimpresion('off');
}

function _cargandoimpresion(estado) {
    switch (estado) {
        case 'on':
            var ventanaimpresion = bootbox.dialog({
                message: '<div class="text-center"><i class="fa fa-spin fa-spinner"></i> Imprimiendo...</div>',
                closeButton: false,
                buttons: {
                    confirm: {
                        label: 'Aceptar',
                        className: 'btn-primary',
                        callback: function () {
                            _toggleNav();
                        }
                    }
                }
            })
            ventanaimpresion.init($('.modal-footer').hide());
            break;
        case 'off':
            $('.btn-primary').click();
            break;
    }
}

////////////////////////////// fin //////////////////////////////////////////////
/////////////////////////// MASCARAS////////////////////////////////////////////
var prefijoMask_SER109D = IMask($('#prefijo_SER109D')[0], {
    mask: 'a',
    prepare: str => {
        console.debug(str);
        if ((str.toUpperCase() == 'U') || (str.toUpperCase() == 'C') || (str.toUpperCase() == 'E') || (str.toUpperCase() == 'Ñ')) {
            CON851('01', '01', null, 'error', 'error');
        }
        else {
            return str.toUpperCase();
        }
    },
    commit: (value, masked) => {
        masked._value = value.toLowerCase()
    }
});
var numeroprefijoMask_SER109D = IMask($('#numeroprefijo_SER109D')[0], { mask: Number, padFractionalZeros: false, normalizeZeros: true, });
var ffacturaMask_SER109D = IMask($("#fechafactura_SER109D")[0], {
    mask: Date,
    pattern: 'Y-M-d',
    lazy: true,
    overwrite: true,
    autofix: true,
    blocks: {
        Y: { mask: IMask.MaskedRange, placeholderChar: 'y', from: 2000, to: 2030, maxLength: 4 },
        M: { mask: IMask.MaskedRange, placeholderChar: 'M', from: 01, to: 12, maxLength: 2 },
        d: { mask: IMask.MaskedRange, placeholderChar: 'd', from: 1, to: 31, maxLength: 2 },
    },
    format: function (date) {
        return moment(date).format("YYYY-MM-DD");
    },
    parse: function (str) {
        var fecha = moment(str).format('YYYY-MM-DD');
        if (fecha == "Invalid date") {
            CON851('01', '01', null, 'error', 'error');
        }
        else {
            return str;
        }
    }
});

var bloquearfMask = IMask($("#bloquearfactura_SER109D")[0], {
    mask: 'a',
    definitions: {
        'a': /[N-S]/
    },
    prepare: function (str) {
        console.debug(str);
        return str.toUpperCase();
    },
    commit: function (value, masked) {
        masked._value = value.toLowerCase()
    }
});
var bloquearfMask = IMask($("#bloqueardrogueria_SER109D")[0], {
    mask: 'a',
    definitions: {
        'a': /[N-S]/
    },
    prepare: function (str) {
        console.debug(str);
        return str.toUpperCase();
    },
    commit: function (value, masked) {
        masked._value = value.toLowerCase()
    }
});
var cambfechaMask = IMask($("#cambfecha_SER109D")[0], {
    mask: 'a',
    definitions: {
        'a': /[N-S]/
    },
    prepare: function (str) {
        console.debug(str);
        return str.toUpperCase();
    },
    commit: function (value, masked) {
        masked._value = value.toLowerCase()
    }
});
var subtotalcompMask = IMask($("#subtotal_SER109D")[0], {
    mask: 'a',
    definitions: {
        'a': /[N-S]/
    },
    prepare: function (str) {
        console.debug(str);
        return str.toUpperCase();
    },
    commit: function (value, masked) {
        masked._value = value.toLowerCase()
    }
});
var nommedicoMask = IMask($("#nommedico_SER109D")[0], {
    mask: 'a',
    definitions: {
        'a': /[N-S]/
    },
    prepare: function (str) {
        console.debug(str);
        return str.toUpperCase();
    },
    commit: function (value, masked) {
        masked._value = value.toLowerCase()
    }
});
var abonosMask = IMask($("#abonos_SER109D")[0], {
    mask: 'a',
    definitions: {
        'a': /[N-S]/
    },
    prepare: function (str) {
        console.debug(str);
        return str.toUpperCase();
    },
    commit: function (value, masked) {
        masked._value = value.toLowerCase()
    }
});
var originalMask = IMask($("#original_SER109D")[0], {
    mask: 'a',
    definitions: {
        'a': /[N-S]/
    },
    prepare: function (str) {
        console.debug(str);
        return str.toUpperCase();
    },
    commit: function (value, masked) {
        masked._value = value.toLowerCase()
    }
});