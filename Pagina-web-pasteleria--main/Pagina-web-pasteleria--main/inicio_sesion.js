(function init(){
    // Tu código aquí
    const form = document.getElementById('loginForm');
    const emailInput = document.getElementById('correo');
    const passwordInput = document.getElementById('contrasena');
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

    form.addEventListener('submit', function(e){
        e.preventDefault(); // Evita el envío del formulario

        // Primero validar formato
        const formatoValido = validarCorreo() && validarPassword();
        
        if(!formatoValido){
            alerta.textContent = 'Por favor corrige los errores en el formulario';
            alerta.className = 'alert alert-danger';
            return;
        }

        // Si el formato es válido, verificar credenciales en localStorage
        const correo = emailInput.value.trim();
        const password = passwordInput.value;
        
        // Buscar usuario por correo en localStorage
        let usuarioEncontrado = null;
        for(let i = 0; i < localStorage.length; i++){
            const key = localStorage.key(i);
            try {
                const userData = JSON.parse(localStorage.getItem(key));
                // Verificar si es un objeto de usuario y si el correo coincide
                if(userData && userData.email === correo){
                    usuarioEncontrado = userData;
                    break;
                }
            } catch(e) {
                // Ignorar claves que no sean JSON válido
                continue;
            }
        }

        // Verificar credenciales
        if(usuarioEncontrado && usuarioEncontrado.password === password){
            alerta.innerHTML = `<div class="alert alert-success">¡Bienvenido ${usuarioEncontrado.nombre}! Inicio de sesión exitoso</div>`;
            
            // Guardar sesión actual
            localStorage.setItem('usuarioActual', JSON.stringify(usuarioEncontrado));
            
            // Redirigir después de 2 segundos
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 2000);
            
        } else {
            alerta.innerHTML = '<div class="alert alert-danger">Correo o contraseña incorrectos</div>';
            
            // Limpiar campos
            emailInput.value = '';
            passwordInput.value = '';
            emailInput.focus();
        }

        const firstInvalid = form.querySelector('.is-invalid');
        if(firstInvalid){
            firstInvalid.focus();
        }
    });

})(); // ← Se ejecuta automáticamente



