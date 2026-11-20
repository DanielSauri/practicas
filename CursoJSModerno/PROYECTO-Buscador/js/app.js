const marca = document.querySelector('#marca');
const year = document.querySelector('#year');
const minimo = document.querySelector('#minimo');
const maximo = document.querySelector('#maximo');
const puertas = document.querySelector('#puertas');
const transmision = document.querySelector('#transmision');
const color = document.querySelector('#color');
const resultado = document.querySelector('#resultado');

let datos = {
    marca: '',
    year: '',
    minimo: '',
    maximo: '',
    puertas: '',
    transmision: '',
    color: ''
}

// AddEventListeners
document.addEventListener('DOMContentLoaded', generarYear );
marca.addEventListener( 'click', () => {
    datos.marca = marca.value;
    filtrarAutos();
});
year.addEventListener( 'click', () => {
    datos.year = year.value;
    filtrarAutos();
});
minimo.addEventListener( 'click', () => {
    datos.minimo = minimo.value;
    filtrarAutos();
});
maximo.addEventListener( 'click', () => {
    datos.maximo = maximo.value;
    filtrarAutos();
});
puertas.addEventListener( 'click', () => {
    datos.puertas = puertas.value;
    filtrarAutos();
});
transmision.addEventListener( 'click', () => {
    datos.transmision = transmision.value;
    filtrarAutos();
});
color.addEventListener( 'click', () => {
    datos.color = color.value;
    filtrarAutos();
});

// FUNCIONES
function generarYear() {
    for (let i = 2020; i >= 2015; i--) {
        const option = document.createElement('OPTION');
        option.textContent = i;
        year.appendChild(option);
    }
    filtrarAutos();
}
function filtrarAutos() {
    limpiarHtml();
    const result = autos.filter( filtrarMarca ).filter( filtrarYear ).filter( filtrarMinimo ).filter( filtrarMaximo ).filter( filtrarPuertas ).filter( filtrarTransmision ).filter( filtrarColor );
    
    if(result.length == 0) {
        mostrarError();
    }
    mostrarResultados(result);
}
function mostrarResultados(result) {

    const table = document.createElement('TABLE');
    const thead = document.createElement('THEAD');
    const tbody = document.createElement('TBODY');
    const trHead = document.createElement('TR'); // TR para los th dentro de thead

    const marcath = document.createElement('Th');
    const modeloth = document.createElement('Th');
    const yearth = document.createElement('Th');
    const precioth = document.createElement('Th');
    const puertasth = document.createElement('Th');
    const colorth = document.createElement('Th');
    const transmisionth = document.createElement('Th');
    
    // AQUI SEÑALO LA INFORMACION DE CADA CARRO
    marcath.textContent = 'Marca';
    modeloth.textContent = 'Modelo';
    yearth.textContent = 'Año';
    precioth.textContent = 'Precio';
    puertasth.textContent = 'Puertas';
    colorth.textContent = 'Color';
    transmisionth.textContent = 'Transmision';

    table.classList.add('container');

    result.forEach(auto => {
        const { marca,modelo,year,precio,puertas,transmision,color } = auto;

        const trBody = document.createElement('TR'); // TR para cada auto que se muestra en el tbody
        const marcatd = document.createElement('TD');
        const modelotd = document.createElement('TD');
        const yeartd = document.createElement('TD');
        const preciotd = document.createElement('TD');
        const puertastd = document.createElement('TD');
        const colortd = document.createElement('TD');
        const transmisiontd = document.createElement('TD');

        // CON ESTO MUESTRO LAS CARACTERISTICAS DE CADA CARRO
        marcatd.textContent = marca;
        modelotd.textContent = modelo;
        yeartd.textContent = year;
        preciotd.textContent = precio;
        puertastd.textContent = puertas;
        colortd.textContent = color;
        transmisiontd.textContent = transmision;

        trHead.appendChild(marcath);
        trHead.appendChild(modeloth);
        trHead.appendChild(yearth);
        trHead.appendChild(precioth);
        trHead.appendChild(puertasth);
        trHead.appendChild(colorth);
        trHead.appendChild(transmisionth);
        
        // AQUI MUESTRO LAS CARACTERISTICAS DE CADA CARRO
        trBody.appendChild(marcatd);
        trBody.appendChild(modelotd);
        trBody.appendChild(yeartd);
        trBody.appendChild(preciotd);
        trBody.appendChild(puertastd);
        trBody.appendChild(colortd);
        trBody.appendChild(transmisiontd);
        
        thead.appendChild(trHead);
        tbody.appendChild(trBody);

        table.appendChild(thead);
        table.appendChild(tbody);
        resultado.appendChild(table);

    });
}
function filtrarMarca(autos) {
    if( datos.marca ) {
        return autos.marca === datos.marca;
    }
    return autos;
}
function filtrarYear(autos) {
    if( datos.year ) {
        return autos.year === parseInt(datos.year);
    }
    return autos;
}
function filtrarMinimo(autos) {
    if( datos.minimo ) {
        return autos.precio >= parseInt(datos.minimo);
    }
    return autos;
}
function filtrarMaximo(autos) {
    if( datos.maximo ) {
        return autos.precio <= parseInt(datos.maximo);
    }
    return autos;
}
function filtrarPuertas(autos) {
    if( datos.puertas ) {
        return autos.puertas === parseInt(datos.puertas);
    }
    return autos;
}
function filtrarTransmision(autos) {
    if( datos.transmision ) {
        return autos.transmision === datos.transmision;
    }
    return autos;
}
function filtrarColor(autos) {
    if( datos.color ) {
        return autos.color === datos.color;
    }
    return autos;
}
function limpiarHtml() {
    resultado.innerHTML = '';
}
function mostrarError() {
    const p = document.createElement('P');

    p.textContent = "No se encontraron resultados con esas especificaciones";
    p.classList.add('error');

    resultado.appendChild(p);
}