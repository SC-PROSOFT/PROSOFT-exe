<?php
$_NOMBREARCHIVO = $_POST['nombre_archivo'];
$_TABLADATOS = $_POST['tabla'];
$_DIRECTORIO = 'C:\\PROSOFT\\TEMP\\' . $_NOMBREARCHIVO . '.txt';

$_RETORNAR = true;
$_RETORNAR_MSJ = '';

if ($_TABLADATOS != 'false') {
    foreach ($_TABLADATOS as $index => $item){
        $linea = $item["ALMFACT"]
        . '|' . $item["ARTFACT"]
        . '|' . $item["CODLOTEFACT"]
        . '|' . $item["CANTFACT"]
        . '|' . $item["VLRFACT"]
        . '|' . $item["DIASTRATAFACT"]
        . '|' . $item["VLRLATERFACT"]
        . '|' . $item["DATOSSETCUP"]
        . '|' . $item["CISCUP"]
        . '|' . $item["DESCRIPCUP"]
        . '|' . $item["CODCUP"]
        . '|';

        if($archivo = fopen($_DIRECTORIO, 'a')){
            if (!fwrite($archivo, $linea . "\r\n")){
                $_RETORNAR = false;
                $_RETORNAR_MSJ = 'Ha ocurrido un error al crear el archivo: ' . $_NOMBREARCHIVO;
            }
        }
    }
    fclose($archivo);
    echo "00";
} else {
    echo $_NOMBREARCHIVO;
    echo "99";
}