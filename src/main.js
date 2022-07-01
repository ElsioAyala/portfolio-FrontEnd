/** Seccion sticky */
const load = () => {
let sticky = document.querySelector(".sticky");
let ubicacionPrincipal = window.pageYOffset;
console.log(sticky);
let control = null;
const margin = 24;
const caja = document.querySelector(".ajuste");
const pdt = sticky.getBoundingClientRect().top;

if (sticky.clientHeight <= screen.height - 224){
    sticky.style.top = "248px";
}else{
    window.addEventListener('scroll', () =>{
        let altura = sticky.clientHeight - window.innerHeight + margin;
        let desplazamientoActual = window.pageYOffset;
        if(ubicacionPrincipal >= desplazamientoActual){
            /*Subir*/ 
            sticky.style.top = "unset";
            if(control !== 1){
                caja.style.height = `${desplazamientoActual - altura - pdt}px`;
                control = 1;
            }
            sticky.style.bottom = `-${altura + 224}px`;
        }else{
            /**Bajar */
            caja.style.height = "0px";
            if (Math.sign(altura) === -1) sticky.style.top = `${Math.abs(altura)}px`;
            else sticky.style.top = `-${altura}px`;
            
            control = 0;
            sticky.style.bottom = "unset";
        }
        ubicacionPrincipal = desplazamientoActual;
    })
}

/** Destectar los enlaces del menu activo */

const btnMenu = document.querySelector('.navbar-toggler');
const menuLinks = document.querySelectorAll('.navbar-nav .nav-link');
const show = document.getElementById('navbarSupportedContent');

const observer = new IntersectionObserver((entris) => {
    entris.forEach( entry => {
        const id = entry.target.getAttribute('id');
        const menuLink1 = document.querySelector(`.navbar-nav .nav-link[href="#${id}"]`);
        const menuLink2 = document.querySelector(`.nav-column .nav-link[href="#${id}"]`);
        
        if(entry.isIntersecting) {
            document.querySelector('.navbar-nav .nav-link.active').classList.remove('active');
            document.querySelector('.nav-column .nav-link.active').classList.remove('active');
            menuLink1.classList.add("active");
            menuLink2.classList.add("active");
        }
    })
}, {rootMargin: "-50% 0px -50% 0px"});

menuLinks.forEach(menuLink => {
    menuLink.addEventListener('click', () =>{
        btnMenu.setAttribute('aria-expanded', "false");
        btnMenu.classList.add('collapsed');
        show.classList.remove('show');
    })
    const hash = menuLink.getAttribute("href");
    const target = document.querySelector(hash);
    if (target) observer.observe(target);
})

var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl)
})

}



window.onload = load;