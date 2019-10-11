var array_rx421W = [];

$(document).ready(function () {
    _inputControl('reset');
    _inputControl('disabled');
    popUp_idHistoria_rx421w()
});


function popUp_idHistoria_rx421w() {
    var fuente = $('#popUp_paciente_rx421w').html();
    var dialogo = bootbox.dialog({
        title: "Consulta estudio facturados:",
        message: fuente,
        closeButton: false,
        buttons: {
            main: {
                label: "Aceptar",
                className: "blue hidden",
                callback: function () {

                }
            }
        },
    });
    dialogo.on('shown.bs.modal', function (e) {
        console.log('entro a token')
        $('.modal-content').css({ 'width': '1000px', 'position': 'fixed', 'top': '50%', 'left': '50%', 'transform': 'translate(-50%, -50%)' })
        validar_idHistoria_rx421w()
    });
}

function validar_idHistoria_rx421w() {
    validarInputs(
        {
            form: "#validar_idhistoria_rx421w",
            orden: '1'
        },
        function () {
            $('[data-bb-handler="main"]').click();
            var historia = $('.id_historia_rx421w')
            $(historia[1]).val('')
            $("#tablaHistorias_rx421w tbody").empty();
            _toggleNav()
        },
        function () {
            var id = $('.id_historia_rx421w')
            idHistoria = cerosIzq($(id[1]).val(), 15)
            console.log(idHistoria)
            consultaDatos_rx421w(idHistoria)
        }
    )
}

function consultaDatos_rx421w(idHistoria) {
    _consultaSql({
        sql: `SELECT * FROM sc_resrx WHERE id_historia_fact_rx LIKE '${idHistoria}'`,
        db: 'datos_pros',
        callback: function (error, results, fields) {
            if (error) throw error;
            else {
                if (results.length > 0) {
                    for (var i in results) {
                        array_rx421W.push({
                            fecha_fact: moment(results[i].fecha_fact_rx).format("YYYY/MM/D"),
                            suc_fact: results[i].suc_fact_rx,
                            cl_fact: results[i].cl_fact_rx,
                            nro_fact: results[i].nro_fact_rx,
                            grupo_fact: results[i].grupo_fact_rx,
                            cod_art_fact: results[i].cod_art_fact_rx,
                            clase_art_fact: results[i].clase_art_fact_rx,
                            item_fact: results[i].item_fact_rx,
                            descrip_cup: results[i].descrip_cup_rx,
                            nit_usu: results[i].nit_usu_rx
                        })
                    }
                    console.log(array_rx421W)
                    mostrarTabla_rx421()
                } else {
                    CON851('01', '01', null, 'error', 'error');
                    validar_idHistoria_rx421w()
                }
            }
        }
    })
}

function mostrarTabla_rx421() {
    for (var i in array_rx421W) {
        $('#tablaHistorias_rx421w tbody').append(''
            + '<tr>'
            + '   <td>' + array_rx421W[i].fecha_fact + '</td>'
            + '   <td>' + array_rx421W[i].suc_fact + ''+ array_rx421W[i].cl_fact + + ''+ array_rx421W[i].nro_fact + '</td>'
            + '   <td>' + array_rx421W[i].item_fact + '</td>'
            + '   <td>' + array_rx421W[i].grupo_fact + ''+ array_rx421W[i].cod_art_fact + + ''+ array_rx421W[i].clase_art_fact + '</td>'
            + '   <td>' + array_rx421W[i].descrip_cup + '</td>'
            + '   <td>' + array_rx421W[i].nit_usu + '</td>'
            + '</tr>'
        )

    }
}
