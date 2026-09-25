/* MOVIMIENTO ENTRE APARTADOS */
const sig = document.querySelector('#next');
const ant = document.querySelector('#prev');
const site = window.location.href; /* url actual */

const apartados = [
    'pf-motion.html',
    'pf-diseno.html',
    'pf-editorial.html',
    'about.html',
]

let indice = apartados.findIndex(ruta => site.includes(ruta));

function apartadoSig() {
    indice++;
    if (indice >= apartados.length) {
        indice = 0;
    }
    window.location.href = apartados[indice];
}

function apartadoAnt() {
    indice--;
    if (indice < 0) {
        indice = apartados.length - 1;
    }
    window.location.href = apartados[indice];
}

sig.addEventListener('click', () => {
    apartadoSig();
});

ant.addEventListener('click', () => {
    apartadoAnt();
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') {
        apartadoSig();
    } else if (e.key === 'ArrowLeft') {
        apartadoAnt();
    }
})

/* POP UP DE CADA PROYECTO */

const abrir = document.querySelectorAll('.proyecto');
const overlay = document.querySelectorAll('.overlay');
const video = document.querySelectorAll('.overlay video');
const cerrar = document.querySelectorAll('.fondo');

abrir.forEach(proyecto => {
    proyecto.addEventListener('click', function (evento) {
        evento.stopImmediatePropagation();
        
        const overlayEnProyecto = this.querySelector('.overlay');

        const video = overlayEnProyecto ? overlayEnProyecto.querySelector('video') : null;
        const Botonplay = overlayEnProyecto ? overlayEnProyecto.querySelector('.play') : null;

        if (overlayEnProyecto && overlayEnProyecto.classList.contains('oculto')) {
            overlayEnProyecto.classList.remove('oculto');

            const video = overlayEnProyecto.querySelector('video');
            if (video) video.play();
            if (Botonplay) Botonplay.classList.add('ocultar');
        }
    });
});

/* play o pausa del vídeo */

video.forEach(video => {
    const Botonplay = video.parentElement.querySelector('.play');
    const reproducir = () => {
        if (video.paused) {
            video.play();
            if (Botonplay) Botonplay.classList.add('ocultar');
        } else {
            video.pause();
            if (Botonplay) Botonplay.classList.remove('ocultar');
        }
    };
    
    video.addEventListener('click', (e) => {
        e.stopPropagation();
        reproducir();
    });

    if (Botonplay) {
        Botonplay.addEventListener('click', (e) => {
            e.stopPropagation();
            reproducir();
        });
    }
    document.addEventListener('keydown', (e) => {
        if (e.code === 'Space' && !video.closest('.overlay').classList.contains('oculto')) {
            e.preventDefault();
            reproducir();
        }
    });
});

/* para cerrar el modal */

function cerrarModal(modal) {
    modal.classList.add('oculto');
    
    const video = modal.querySelector('video');
    const Botonplay = modal.querySelector('.play');
    if (video) {
        video.pause();
        video.currentTime = 0;
    }
    
    if (Botonplay) {
        Botonplay.classList.add('ocultar');
    }
}
cerrar.forEach(fondo => {
    fondo.addEventListener('click', (e) => {
        e.stopPropagation();

        const modalPadre = fondo.closest('.overlay'); 
        cerrarModal(modalPadre);
    });
    }
);

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const modalAbierto = document.querySelector('.overlay:not(.oculto)');
        if (modalAbierto) {
            cerrarModal(modalAbierto);
        }
    }
});
