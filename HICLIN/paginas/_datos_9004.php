<?php
$_sesion = $_POST['datosphp']['llave'];
$_detalles_hc = $_POST['datosphp']['detalles_envio'];

$nombre_archivo = 'C:\\PROSOFT\\TEMP\\DETALLES_HC-' . $_sesion.'.txt';

$_retornar = true;
$_retornar_msj = true;

$datos_hc = [];

$indices = [
    'ENFERMEDAD-ACT-HC ',
    'EXAGENERAL-HC     ',
    'ANT-FAMILIARES-HC ',
    'ANT-MEDICOS-HC    ',
    'ANT-HEMOR-HC      ',
    'ANT-QUIRURGICOS-HC',
    'ANT-TRAUMATICOS-HC',
    'ANT-TOXICOS-HC    ',
    'ANT-GINEC-HC      ',
    'ANALISIS-HC       ',
    'OBSERVACIONES-HC  '];

//Valida si existe el archivo
if (file_exists($nombre_archivo)) {
    if (!unlink($nombre_archivo)) {
        $_retornar = false;
        $_retornar_msj = 'Ha ocurrido un error eliminando el archivo: ' . $nombre_archivo;
    }
}

//Valida que el array de datos no este vacio
if ($_detalles_hc != 'false') {
//Pasa array asociativo a array unidmensional
    foreach ($_detalles_hc as $indice => $valor) {
        array_push($datos_hc, $valor);
    }
//Verifica si se puede abrir el archivo
    if (!$fp = fopen($nombre_archivo, 'a')) {
        $_retornar = false;
        $_retornar_msj = 'Ha ocurrido un error abriendo el archivo ' . $nombre_archivo;
    } else {

        for ($i = 0; $i < count($datos_hc); $i++) {
            $arr = $datos_hc[$i];
            $arr = mb_ereg_replace("[\n|\r|\n\r|\t|\0|\x0B]", "",$arr);
            fwrite($fp, $indices[$i].$arr.PHP_EOL);
        }

        if (!$_retornar) {
            $_retornar_msj = 'Ha ocurrido un error al crear el archivo: ' . $nombre_archivo;
        }
    }
}
if ($_retornar) {
    echo $_detalles_hc;
} else {
    echo '99|' . $_retornar_msj;
}
