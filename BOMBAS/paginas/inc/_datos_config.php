<?php
$_SESION = $_POST['sesion'];
$_DATOS_CONTAB = $_POST['contabilidad'];

$_NOMBRE_ARCHIVO_ITEM = "C:\\PROSOFT\\TEMP\\CONTAB-$_SESION.txt";

$_RETORNAR = true;
$_RETORNAR_MSJ = '';

if (file_exists($_NOMBRE_ARCHIVO_ITEM)) {
    if (!unlink($_NOMBRE_ARCHIVO_ITEM)) {
        $_RETORNAR = false;
        $_RETORNAR_MSJ = 'Ha ocurrido un error eliminando el archivo: ' . $_NOMBRE_ARCHIVO_ITEM;
    }
}

if ($_DATOS_CONTAB != 'false') {
    foreach ($_DATOS_CONTAB as $index => $valor) {
        $fuente = $valor["contab"];

        if ($archivo = fopen($_NOMBRE_ARCHIVO_ITEM, "a")) {
            if (!fwrite($archivo, $fuente . "\r\n")) {
                $_RETORNAR = false;
                $_RETORNAR_MSJ = 'Ha ocurrido un error al crear el archivo: ' . $_NOMBRE_ARCHIVO_ITEM;
            }
        }
    }
}

if ($_RETORNAR) {
    echo '00';
} else {
    echo '99|' . $_RETORNAR_MSJ;
}
