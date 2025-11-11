// Carrusel automático para las secciones hero
document.addEventListener('DOMContentLoaded', function() {
    const carousels = document.querySelectorAll('.hero-carousel');

    carousels.forEach(carousel => {
        const images = carousel.querySelectorAll('img');
        let currentIndex = 0;

        // Función para mostrar la siguiente imagen
        function showNextImage() {
            // Remover la clase active de la imagen actual
            images[currentIndex].classList.remove('active');

            // Calcular el siguiente índice
            currentIndex = (currentIndex + 1) % images.length;

            // Agregar la clase active a la nueva imagen
            images[currentIndex].classList.add('active');
        }

        // Iniciar el carrusel automático cada 3 segundos
        setInterval(showNextImage, 3000);
    });
});