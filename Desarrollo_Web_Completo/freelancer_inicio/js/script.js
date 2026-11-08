const nombre = document.querySelector('input[type="text"]');
const telefono = document.querySelector('input[type="tel"]');
const correo = document.querySelector('input[type="email"]');
const mensaje = document.querySelector('#mensaje');
const formulario = document.querySelector('.formulario');
const spinner = document.querySelector('#spinner');
const enviar = document.querySelector('input[type="submit"]');
const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const regexTel = /^\+?[0-9]{9,15}$/;

let datos = {
    nombre: '',
    telefono: '',
    correo: '',
    mensaje: ''
}
 
nombre.addEventListener('input', e => obtenerDatos(e.target) );
telefono.addEventListener('input', e => obtenerDatos(e.target) );
correo.addEventListener('input', e => obtenerDatos(e.target) );
mensaje.addEventListener('input', e => obtenerDatos(e.target) );

formulario.addEventListener('submit', e => {
    e.preventDefault();

    if( telefono.value !== '' ){
        if( !regexTel.test(telefono.value) ){
            eliminarAlerta( telefono.parentElement );
            mostrarAlerta( telefono.parentElement, 'numero no valido' );
            return;
        }
    }

    if(nombre.value.trim() === '' || telefono.value === '' || correo.value.trim() === '' || mensaje.value.trim() === '' || !regex.test(correo.value)) {
        visibilidadEnviar(false);
        return;
    }else {
        visibilidadEnviar(false);

        spinner.hidden = false;

        setTimeout(() => {
            formulario.reset();
            datos = {
                nombre: '',
                telefono: '',
                correo: '',
                mensaje: ''
            }
            spinner.hidden = true;
        }, 2000);

        setTimeout(() => {
            mostrarAlerta(formulario, 'gracias por comunicarse con nosotros');
        }, 2000);
        
        setTimeout(() => {
            formulario.lastChild.remove();
        }, 5000);
    }
})

function visibilidadEnviar(activo) {
    if(activo) {
        enviar.classList.remove('btn-disabled');
        enviar.classList.add('btn-active')
        enviar.disabled = false;
    }else {
        enviar.classList.remove('btn-active');
        enviar.classList.add('btn-disabled')
        enviar.disabled = true;
    }
}

function obtenerDatos(campo) {
    if(campo.id === 'nombre'){
        datos.nombre = campo.value;
        validarDatos(campo);
    }
    if(campo.id === 'numero') {
        datos.telefono = campo.value;
        validarDatos(campo);
    }
    if(campo.id === 'correo') {
        datos.correo = campo.value;
        validarDatos(campo);
    }
    if(campo.id === 'mensaje') {
        datos.mensaje = campo.value;
        validarDatos(campo);
    }
}

function validarDatos(campo) {
    const { nombre, telefono, correo, mensaje } = datos;

    if( campo.id === 'correo'){
        if( !regex.test(correo)) {
            if(correo.trim() !== '' ){
                eliminarAlerta(campo.parentElement);
                mostrarAlerta(campo.parentElement, 'correo no valido');
                return;
            }
        }
    }
    
    if( campo.id === 'numero' ) {
        if( telefono !== '' ){
            if( !regexTel.test(telefono) ){
                eliminarAlerta( campo.parentElement );
                mostrarAlerta( campo.parentElement, 'numero no valido' );
                visibilidadEnviar(false);
                return;
            }
        }
    }

    if(nombre.trim() !== '' && telefono !== '' && correo.trim() !== '' && mensaje.trim() !== '' && regex.test(correo) && regexTel.test(telefono) ){
        visibilidadEnviar(true);
    }
    
    if(campo.value.trim() === '') {
        eliminarAlerta(campo.parentElement);
        mostrarAlerta(campo.parentElement, 'todos los campos son obligatorios');
        return;
    }else {
        eliminarAlerta(campo.parentElement);
    }
    
}

function mostrarAlerta(campo, mensaje) {
    const p = document.createElement('p');
    p.textContent = `${mensaje}`;
    if( campo.classList.contains('formulario') ) {
        p.classList.add('success');
    }else {
        p.classList.add('error');
    }
    campo.appendChild(p);

    visibilidadEnviar(false);
}

function eliminarAlerta(campo) {
    if(campo.lastChild.classList !== undefined){
        campo.lastChild.remove();
    }
}