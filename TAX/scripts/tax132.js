// 132-1 -> Trae consecutivo


(() => {
    // loader('show')
    _inputControl('reset');
    _inputControl('disabled');
    postData({ datosh: datosEnvio() + "01I|"  }, get_url("app/TAX/TAX132-2.DLL"))
        .then(data => {
            console.log(data)
        })
})();