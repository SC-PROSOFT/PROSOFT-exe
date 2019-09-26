<?php
$_FILE = $_POST['files'];
$_OUT = true;
$_MENSAJE = '';

for ($i = 0; $i < sizeof($_FILE); $i++) {
    $_RUTA = "D:/PSC/PROG/DATOS/JSON/" . $_FILE[$i] . ".JSON";

    if (file_exists($_RUTA)) {
       if (!unlink($_RUTA)) {
           $_MENSAJE .= 'Ha ocurrido un error eliminando el archivo: '+ $_RUTA;
           $_OUT = false;
       }
    } else {
        $_OUT = false;
        $_MENSAJE .= 'El archivo: ' . $_RUTA . ' no existe;';
    }
}

if ($_OUT) { 
    echo '00|Archivos borrados correctamente'; 
}else{
    echo '-1|' . $_MENSAJE;
}
