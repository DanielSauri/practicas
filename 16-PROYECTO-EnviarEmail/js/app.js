const formulario = document.querySelector('#formulario');
const email = document.querySelector('#email');
const asunto = document.querySelector('#asunto');
const inputMensaje = document.querySelector('#mensaje');
const btnEnviar = document.querySelector('button');
let alertas = [];

// eventListeners
email.addEventListener('blur', e => validarFormulario(e));
asunto.addEventListener('blur', e => validarFormulario(e));
inputMensaje.addEventListener('blur', e => validarFormulario(e));
btnEnviar.addEventListener('click', e => {
    e.preventDefault()
    console.log("Datos enviados...")
})


function validarFormulario(e) {
    const input = e.target;
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(input.value !== ''){
        if(input.id === 'email'){
            if(regex.test(email.value)){
                console.log('email correcto');
            }else {
                mostrarAlerta('email no valido');
            }
        }else{
            console.log(`${input.id} correcto`);
        }
    }else {
        mostrarAlerta('campo obligatorio');
    }
}

function mostrarAlerta(mensaje) {
    const div = document.createElement('DIV');
    const p = document.createElement('P');
    
    div.classList.add('bg-red-600','text-center','p-3');
    
    p.textContent = mensaje;
    div.appendChild(p);

    // formulario.appendChild(div);
    console.log(p)
}