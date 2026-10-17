const formulario = document.querySelector('#formulario');
const email = document.querySelector('#email');
const asunto = document.querySelector('#asunto');
const inputMensaje = document.querySelector('#mensaje');
const btnEnviar = document.querySelector('button[type=submit]');
const btnReset = document.querySelector('button[type=reset]');

// event listeners
email.addEventListener('blur', e => validarFormulario(e));
asunto.addEventListener('blur', e => validarFormulario(e));
inputMensaje.addEventListener('blur', e => validarFormulario(e));
btnEnviar.addEventListener('click', e => {
    e.preventDefault()
    mostrarAlerta('success', 'email enviado correctamente');
})
btnReset.addEventListener('click', e => {
    mostrarAlerta('success', 'datos eliminados');
    btnEnviar.style = 'opacity: 0.5;'
    btnEnviar.disabled = true;
})

// functions
function validarFormulario(e) {
    const input = e.target;
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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
    if(email.value !== '' && asunto.value !== '' && inputMensaje.value !== ''){
        btnEnviar.style = 'opacity: 30;'
        btnEnviar.disabled = false;
    }
}

function mostrarAlerta(type,mensaje) {
    const alerta = document.querySelector('.alerta');
    const div = document.createElement('DIV');
    const p = document.createElement('P');
    if(type === 'error'){
        div.classList.add('bg-red-600','text-center','p-3','uppercase','alerta');
    }else {
        div.classList.add('bg-green-500','text-center','p-3','uppercase','alerta');
    }

    if(alerta) {
        alerta.remove();
    }
    p.textContent = mensaje;
    div.appendChild(p);
    formulario.appendChild(div);
}