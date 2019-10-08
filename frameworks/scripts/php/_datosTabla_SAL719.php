<?php
    $_DATOS = $_POST['array'];
    $_SESION = $_POST['sesion'];
    
    $_NOMBRE_ARCHIVO = 'C:\\PROSOFT\\TEMP\\DATOS-TABLA-SAL719-' . $_SESION . '.txt';

    $_RETORNAR = true;
    $_RETORNAR_MSJ = '';

    if(file_exists($_NOMBRE_ARCHIVO)){
        if(!unlink($_NOMBRE_ARCHIVO)){
            $_RETORNAR = false;
            $_RETORNAR_MSJ = 'Ha ocurrido un error eliminando el archivo: ' . $_NOMBRE_ARCHIVO;            
        }
    }

    if($_DATOS){
        foreach($_DATOS as $index => $valor){
            $linea = '';
            for($i = 1; $i <= 4; $i++){
                $linea .= $valor[0]['sucursal' . $i]
                . '|' . $valor[0]['horaIng' . $i]
                . '|' . $valor[0]['horaRet' . $i]
                . '|' . $valor[0]['fre' . $i]
                . '|';
            }

            if ($archivo = fopen($_NOMBRE_ARCHIVO, "a")) {
                if (!fwrite($archivo, $linea . "\r\n")) {
                    $_RETORNAR = false;
                    $_RETORNAR_MSJ = 'Ha ocurrido un error al crear/modificar el archivo: ' . $_NOMBRE_ARCHIVO;
                }
            }
            // echo $linea . PHP_EOL;
        }
    }

    if ($_RETORNAR) {
        echo '00';
    } else {
        echo '99|' . $_RETORNAR_MSJ;
    }
    