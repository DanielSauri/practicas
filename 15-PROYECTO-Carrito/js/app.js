const carrito = document.querySelector('#carrito');
const listaCursos = document.querySelector('#lista-cursos');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarrito = document.querySelector("#vaciar-carrito");
const btnEliminar = document.querySelector("#btnEliminar");
let articulosCarrito = [];

document.addEventListener("click", (e) => {
    if(e.target.classList.contains('agregar-carrito')){
        e.preventDefault();
        let curso = e.target.parentElement.parentElement;
        obtenerDatos(curso);
    }
})

vaciarCarrito.addEventListener('click', (e) => eliminarCarrito(e));
btnEliminar.addEventListener('click', () => {console.log("eliminar curso")})

function obtenerDatos(curso) {
    const cursoInfo = {
        imagen: curso.children[0],
        nombre: curso.children[1].children[0],
        precio: curso.children[1].children[1],
        id: curso.querySelector('a').getAttribute('data-id'), // Necesite ayuda aqui
        cantidad: 1
    }
    guardarDatos(cursoInfo);
}

function guardarDatos(cursoInfo) {        
    limpiarHtml();
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

    //Necesite ayuda aqui para usar el forEach y para usar curso dentro de innerHtml
    articulosCarrito.forEach( curso => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${curso.imagen.src}" width="130px"></img>
            </td>
            <td>
                <h4>${curso.nombre.textContent}</h4>
            </td>
            <td>
                <p>${curso.precio.textContent}</p>
            </td>
            <td>
                <p align="center">${curso.cantidad}</p>
            </td>
            <td>
                <div>
                    <button id="btnEliminar">${"X"}</button>
                </div>
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