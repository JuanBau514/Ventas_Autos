let menuIcon = document.getElementById('menu-iconos');
let navbar = document.querySelector('.navbar');
let barraMenu = document.getElementById('barra-menu');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
    barraMenu.classList.toggle('active');
};

window.onscroll = () => {
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
    barraMenu.classList.remove('active');
}


// ...

// Obtén todos los enlaces dentro de la barra de navegación
const navLinks = document.querySelectorAll('.navbar a');

// Función para cerrar el menú
function closeMenu() {
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
    barraMenu.classList.remove('active');
}

// Agrega un controlador de clic a cada enlace para cerrar el menú
navLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
});

// ...
