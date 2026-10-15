const carrito = document.querySelector('#carrito');
const listaCursos = document.querySelector('#lista-cursos');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarrito = document.querySelector("#vaciar-carrito");
const btnEliminar = document.querySelector("#btnEliminar");
let articulosCarrito = [];

document.addEventListener('click', e => {
    if(e.target.classList.contains('agregar-carrito')){
        e.preventDefault();
        let curso = e.target.parentElement.parentElement;
        obtenerDatos(curso);
    }
})

carrito.addEventListener('click', e => eliminarProducto(e));

vaciarCarrito.addEventListener('click', e => eliminarCarrito(e));

function obtenerDatos(curso) {
    const cursoInfo = {
        imagen: curso.querySelector('img').src,
        nombre: curso.querySelector('h4').textContent,
        precio: curso.querySelector('span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'), // Necesite ayuda aqui
        cantidad: 1
    }

    const existe = articulosCarrito.some( curso => curso.id == cursoInfo.id);
    if(!existe){
        articulosCarrito = [...articulosCarrito, cursoInfo];
    }else {
        const cursos = articulosCarrito.map( curso => {
            if(curso.id != cursoInfo.id){
                return curso;
            }else {
                curso.cantidad++;
                return curso;
            }
        })
        articulosCarrito = cursos
    }
    guardarDatos(articulosCarrito);
}

function guardarDatos(articulosCarrito) {        
    limpiarHtml();
    //Necesite ayuda aqui para usar el forEach y para usar curso dentro de innerHtml
    articulosCarrito.forEach( curso => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${curso.imagen}" width="130px">
            </td>
            <td>
                <h4>${curso.nombre}</h4>
            </td>
            <td>
                <p>${curso.precio}</p>
            </td>
            <td>
                <p align="center">${curso.cantidad}</p>
            </td>
            <td>
                <a href="#" class="borrar-curso" data-id="${curso.id}">X</a>
            </td>
        `
        contenedorCarrito.appendChild(row);
    })
}

function limpiarHtml() {
    // if(contenedorCarrito.firstChild){
    //     contenedorCarrito.innerHTML = ``;
    // } yo lo hice de esta forma aunque no es la mejor manera de hacerlo

    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    } // me tuve que apoyar del video para esto. sabia que tenia que usar remove child y firstchild pero faltaba
}

function eliminarCarrito(e) {
    e.preventDefault();
    articulosCarrito = [];
    limpiarHtml();
}

function eliminarProducto(e) {
    const id = e.target.getAttribute('data-id');
    e.preventDefault();
    articulosCarrito = articulosCarrito.filter( curso => {
        if(curso.id == id){
            if(curso.cantidad == 1){
                return curso.id !== id
            }else {
                return curso.cantidad--
            }
        }else {
            return curso;
        }
    })

    guardarDatos(articulosCarrito)
}