 //3134146
 var $id_paciente, $_USUAR, $_SER810, $DATOS_PACIE, $DATOS_HC = new Array(),
     $DATOS_DETHC, $LLAVE_HC, $_ENFERMEDADES,$_EDAD,$_NITUSU, $ESP_PROF1,$ESP_PROF2;
 $(document).ready(function () {
     loader('show');
     _iniciar_menu_his();
     _toggleF8([{
         input: 'busqpaci',
         app: '001',
         funct: _ventanaPacientes
     }]);

     $('#busqpaci_001').val('94475639').focus();
 });

 function _ventanaPacientes(e) {
     if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
         _ventanaDatos_lite({
             titulo: 'VENTANA DE PACIENTES',
             tablaSql: 'sc_pacie',
             indice: ['cedula', 'nombre'],
             mascara: [],
             minLength: 3,
             callback_esc: function () {
                 $('#busqpaci_001').focus();
             },
             callback: function (data) {
                 $('#busqpaci_001').val(data.cedula).focus();
             }
         });
     }
 }

 $(document).on('keydown', '#busqpaci_001', function (e) {
     if (e.which == '13') {
         buscarPaciente($(this).val());
     }
 });

 function _iniciar_menu_his() {
     var data = dataSession();
     var datos_envio = datosEnvio();
     datos_envio += data.split('|')[1];
     datos_envio += "|";
     SolicitarDll2({
         datosh: datos_envio
     }, _on_iniciar_menu_his, {
         url: "app/HC000.DLL",
         modulo: "HICLIN"
     });
 }

 function _on_iniciar_menu_his(data) {
     var res = data.split('|');
     if (res[0].trim() == '00') {
         sessionStorage.setItem('Usuar', res[1] + "-" + res[2] + "-" + res[3]);
         SolicitarDatos2({},
             function (usuar) {
                 $_USUAR = usuar.USUAR;
                 $_NITUSU = $_USUAR[0].NIT;
                 $ESP_PROF1=res[4].toString();
                 $ESP_PROF2=res[5].toString();
                 loader('hide');
             }, {
                 url: "SC-DAT-USU"
             });
     } else {
         plantillaError(res[0], res[1], res[2]);
     }
 }

 function _dllSer810() {
     
     SolicitarDll2({
         datosh: datosEnvio()
     }, _respDllSer810, {
         url: "app/SER810.Dll",
         modulo: "HICLIN"
     });
 }

 function _respDllSer810(data) {
     var res = data.split('|');
     if (res[0].trim() == '00') {
         SolicitarDatos2({},
             function (pacientes) {
                 $_SER810 = pacientes['Pacientes'];
                 $_SER810.pop();
                 var arrayEliminar = [];
                 arrayEliminar.push(nombrarJson('SC-DAT-USU'));
                 arrayEliminar.push(nombrarJson('SC-ARCHPAC'));
                 _eliminarJson(arrayEliminar, on_eliminarJson);
             }, {
                 url: "SC-ARCHPAC"
             });

     } else {
         plantillaError(res[0], res[1], res[2]);
     }
 }

 function on_eliminarJson(data) {
     loader('hide');
     var res = data.split('|');
     if (res[0].trim() == '00') {
         plantillaToast('', '39', '', 'success', 'Exitoso!');
     } else {
         plantillaError(res[0], 'Ha ocurrido un error eliminando archivos <b>.JSON</b>', '_eliminarJson');
     }
 }

 function buscarPaciente(pacie) {
     $id_paciente = pacie;
     var data = dataSession();
     if (pacie) {
         datos_envio = datosEnvio();
         datos_envio += cerosIzq(pacie, 15);
         datos_envio += "|";
         datos_envio += data.split('|')[1];
         SolicitarDll2({
             datosh: datos_envio
         }, respBusqPacie, {
             url: "app/HC000-1.Dll",
             modulo: "HICLIN"
         });
     } else {
         console.debug('Ingrese codigo paciente');
     }
 }

 function respBusqPacie(data) {
     var res = data.split('|');
     if (res[0].trim() == '00' || res[0] == '01') {
         _cargarDatosPaci(res[1].trim(), res[2].trim());
     } else {
         plantillaError(res[0], res[1], res[2]);
     }
 }

 function _cargarDatosPaci(llave, sw_open) {
     SolicitarDatos2({},
         function (paci) {
             $DATOS_PACIE = paci['PACIENTE'];
             if (sw_open == '0') {
                 // no existe hc
                 _consultHc(llave);
             } else {
                 // existe hc, debe de llamar el hc811 el traer las hc existentes y mostrarlas luego
                 datos_envio += datosEnvio();
                 datos_envio += cerosIzq(llave.trim(), 15);
                 datos_envio += "|";
                 SolicitarDll2({
                         datosh: datos_envio
                     },
                     function (data) {
                         var res = data.split('|');
                         if (res[0].trim() == '00') {
                             _cargarDatosHc();
                         } else {
                             plantillaError(res[0], res[1], res[2]);
                         }
                     }, {
                         url: "app/HC811.Dll",
                         modulo: "HICLIN"
                     });
             }
         }, {
             url: "SC-ARCHPA"
         });
 }

 function _cargarDatosHc() {
     var data=dataSession();
     SolicitarDatos2({},
         function (historia) {
             var hc = historia.HC;
             hc.pop();
             var f = new Date();
             var folio = parseInt(hc[hc.length - 1]['FOLIO-HC'].split('-')[1]);
             var folio = cerosIzq(folio + 1, 6)
             hc.push({
                 'DETALLE': "1                   ",
                 'DIAG-MUER-HC': "    ",
                 'EGRESO-HC': "",
                 'ESPECIALIDAD': "                                                                      ",
                 'ESTADO': "01",
                 'FACT-HC': " ",
                 'FECHA-HC': f.getDate() + "/" + (f.getMonth() + 1) + "/" + f.getFullYear(),
                 'FECHA-ORD-SALIDA-HC': "00/00/0000",
                 'FOLIO-HC': hc[hc.length - 1]['FOLIO-HC'].split('-')[0] + '-' + folio,
                 'HAB-HC': "    ",
                 'HORA-HC': f.getHours() + ":" + f.getMinutes(),
                 'HORA-ORD-SALIDA-HC': "00:00",
                 'ID-HC': $DATOS_PACIE[0]['COD'],
                 'MED-HC': data.split('|')[2],
                 'MOTIV-HC': "**ABRIR NUEVA HISTORIA**                            ",
                 'NIT-FACT-HC': "0000000000",
                 'NOM-SERV': "**NUEVA**",
                 'OPER-CIE-HC': "",
                 'OPER-ORD-SALIDA-HC': "    ",
                 'SERV-HC': "",
                 'UNSERV-HC': ""
             })
             hc = hc.reverse();
             $_EDAD=calcular_edad($DATOS_PACIE[0].NACI);
            //  ///------PRUEBAS----------///
            //  $_EDAD.vlr_edad='040';
            //  ///----------------------///

             _ventanaDatos({
                 titulo: $DATOS_PACIE[0].DESCRIP,
                 columnas: ["FOLIO-HC", "NOM-SERV", "FECHA-HC", "HORA-HC", "MOTIV-HC", "MED-HC", "ESTADO"],
                 data: hc,
                 orden: false,
                 callback_esc: function () {
                     $('#busqpaci_001').focus();
                 },
                 callback: function (data) {
                     var llave = cerosIzq($id_paciente, 15) + data['FOLIO-HC'].split('-')[0] + data['FOLIO-HC'].split('-')[1];
                     _consultHc(llave);
                 }
             });
         }, {
             url: "SC-HC811"
         });
 }

 function _consultHc(llave) {
     $LLAVE_HC = llave;
     datos_envio = datosEnvio();
     datos_envio += llave;
     datos_envio += "|";
     SolicitarDll2({
             datosh: datos_envio
         },
         function (data) {
             var res = data.split('|');
             if (res[0].trim() == '00') {
                 _mostrarDatosPaci(res);
             } else {
                 plantillaError(res[0], res[1], res[2]);
             }
         }, {
             url: "app/HC000-2.Dll",
             modulo: "HICLIN"
         });
 }

 function _mostrarDatosPaci(resp) {

     $('#doc_paci_hc101').val($id_paciente);
     $('#cod_ent_hc_101').val(resp[1]);
     $('#descrip_ent_hc101').val(resp[2]);
     $('#cod_ent_hc_101').val(resp[3]);
     $('#descrip_ent_hc101').val(resp[4]);
     $('#suc_paci_hc101').val(resp[5]);
     $('#fol_paci_hc101').val(resp[6]);
     $('#nom_paci_hc101').val(resp[7]);
     $('#sex_paci_hc101').val(resp[8]);
     $('#cod_ocu_hc101').val(resp[9]);
     $('#descrip_ocu_hc101').val(resp[10]);
     $('#edad_paci_hc101').val(resp[13]);

     var descrip_hc;

     if (resp[11] == '1') {
         descrip_hc = "TEMPORAL";
     } else {

         switch (resp[12]) {
             case '0':
                 descrip_hc = "NO HAY H.C. ";
                 break;
             case '1':
                 descrip_hc = "H.C. ABIERTA";
                 break;
             case '2':
                 descrip_hc = "H.C. CERRADA";
                 break;
         }
     }


     _cargarEventos('on');
     $('#descrip_hc_hc101').val(descrip_hc);
     $('.container-fluid .page-sidebar').removeAttr('style');
     $('.container-fluid .page-fixed-main-content').removeAttr('style');
     $('.container-fluid .page-content-fixed-header Button').removeAttr('style');
     $('#formConsult_hc001').attr('hidden', true);
     $('.footer').attr('hidden', true);
 }