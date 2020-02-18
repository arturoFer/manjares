(function(){
    document.getElementById("about").classList.add("active");

    document.getElementById("btn-nav").addEventListener("click", handleMenu);
    document.addEventListener("click", closeMenu);

    if(!sessionStorage.getItem("cookiesAceptadas")){
        document.getElementById("close_cookies").addEventListener("click", onClickCookies);
    }
    else{
        handleCookies();
    }

    function handleCookies(){
        document.getElementById("wrapper_cookies").setAttribute("class", "hidden");
        document.getElementById("main-nav").setAttribute("class", "sincookies");
        document.getElementById("btn-nav").setAttribute("class", "sincookies");
        document.getElementById("page").getElementsByTagName("h2")[0].setAttribute("class", "sincookies");
        document.getElementById("top").setAttribute("class", "sincookies");
    }
    
    function onClickCookies(e){
        handleCookies();
        sessionStorage.setItem("cookiesAceptadas", "true");
        e.stopPropagation();
    }
    
    function handleMenu(e){
        var menu = document.getElementById("menu");
        var clase = menu.getAttribute("class");
        if(!clase){
            menu.setAttribute("class", "desplegado");
        }
        else{
            menu.removeAttribute("class");
        }
        e.stopPropagation();
    }
    
    function closeMenu(){
        var menu = document.getElementById("menu");
        if(menu.getAttribute("class")){
            menu.removeAttribute("class");
        }
    }
}());