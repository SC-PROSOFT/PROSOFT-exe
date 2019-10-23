<?php
$_SESION = $_POST['sesion'];

$_NOMBRE_ARCHIVO_CL_TANQUES = 'C:\\PROSOFT\\TEMP\\CLTAN-TBL-' . $_SESION . '.txt';

$_DATOS_CL_TANQU = $_POST['datos_cl_tanqu'];

$_RETORNAR = true;
$_RETORNAR_MSJ = '';

if (file_exists($_NOMBRE_ARCHIVO_CL_TANQUES)) {
    if (!unlink($_NOMBRE_ARCHIVO_CL_TANQUES)) {
        $_RETORNAR = false;
        $_RETORNAR_MSJ = 'Ha ocurrido un error eliminando el archivo: '. $_NOMBRE_ARCHIVO_CL_TANQUES;
    }
}

if ($_DATOS_CL_TANQU != 'false') {
    foreach ($_DATOS_CL_TANQU as $index => $valor) {
        $fuente = $valor["COMP"];

        if ($archivo = fopen($_NOMBRE_ARCHIVO_CL_TANQUES, "a")) {
            if (!fwrite($archivo, $fuente . "\r\n")) {
                $_RETORNAR = false;
                $_RETORNAR_MSJ = 'Ha ocurrido un error al crear el archivo: ' . $_NOMBRE_ARCHIVO_CL_TANQUES;
            }
        }
    }
}

if ($_RETORNAR) {
    echo '00';
} else {
    echo '99|' . $_RETORNAR_MSJ;
}