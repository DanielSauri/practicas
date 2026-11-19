const tweet = document.querySelector('#tweet');
const formulario = document.querySelector('#formulario');
const submit = document.querySelector('input[type="submit"]');
const listaTweets = document.querySelector('#lista-tweets');
const tweetStorage = JSON.parse(localStorage.getItem( 'tweets' ));
let tweets = [];

document.addEventListener('DOMContentLoaded', () => {
    if(tweetStorage !== null) {
        tweets = tweetStorage;
        mostrarTweet();
    }
});

listaTweets.addEventListener('click', e => {
    eliminarTweet(e);
})

formulario.addEventListener('submit', e => {
    e.preventDefault();
    if( tweet.value.trim() ) {
        guardarTweet();
        formulario.reset();
        if( formulario.lastChild.classList == 'error') {
            formulario.removeChild( formulario.lastChild );
        }
    }else {
        mostrarError();
    }
})

function guardarTweet() {
    tweets = [...tweets, tweet.value];
    localStorage.setItem( 'tweets', JSON.stringify(tweets));
    mostrarTweet();
}

function mostrarTweet() {
    limpiarHTML();
    tweets.forEach(tweet => {
        const div = document.createElement('DIV');
        const li = document.createElement('LI');
        const p = document.createElement('p');
        
        li.textContent = tweet;
        p.textContent = 'X';
        p.classList.add('borrar-tweet');

        li.appendChild(p);
        div.appendChild(li);
        listaTweets.appendChild(div);
    });
}

function limpiarHTML() {
    while( listaTweets.firstChild) {
        listaTweets.removeChild( listaTweets.firstChild );
    }
}

function eliminarTweet(e) {
    const resultado = tweets.filter( tweet => {
        return tweet !== e.target.parentElement.firstChild.textContent;
    } )

    tweets = resultado;
    localStorage.setItem( 'tweets', JSON.stringify(resultado) );
    mostrarTweet();
}

function mostrarError() {
    if( formulario.lastChild.classList == 'error') {
        formulario.removeChild( formulario.lastChild );
    }
    const p = document.createElement('P');
    p.textContent = "El campo es obligatorio";
    p.classList.add('error');
    formulario.appendChild(p)
}