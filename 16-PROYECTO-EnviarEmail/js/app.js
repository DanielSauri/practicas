const formulario = document.querySelector('#formulario');
const email = document.querySelector('#email');
const asunto = document.querySelector('#asunto');
const mensaje = document.querySelector('#mensaje');
const btnEnviar = document.querySelector('button[type=submit]');
const btnReset = document.querySelector('button[type=reset]');
const spinner = document.querySelector('#spinner');
const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// event listeners
email.addEventListener('blur', e => validarFormulario(e));
asunto.addEventListener('blur', e => validarFormulario(e));
mensaje.addEventListener('blur', e => validarFormulario(e));
formulario.addEventListener('submit', e => {
    e.preventDefault();
    const alerta = document.querySelector('.alerta');
    if(asunto.value !== '' && mensaje.value !== '' && regex.test(email.value)){
        mostrarSpinner();
        
        alerta.remove();
        setTimeout(() => {
            spinner.classList.add('hidden');
            setTimeout( () => {
                mostrarAlerta("success", "email enviado correctamente")
                setTimeout(() => {
                    document.querySelector('.alerta').remove();
                    formulario.reset();
                    btnEnviar.style = 'opacity: 0.5';
                    btnEnviar.disabled = true;
                }, 3000);
            }, 500);
        }, 3000);
    }else {
        mostrarAlerta('error','compruebe que todos los datos sean validos');
    }
})
btnReset.addEventListener('click', () => {
    mostrarAlerta('success', 'datos eliminados correctamente');
    btnEnviar.style = 'opacity: 0.5;'
    btnEnviar.disabled = true;
    setTimeout(() => document.querySelector('.alerta').remove(), 2000);
})

// functions
function validarFormulario(e) {
    const input = e.target;
    btnReset.style = 'opacity: 1;'
    btnReset.disabled = false;

    if(input.value !== ''){
        if(input.id === 'email'){
            if(regex.test(email.value)){
                mostrarAlerta('success','email correcto');
            }else {
                mostrarAlerta('error','email no valido');
            }
        }else{
            mostrarAlerta('success',`${input.id} correcto`);
        }
    }else {
        mostrarAlerta('error','campo obligatorio');
    }
    if(email.value !== '' && asunto.value !== '' && mensaje.value !== '' && regex.test(email.value)){
        btnEnviar.style = 'opacity: 1;'
        btnEnviar.disabled = false;
    }else {
        btnEnviar.style = 'opacity: 0.5;'
        btnEnviar.disabled = true;
    }
}

function mostrarAlerta(type,mensaje) {
    const alerta = document.querySelector('.alerta');
    const div = document.createElement('DIV');
    const p = document.createElement('P');
    
    div.classList.add('text-center','p-3','alerta');

    if(type === 'error'){
        div.classList.add('bg-red-600');
    }else {
        div.classList.add('bg-green-500');
    }

    if(alerta) {
        eliminarAlerta(alerta);
    }

    p.textContent = mensaje;
    div.appendChild(p);
    formulario.appendChild(div);
}

function eliminarAlerta(alerta) {
    alerta.remove();
}

function mostrarSpinner() {
    btnEnviar.style = 'opacity: 0.5;'
    btnEnviar.disabled = true;
    btnReset.style = 'opacity: 0.5;'
    btnReset.disabled = true
    spinner.classList.remove('hidden');
}