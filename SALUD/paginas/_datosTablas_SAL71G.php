<?php
$_NOMBREARCHIVO = $_POST['nombre_archivo'];

// $_NOMBRE_PAQINTEGRALES = 'C:\\PROSOFT\\TEMP\\' . $_NOMBREARCHIVO . '.txt';
$_NOMBRE_TERCEROS = 'C:\\PROSOFT\\TEMP\\' . $_NOMBREARCHIVO . '.txt';

// $_TABLAINTEGRAL = $_POST['datos_intregales']; 
$_TABLATERCEROS = $_POST['datos_terceros'];

$_RETORNAR = true;
$_RETORNAR_MSJ = '';

if(file_exists($_NOMBRE_TERCEROS)){
    if(!unlink($_NOMBRE_TERCEROS)){
        $_RETORNAR = false; 
        $_RETORNAR_MSJ = 'Ha ocurrido un error eliminando el archivo: '. $_NOMBRE_TERCEROS; 
    }
}


if ($_TABLATERCEROS != 'false') {
    foreach ($_TABLATERCEROS as $index => $item){
        $linea = $item["direccion"]
        . '|' . $item["telefono"]
        . '|' . $item["ciudad"]
        . '|' . $item["barrio"]
        . '|';

        if($archivo = fopen($_NOMBRE_TERCEROS, 'a')){
            if (!fwrite($archivo, $linea . "\r\n")){
                $_RETORNAR = false;
                $_RETORNAR_MSJ = 'Ha ocurrido un error al crear el archivo: ' . $_NOMBRE_TERCEROS;
            }
        }
    }
    fclose($_RETORNAR);
    echo "00";
} else {
    echo "99|" .$_RETORNAR_MSJ;
}