$(document).ready(function () {
    var datos_envio = localStorage.Sesion + '|' + localStorage.Contab + '|' + localStorage.Mes + '|' + localStorage.Usuario;
    var url = 'http://192.168.0.100/main-elect/app/tax/CON823.dll';
    SolicitarDll({ datosh: datos_envio }, function (data) {
        $datos_usuar = [];
        var encode = encodeURI(data);
        encode = encode.replace(/%0D%0A/g, "")
        var f = decodeURI(encode);
        console.log(f)
        $datos_usuar = JSON.parse(f)
    }, url);
})