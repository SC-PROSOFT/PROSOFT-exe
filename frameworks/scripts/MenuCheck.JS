var $_LOTE_MENUCHECK = [];

_validarOpcion_0A = function () {
    var SUCU = $_USUA_GLOBAL[0]['MENU_SUC'] || '2';

    if (SUCU == '2') {
        var tmp = buscar_opcion("0A");
        mostrar_menu(tmp);
        set_titulo("0A");
    } else if (SUCU == '1') {
        obtenerDatosCompletos({ nombreFd: 'PREFIJOS' }, (data) => {
            var prefijosFiltrados = []
            var prefijosLlegada = data.PREFIJOS[0].TABLA
            prefijosLlegada.pop()

            for (var i in prefijosLlegada) {
                var nro = prefijosLlegada[i].NRO.slice(-2)
                if (nro < '09' || nro == '09') {
                    prefijosFiltrados.push({
                        "COD": nro.slice(-1), "PREFIJO": prefijosLlegada[i].DESC_PREF
                    })
                }
            }
            _toggleNav()
            POPUP({
                array: prefijosFiltrados,
                titulo: 'Menu por prefijos',
                indices: [
                    { id: 'COD', label: 'PREFIJO' }
                ],
                callback_f: _toggleNav
            }, function (data) {
                console.debug(data);
                setTimeout(function () {
                    _CON855A(data.COD, '1')
                }, 300)
            })
        })
        // _consultaSql({
        //     sql: 'SELECT * FROM sc_archpref',
        //     db: $CONTROL,
        //     callback: function (error, results, fields) {
        //         if (error) throw error;
        //         else {
        //             _toggleNav();
        //             POPUP({
        //                 array: results,
        //                 titulo: 'Menu por prefijos',
        //                 indices: [
        //                     // { id: 'id', label: 'descripcion' }
        //                     { label: 'descripcion' }
        //                 ],
        //                 callback_f: _toggleNav
        //             }, function (data) {
        //                 setTimeout(function () {
        //                     _CON855A(data.id, '1')
        //                 }, 300)
        //             })
        //         }
        //     }
        // })
    } else if (SUCU == '3') {
        _consultaSql({
            sql: 'SELECT * FROM sc_sucur',
            db: 'datos_pros',
            callback: function (error, results, fields) {
                if (error) throw error;
                else {

                    results.forEach(el => {
                        let sucu = el.cod_sucur;
                        if (sucu == '01') el.cod_sucur = '1'
                        else if (sucu == '02') el.cod_sucur = '2'
                        else if (sucu == '03') el.cod_sucur = '3'
                        else if (sucu == '04') el.cod_sucur = '4'
                        else if (sucu == '05') el.cod_sucur = '5'
                        else if (sucu == '06') el.cod_sucur = '6'
                        else if (sucu == '07') el.cod_sucur = '7'
                        else if (sucu == '08') el.cod_sucur = '8'
                        else if (sucu == '09') el.cod_sucur = '9'
                    })

                    _toggleNav();
                    POPUP({
                        array: results,
                        titulo: 'Menu por sucursales',
                        indices: [
                            { id: 'cod_sucur', label: 'descrip_sucur' }
                        ],
                        callback_f: _toggleNav
                    }, function (data) {
                        if (data.cod_sucur == '1') {
                            var tmp = buscar_opcion("0A");
                            mostrar_menu(tmp);
                            set_titulo("0A");
                        } else {
                            var tmp = buscar_opcion("0B");
                            mostrar_menu(tmp);
                            set_titulo("0B");
                        }
                        _toggleNav();
                    })
                }
            }
        })
    } else {
        CON851('','No tiene sucursales',null,'error','Error');
    }
}

_CON855A = function (prefijo, acceso) {
    obtenerDatosCompletos({ nombreFd: 'LOTES' }, (data) => {
        console.debug(data);
        var lotesFiltrados = []
        var lotesLlegada = data.LOTES
        lotesLlegada.pop()

        for (var i in lotesLlegada) {
            var lote = lotesLlegada[i].LOTE
            var nombreLote = lotesLlegada[i].NOMBRE.substring(0, 6)
            var y

            if (y > 19) {
                break;
            }

            if (nombreLote != 'COMPRA' && (lote != "6C" || lote != "60" || lote != "6A")) {
                if (lote[0] == "0" || lote[0] == "1" || lote[0] == "I" || lote[0] == "E" || lote[0] == "C") {

                } else {
                    switch (acceso) {
                        case '1':
                            if (lote[0] == prefijo) {
                                y = parseInt(y + 1)
                                lotesFiltrados.push({ "LOTE": lote, "NOMBRE": lotesLlegada[i].NOMBRE })
                            }
                            break;
                        case '2':
                            if (lote[1] == prefijo) {
                                y = parseInt(y + 1)
                                lotesFiltrados.push({ "LOTES": lote })
                            }
                            break;
                    }
                }
            }
        }
        POPUP({
            array: lotesFiltrados,
            titulo: 'Lotes por documento',
            indices: [
                { id: 'LOTE', label: 'NOMBRE' }
            ],
            callback_f: _toggleNav
        }, function (data) {
            _toggleNav();

            var codigo = data.LOTE.trim(),
                lote1 = codigo.substring(0, 1),
                lote2 = codigo.substring(codigo.length - 1, codigo.length);

            if (lote2 == 'B') {
                var nuevaLista = buscar_opcion('0941B');
                mostrar_menu(nuevaLista);
                set_titulo('0941B');
            } else {
                var nuevaLista = buscar_opcion('0A1');
                mostrar_menu(nuevaLista);
                set_titulo('0A1');
                $_LOTE_MENUCHECK = { lote1: lote1, lote2: lote2 };
            }
        })
    })
}


//     var sql_temp = '';

//     if (acceso == '1') sql_temp = `SELECT * FROM sc_archlote WHERE codigo LIKE '${prefijo}%'`
//     else if (acceso == '2') sql_temp = `SELECT * FROM sc_archlote WHERE codigo LIKE '%${prefijo}'`
//     _consultaSql({
//         sql: sql_temp,
//         db: 'datos_pros',
//         callback: function (error, results, fields) {
//             var temp = [];
//             console.log(results)
//             if (results.length > 0) {
//                 results.forEach(function (el, idx) {
//                     let codigo = el.codigo,
//                         cod1 = codigo[0],
//                         descripcion = el.nombre.substring(0, 6);
//                     if (descripcion != 'COMPRA' && (codigo != "6C" || codigo != "60" || codigo != "6A")) {
//                         if (cod1 == "0" || cod1 == "1" || cod1 == "I" || cod1 == "E" || cod1 == "C") {

//                         } else {
//                             temp.push(el)
//                         }
//                     }
//                 });
//                 POPUP({
//                     array: temp,
//                     titulo: 'Lotes por documento',
//                     indices: [
//                         { id: 'codigo', label: 'nombre' }
//                     ],
//                     callback_f: _toggleNav
//                 }, function (data) {
//                     _toggleNav();

//                     var codigo = data.codigo.trim(),
//                         lote1 = codigo.substring(0, 1),
//                         lote2 = codigo.substring(codigo.length - 1, codigo.length);

//                     if (lote2 == 'B') {
//                         var nuevaLista = buscar_opcion('0941B');
//                         mostrar_menu(nuevaLista);
//                         set_titulo('0941B');
//                     } else {
//                         var nuevaLista = buscar_opcion('0A1');
//                         mostrar_menu(nuevaLista);
//                         set_titulo('0A1');
//                         $_LOTE_MENUCHECK = { lote1: lote1, lote2: lote2 };
//                     }
//                 })
//             }
//         }
//     })
// }
