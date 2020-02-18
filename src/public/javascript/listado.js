(function() {
    document.getElementById("listado").classList.add("active");

    document.getElementById("btn-nav").addEventListener("click", handleMenu);
    document.addEventListener("click", closeMenu);
    
    if (!sessionStorage.getItem("cookiesAceptadas")) {
        document.getElementById("close_cookies").addEventListener("click", onClickCookies);
    }
    else {
        handleCookies();
    }
    
    handleLazyload();

    function handleLazyload(){
        const images = document.querySelectorAll('[data-src]');
        const config = {
            rootMargin: '0px 0px 128px 0px'
        }
        let observer = new IntersectionObserver((entries, self) => {
            entries.forEach(entry => {
                if(entry.isIntersecting){
                    preloadImage(entry.target);
                    self.unobserve(entry.target);
                }
            });
        }, config);

        images.forEach(image => {
            observer.observe(image);
        });
    }

    function preloadImage(img){
        const src = img.getAttribute('data-src');
        if(!src) return;
        img.src =src;
    }

    function handleCookies() {
        document.getElementById("wrapper_cookies").setAttribute("class", "hidden");
        document.getElementById("main-nav").setAttribute("class", "sincookies");
        document.getElementById("btn-nav").setAttribute("class", "sincookies");
        document.getElementById("page").getElementsByTagName("h2")[0].setAttribute("class", "sincookies");
        document.getElementById("top").setAttribute("class", "sincookies");
    }

    function onClickCookies(e) {
        handleCookies();
        sessionStorage.setItem("cookiesAceptadas", "true");
        e.stopPropagation();
    }

    function handleMenu(e) {
        var menu = document.getElementById("menu");
        var clase = menu.getAttribute("class");
        if (!clase) {
            menu.setAttribute("class", "desplegado");
        }
        else {
            menu.removeAttribute("class");
        }
        e.stopPropagation();
    }

    function closeMenu() {
        var menu = document.getElementById("menu");
        if (menu.getAttribute("class")) {
            menu.removeAttribute("class");
        }
    }
}());