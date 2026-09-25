/* CARRUSEL */

const titulos = document.querySelectorAll('.titulo'); /* cambio de título */
const imagen = document.querySelector('figure img'); /* cambio de GIF */
const enlace = document.querySelector('figure a'); /* cambio de links */
const sig = document.querySelector('#next'); /* selector de botones para cambiar */
const ant = document.querySelector('#prev');

const carrusel = [
    'assets/carrusel-motiongraphics.gif',
    'assets/carrusel-diseno.gif',
    'assets/carrusel-editorial.gif',
    'assets/carrusel-about.gif',
];

const link = [
    'sites/pf-motion.html',
    'sites/pf-diseno.html',
    'sites/pf-editorial.html',
    'sites/about.html',
]

let indice = 0;

function actualizarTitulos() {
    titulos.forEach((titulo, i) => {
        if (i === indice) {
            titulo.classList.add('activo');
        } else {
            titulo.classList.remove('activo');
        }
    });
};

actualizarTitulos();

function carruselSig() {
    indice++;
    if (indice >= carrusel.length) {
        indice = 0;
    }
    imagen.src = carrusel[indice];
    enlace.href = link[indice];
    actualizarTitulos();
};

function carruselAnt() {
    indice--;
    if (indice < 0) {
        indice = carrusel.length - 1;
    }
    imagen.src = carrusel[indice];
    enlace.href = link[indice];
    actualizarTitulos();
}

sig.addEventListener('click', () => {
    carruselSig();
});

ant.addEventListener('click', () => {
    carruselAnt();
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        carruselSig();
    }
    else {
        if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
            carruselAnt();
        }
        else {
            if (e.key === 'Enter' || e.key === ' ')
                enlace.click();
        }
    }
});


/* INTERACTIVIDAD DEL HEADER*/


titulos.forEach((titulo, posicion) => {
    titulo.addEventListener('click', () => {
        if (titulo.classList.contains('activo')) {
            window.location.href = enlace.href;
        } else {
            cambiarCart(posicion);
        }
    });
});

function cambiarCart(nuevoIndice) {
    indice = nuevoIndice;
    imagen.src = carrusel[indice];
    enlace.href = link[indice];
    actualizarTitulos();
}

/* SCROLL PARA MOVER EL CARRUSEL */

let scrollBloqueado = false;


function bloquearScrollTemporalmente() {
    scrollBloqueado = true;
    setTimeout(() => {
        scrollBloqueado = false;
    }, 100);
}

document.addEventListener('wheel', (e) => {

    if (scrollBloqueado) return;

    if (e.deltaY > 0) {
        carruselSig();
        bloquearScrollTemporalmente();
    } else if (e.deltaY < 0) {
        carruselAnt();
        bloquearScrollTemporalmente();
    }
});