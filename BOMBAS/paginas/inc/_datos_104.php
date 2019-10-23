<?php
$_SESION = $_POST['sesion'];

$_NOMBRE_ARCHIVO_SURTIDORES = 'C:\\PROSOFT\\TEMP\\COMP-TBL1-' . $_SESION . '.txt';
$_NOMBRE_ARCHIVO_VALES = 'C:\\PROSOFT\\TEMP\\COMP-TBL2-' . $_SESION . '.txt';

$_DATOS_SURTIDORES = $_POST['datos_surtidores'];
$_DATOS_VALES = $_POST['datos_vales'];

$_RETORNAR = true;
$_RETORNAR_MSJ = '';

if (file_exists($_NOMBRE_ARCHIVO_SURTIDORES)) {
    if (!unlink($_NOMBRE_ARCHIVO_SURTIDORES)) {
        $_RETORNAR = false;
        $_RETORNAR_MSJ = 'Ha ocurrido un error eliminando el archivo: '. $_NOMBRE_ARCHIVO_SURTIDORES;
    }
}

if ($_DATOS_SURTIDORES != 'false') {
    foreach ($_DATOS_SURTIDORES as $index => $valor) {
        $fuente = $valor["itemSurtidor"]
            . '|' . $valor["codProducto"]
            . '|' . $valor["galonaje"]
            . '|' . $valor["valor"]
            . '|' . $valor["valorSobretasa"]
            . '|' . $valor["valorGlobal"]
            . '|' . $valor["valorAnterior"]
            . '|' . $valor["numeroActual"]
            . '|' . $valor["valorActual"]
            . '|';

        if ($archivo = fopen($_NOMBRE_ARCHIVO_SURTIDORES, "a")) {
            if (!fwrite($archivo, $fuente . "\r\n")) {
                $_RETORNAR = false;
                $_RETORNAR_MSJ = 'Ha ocurrido un error al crear el archivo: ' . $_NOMBRE_ARCHIVO_SURTIDORES;
            }
        }
    }
}

    if (file_exists($_NOMBRE_ARCHIVO_VALES)) {
        if (!unlink($_NOMBRE_ARCHIVO_VALES)) {
            $_RETORNAR = false;
            $_RETORNAR_MSJ = 'Ha ocurrido un error eliminando el archivo: ' . $_NOMBRE_ARCHIVO_VALES;
        }
    }

if ($_DATOS_VALES != 'false') {
    foreach ($_DATOS_VALES as $index => $valor) {
        $fuente = $valor["codCuenta"]
            . '|' . $valor["nitTercero"]
            . '|' . $valor["documento"]
            . '|' . $valor["valorVale"]
            . '|' . $valor["codProducto"]
            . '|' . $valor["cantidad"]
            . '|' . $valor["placa"]
            . '|';

        if ($archivo = fopen($_NOMBRE_ARCHIVO_VALES, "a")) {
            if (!fwrite($archivo, $fuente . "\r\n")) {
                $_RETORNAR = false;
                $_RETORNAR_MSJ = 'Ha ocurrido un error al crear el archivo: ' . $_NOMBRE_ARCHIVO_VALES;
            }
        }
    }
}

if ($_RETORNAR) {
    echo '00';
} else {
    echo '99|' . $_RETORNAR_MSJ;
}

