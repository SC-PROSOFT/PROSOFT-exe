// 132-1 -> Trae consecutivo


(() => {
    // loader('show')
    console.log(process.env.ELECTRON_ENV)
    _inputControl('reset');
    _inputControl('disabled');
    postData({ datosh: datosEnvio() + "01I|"  }, get_url("app/TAX/TAX132-2.DLL"))
        .then(data => {
            console.log(data)
        })
})();