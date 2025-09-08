document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactoForm');
    const nombreInput = document.getElementById('nombre');
    const emailInput = document.getElementById('correo');
    const telefonoInput = document.getElementById('telefono');
    const mensajeInput = document.getElementById('mensaje');
    const alerta = document.getElementById('alerta');

    function setOK(el) {
        if (!el) return;
        el.classList.remove('is-invalid');
        el.classList.add('is-valid');
    }
    function setError(el, msg) {
        if (!el) return;
        el.classList.remove('is-valid');
        el.classList.add('is-invalid');
        const fb = el.parentElement.querySelector('.invalid-feedback');
        if (fb && msg) fb.textContent = msg;
    }

    function validarNombre() {
        const nombre = nombreInput.value.trim();
        if (nombre === '') {
            setError(nombreInput, 'Por favor ingresa tu nombre');
            return false;
        }
        setOK(nombreInput);
        return true;
    }

    function validarCorreo() {
        const v = emailInput.value.trim();
        const rx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!rx.test(v)) {
            setError(emailInput, 'Ingrese un correo válido');
            return false;
        }
        setOK(emailInput);
        return true;
    }

    function validarTelefono() {
        const tel = telefonoInput.value.trim();
        if (tel && !/^\d{7,15}$/.test(tel)) {
            setError(telefonoInput, 'Por favor ingresa un teléfono válido');
            return false;
        }
        setOK(telefonoInput);
        return true;
    }

    function validarMensaje() {
        const msg = mensajeInput.value.trim();
        if (msg === '') {
            setError(mensajeInput, 'Por favor ingresa tu mensaje');
            return false;
        }
        setOK(mensajeInput);
        return true;
    }

    if (nombreInput) nombreInput.addEventListener('input', validarNombre);
    if (emailInput) emailInput.addEventListener('input', validarCorreo);
    if (telefonoInput) telefonoInput.addEventListener('input', validarTelefono);
    if (mensajeInput) mensajeInput.addEventListener('input', validarMensaje);

    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            if (alerta) alerta.innerHTML = '';
            let ok = true;
            ok &= validarNombre();
            ok &= validarCorreo();
            ok &= validarTelefono();
            ok &= validarMensaje();
            if (ok) {
                if (alerta) alerta.innerHTML = '<div class="alert alert-success">¡Mensaje enviado correctamente!</div>';
                form.reset();
                const validInputs = form.querySelectorAll('.is-valid');
                validInputs.forEach(i => i.classList.remove('is-valid'));
            } else {
                if (alerta) alerta.innerHTML = '<div class="alert alert-danger">Error, corrige los campos marcados</div>';
            }
            const firstInvalid = form.querySelector('.is-invalid');
            if (firstInvalid) {
                firstInvalid.focus();
            }
        });
    }
});
    // mensaje para verificar errores
    function setOK(el) {
        el.classList.remove('is-invalid');
        el.classList.add('is-valid');
    }
    //
    function setError(el, msg) {
        el.classList.remove('is-valid');
        el.classList.add('is-invalid');
        const fb = el.parentElement.querySelector('.invalid-feedback');
        if (fb && msg) fb.textContent = msg;
    }

    function validarNombre() {
        const nombre = nombreInput.value.trim();
        if (nombre === '') {
            setError(nombreInput, 'Por favor ingresa tu nombre');
            return false;
        }
        setOK(nombreInput);
        return true;
    }

    function validarCorreo() {
        //expresion regular
        const v = emailInput.value.trim();
        const rx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!rx.test(v)) {
            setError(emailInput, 'Ingrese un correo valido');
            return false;
        }
        setOK(emailInput);
        return true;
    }



