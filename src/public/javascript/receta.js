(function(){
    var numRecetas = 144;
    var receta = null;

    document.getElementById("receta").classList.add("active");

    document.getElementById("btn-nav").addEventListener("click", handleMenu);
    document.addEventListener("click", closeMenu);
    document.getElementById("azar").addEventListener("click", onAzar);
    document.getElementById("next").addEventListener("click", onNext);
    document.getElementById("previous").addEventListener("click", onPrev);
    document.getElementById("fav").addEventListener("click", onFav);

    if(!sessionStorage.getItem("cookiesAceptadas")){
        document.getElementById("close_cookies").addEventListener("click", onClickCookies);
    }
    else{
        handleCookies();
    }

    receta = window.location.pathname.slice(8);
    
    handleStatusPrevNext();
    handleContador();

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

    function handleContador(){
        document.getElementById("contadorRecetas").textContent = "Receta " + receta + " de " + numRecetas;
        if(checkFavorite()){
            document.getElementById("fav").setAttribute("class", "favtrue");
        }
        else{
            document.getElementById("fav").removeAttribute("class");
        }
    }

    function onAzar(e){
        e.stopPropagation();
        var aleatorio = Math.floor((Math.random()*numRecetas) + 1 );
        window.location.pathname="/receta/" + aleatorio;
    }

    function onNext(e){
        e.stopPropagation();
        receta = parseInt(receta);
        receta = receta + 1;
        window.location.pathname = "/receta/" + receta;
    }

    function onPrev(e){
        e.stopPropagation();
        receta = parseInt(receta);
        receta = receta - 1;
        window.location.pathname = "/receta/" + receta;
    }

    function handleStatusPrevNext(){
        var recetaLocal = parseInt(receta);
        var numRecetasLocal = parseInt(numRecetas);
        
        var next = document.getElementById("next");
        var previous = document.getElementById("previous");
        if(recetaLocal === 1){
            previous.disabled = true;
            previous.setAttribute("class","disabled");
            next.disabled = false;
            next.removeAttribute("class");
        } else if(recetaLocal === numRecetasLocal){
            next.disabled = true;
            next.setAttribute("class", "disabled");
            previous.disabled = false;
            previous.removeAttribute("class");
        } else{
            if(next.disabled === true){
                next.disabled = false;
                next.removeAttribute("class");
            }
            if(previous.disabled === true){
                previous.disabled = false;
                previous.removeAttribute("class");
            }
        }
    }

    function onFav(e){
        e.stopPropagation();
        var recetaLocal = parseInt(receta);
        var storable = recetaLocal + ",";
        var store = localStorage.getItem("favoritos");
        
        if(store){
            var index = store.indexOf("," + storable);
            if(index === -1){
                store += storable;
                localStorage.setItem("favoritos", store);
                this.setAttribute("class", "favtrue");
            }
            else{
                store = store.replace("," + storable, ",");
                if(store === ","){
                    store = "";
                }
                localStorage.setItem("favoritos", store);
                this.removeAttribute("class");
            }
        }
        else{
            storable = "," + storable;
            localStorage.setItem("favoritos", storable);
            this.setAttribute("class", "favtrue");
        }
    }

    function checkFavorite(){
        var recetaLocal = parseInt(receta);
        var store = localStorage.getItem("favoritos");
        var storable = "," + recetaLocal + ",";
        if(store){
            var index = store.indexOf(storable);
            if(index === -1){
                return false;
            }
            else{
                return true;
            }
        }
        else{
            return false;
        }
    }
}());