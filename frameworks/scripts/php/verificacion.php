<?php

// echo hash("sha256",'GEBC');
// echo '<hr>';
// echo hash("sha256",'0101');

$_USUARIO = 'd18db8872d2f92b5c345c184d611ea0383860d86cd6bf1df5a89bb3e89f0ddb0'; //GEBC
$_CLAVE = '07334386287751ba02a4588c1a0875dbd074a61bd9e6ab7c48d244eacd0c99e0'; // 0101

$usuario_in = hash("sha256", $_POST['usuario']);
$clave_in = hash("sha256", $_POST['clave']);

$resultUsuario = hash_equals($_USUARIO, $usuario_in);
$resultClave = hash_equals($_CLAVE, $clave_in);

if($resultUsuario){
    if($resultClave){        
        $resultado = [
            'codigo' => '0',
            'mensaje' => 'Correcto'
        ];
    }else{
        $resultado = [
            'codigo' => '1',
            'mensaje' => 'Clave no coincide'
        ];
    }
}else{
    $resultado = [
        'codigo' => '1',
        'mensaje' => 'Usuario no coincide'
    ];
}

print_r(json_encode($resultado));

