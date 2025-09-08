(function init(){
    const form = document.getElementById('registroForm');
    const nombreInput = document.getElementById('nombre');
    const emailInput = document.getElementById('correo');
    const passwordInput = document.getElementById('floatingPassword');
    const confirmPasswordInput = document.getElementById('confirmarPassword');
    const telefonoInput = document.getElementById('telefono');
    const alerta = document.getElementById('alerta');

    // mensaje para verificar errores 
    function setOK(el){
        el.classList.remove('is-invalid');
        el.classList.add('is-valid');
    }
    // 
    function setError(el, msg){
        el.classList.remove('is-valid');
        el.classList.add('is-invalid');
        const fb = el.parentElement.querySelector('.invalid-feedback');
        if(fb && msg) fb.textContent = msg;
    }


    function validarNombre(){                                        
        const nombre = nombreInput.value.trim();
        if(nombre.length < 3){
            setError(nombreInput, 'El nombre debe tener al menos 3 caracteres'); 
            return false;
        }   
        setOK(nombreInput); 
        return true;
    }


    function validarCorreo(){
        //expresion regular
        const v = emailInput.value.trim();
        const rx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!rx.test(v)){
            setError(emailInput,'Ingrese un correo valido'); 
            return false;
        }               
            setOK(emailInput); return true;
        
    }

    function validarPassword(){
        const pass = passwordInput.value;
        if(pass.length < 6){
            setError(passwordInput, 'La contraseña debe tener al menos 6 caracteres'); 
            return false;
        }   
        setOK(passwordInput); 
        return true;
    }

         
    

    function confirmarContraseña(){
        const confirmPass = confirmPasswordInput.value;
        if(confirmPass !== passwordInput.value){
            setError(confirmPasswordInput, 'Las contraseñas no coinciden'); 
            return false;
        }
        setOK(confirmPasswordInput); 
        return true;
    }

    function validarTelefono(){
        const tel = telefonoInput.value.trim();
        const rx = /^\d{7,15}$/; // Solo dígitos, entre 7 y 15 caracteres
        if(!rx.test(tel)){
            setError(telefonoInput, 'Ingrese un número de teléfono válido');
            return false;
        }
        setOK(telefonoInput);
        return true;
    }

    // evento en tiempo real reconoce los errores
    nombreInput.addEventListener('input', validarNombre);
    emailInput.addEventListener('input', validarCorreo);
    passwordInput.addEventListener('input', validarPassword);
    confirmPasswordInput.addEventListener('input', confirmarContraseña);
    telefonoInput.addEventListener('input', validarTelefono);

    // evento del envio del formulario
    form.addEventListener('submit', function(e){
        alert("click");
        e.preventDefault();
        alerta.innerHTML = '';

        const ok = validarNombre() && validarCorreo() && validarPassword() && confirmarContraseña();
        alert(ok);
        if(ok){
            alerta.innerHTML = '<div class="alert alert-success">Registro exitoso</div>';

            localStorage.setItem(nombreInput.value.trim(),JSON.stringify({
                nombre: nombreInput.value.trim(),
                email: emailInput.value.trim(),
                password: passwordInput.value.trim(),
                telefono: telefonoInput.value.trim()
            }));

        } else {
            alerta.innerHTML = '<div class="alert alert-danger">Error, corrige los campos marcados</div>';

        }

        const firstInvalid = form.querySelector('.is-invalid');
        if(firstInvalid){
            firstInvalid.focus();
        }

    });


    

}());


