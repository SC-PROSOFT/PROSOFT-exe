<?php
//use PHPMailer\PHPMailer\PHPMailer;
//use PHPMailer\PHPMailer\SMTP;

$remitentes = [
    [
        'correo' => 'bla@gmail.com',
        'clave' => 'sdsds',
    ],
    [
        'correo' => 'bla@gmail.com',
        'clave' => 'sdsds',
    ],
];

$destinatario = $_POST->nombre;
$correo = $_POST->correo;

require './src/PHPMailer.php';
require './src/SMTP.php';

$mail = new PHPMailer;
$mail->SMTPOptions = array(
    'ssl' => array(
        'verify_peer' => false,
        'verify_peer_name' => false,
        'allow_self_signed' => true,
    ),
);
$mail->CharSet = 'UTF-8';

$body = 'Cuerpo del correo de prueba';

$mail->isSMTP();
$mail->Host = gethostbyname('smtp.gmail.com');
$mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
$mail->Port = 587;
$mail->SMTPDebug = 1;
$mail->SMTPAuth = true;
$mail->Username = $remitentes[$_POST['remitentes']];
$mail->Password = '';
$mail->SetFrom('jhohansilva@prosoft.com.co', "Jhohan Silva");
$mail->AddReplyTo('jhohansilva@prosoft.com.co', 'Jhohan Silva 2');
$mail->Subject = 'Reporte imagenologia';
$mail->MsgHTML($body);

$mail->AddAddress($destinatario, $correo);

if (!$mail->send()) {
    echo 'Mailer Error: ' . $mail->ErrorInfo;
} else {
    echo 'Message sent!';
}
