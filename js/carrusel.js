// ============ CARRUSEL ============

let indiceActual = 0;

function actualizarCarrusel() {
    const track = document.getElementById('carruselTrack');
    const dots = document.querySelectorAll('.dot');

    track.style.transform = `translateX(-${indiceActual * 100}%)`;

    dots.forEach((dot, i) => {
        dot.classList.toggle('activo', i === indiceActual);
    });
}

function moverCarrusel(direccion) {
    const slides = document.querySelectorAll('.carrusel-slide');
    indiceActual = (indiceActual + direccion + slides.length) % slides.length;
    actualizarCarrusel();
}

function irASlide(index) {
    indiceActual = index;
    actualizarCarrusel();
}

// Autoplay cada 4 segundos
setInterval(() => moverCarrusel(1), 3000);
