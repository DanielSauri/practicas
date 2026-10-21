const formulario = document.querySelector('#formulario');
const email = document.querySelector('#email');
const emailCC = document.querySelector('#emailCC');
const asunto = document.querySelector('#asunto');
const mensaje = document.querySelector('#mensaje');
const btnEnviar = document.querySelector('button[type=submit]');
const btnReset = document.querySelector('button[type=reset]');
const spinner = document.querySelector('#spinner');
const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// event listeners
email.addEventListener('input', e => validarFormulario(e));
emailCC.addEventListener('input', e => validarFormulario(e));
asunto.addEventListener('input', e => validarFormulario(e));
mensaje.addEventListener('input', e => validarFormulario(e));
formulario.addEventListener('submit', e => {
    e.preventDefault();
    const referencia = e.target.parentElement;
    const alerta = referencia.querySelector('.alerta');
    if(emailCC.value.trim() !== '' && !regex.test(emailCC.value)){
        return;
    }
    if(asunto.value.trim() !== '' && mensaje.value.trim() !== '' && regex.test(email.value)){
        eliminarAlerta(alerta);
        mostrarSpinner();
        
        setTimeout(() => {
            spinner.classList.add('hidden');
            formulario.reset();
            btnEnviar.style = 'opacity: 0.5';
            btnEnviar.disabled = true;

            mostrarAlerta("success", "email enviado correctamente",alerta,referencia)
            setTimeout(() => {
                eliminarAlerta(document.querySelector('.alerta'));
                btnReset.style = 'opacity: 1;'
                btnReset.disabled = false;
            }, 3000);
        }, 3000);
    }else {
        mostrarAlerta('error','compruebe que todos los datos sean validos',alerta,referencia);
    }
})
btnReset.addEventListener('click', () => {
    mostrarAlerta('success', 'datos eliminados correctamente','','document');
    const alerta = formulario.querySelectorAll('.alerta');
    btnEnviar.style = 'opacity: 0.5;'
    btnEnviar.disabled = true;
    setTimeout(() => {
        alerta.forEach( alerta => {
            eliminarAlerta(alerta);
        })
    }, 2000);
})

// functions
function validarFormulario(e) {
    const referencia = e.target.parentElement;
    const alerta = referencia.querySelector('.alerta');
    btnReset.style = 'opacity: 1;'
    btnReset.disabled = false;

    if(e.target.id === 'emailCC') {
        if(e.target.value.trim() === ''){
            eliminarAlerta(alerta);
        }else {
            if(!regex.test(emailCC.value)){
               mostrarAlerta('error','email no valido',alerta,referencia);
               btnEnviar.style = 'opacity: 0.5;'
               btnEnviar.disabled = true;
               return;
            }
            eliminarAlerta(alerta);
        }
    }else{
        if(e.target.value.trim() !== ''){
            if(e.target.id === 'email'){
                if(!regex.test(email.value)){
                    mostrarAlerta('error','email no valido',alerta,referencia);
                }
            }
            if(emailCC.value.trim() !== '' && !regex.test(emailCC.value)) {
                btnEnviar.style = 'opacity: 0.5;'
                btnEnviar.disabled = true;
                eliminarAlerta(alerta);
                return;
            }
            eliminarAlerta(alerta)
        }else {
            if(e.target.id !== 'emailCC') {
                mostrarAlerta('error','campo obligatorio',alerta,referencia);
                btnEnviar.style = 'opacity: 0.5;'
                btnEnviar.disabled = true;
            }else {
                eliminarAlerta(alerta);
            }
        }
    }
    
    if(email.value.trim() !== '' && asunto.value.trim() !== '' && mensaje.value.trim() !== '' && regex.test(email.value)){
        btnEnviar.style = 'opacity: 1;'
        btnEnviar.disabled = false;
    }
}

function mostrarAlerta(tipo,mensaje,alerta,referencia) {
    const div = document.createElement('DIV');
    const p = document.createElement('P');
    
    div.classList.add('text-center','text-white','p-3','alerta');

    p.textContent = mensaje;
    div.appendChild(p);
    if(tipo !== "error") {
        div.classList.add('bg-green-500');
        formulario.appendChild(div);
        return;
    }
    
    div.classList.add('bg-red-600');
    eliminarAlerta(alerta);
    referencia.appendChild(div);
}

function eliminarAlerta(alerta) {
    if(alerta) {
        alerta.remove();
    }
}

function mostrarSpinner() {
    btnEnviar.style = 'opacity: 0.5;'
    btnEnviar.disabled = true;
    btnReset.style = 'opacity: 0.5;'
    btnReset.disabled = true
    spinner.classList.remove('hidden');
}