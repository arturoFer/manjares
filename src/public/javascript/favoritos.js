(function () {

    var favoritos = null;
    var numPages = 0;
    var page = 1;
    var resto = 0;
    var ocultos = false;
    var numRecetas = 0;
    var titles = null;

    document.getElementById("favoritos").classList.add("active");

    document.getElementById("btn-nav").addEventListener("click", handleMenu);
    document.addEventListener("click", closeMenu);
    document.getElementById("previous").addEventListener("click", onClickPrevious);
    document.getElementById("next").addEventListener("click", onClickNext);
    
    if (!sessionStorage.getItem("cookiesAceptadas")) {
        document.getElementById("close_cookies").addEventListener("click", onClickCookies);
    }
    else {
        handleCookies();
    }
    loadData();

    function handleCookies() {
        document.getElementById("wrapper_cookies").setAttribute("class", "hidden");
        document.getElementById("main-nav").setAttribute("class", "sincookies");
        document.getElementById("btn-nav").setAttribute("class", "sincookies");
        document.getElementById("page").getElementsByTagName("h2")[0].setAttribute("class", "sincookies");
        document.getElementById("top").setAttribute("class", "sincookies");
        document.getElementById("sinFavoritos").setAttribute("class", "sincookies");
    }

    function onClickCookies(e) {
        handleCookies();
        sessionStorage.setItem("cookiesAceptadas", "true");
        if (localStorage.getItem("favoritos")) {
            document.getElementById("sinFavoritos").setAttribute("class", "hidden");
        }
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

    function loadData() {
        var sinFavoritos = document.getElementById("sinFavoritos");
        var article = document.getElementsByTagName("article");

        var store = localStorage.getItem("favoritos");
        if (store) {
            if (article[0].getAttribute("class")) {
                article[0].removeAttribute("class");
            }

            sinFavoritos.setAttribute("class", "hidden");

            store = "[" + store.slice(1, -1) + "]";
            favoritos = JSON.parse(store);
            numRecetas = favoritos.length;
            numPages = Math.floor(numRecetas / 15);
            resto = favoritos.length % 15;
            if (resto) {
                numPages += 1;
            }
            getTitles(true);
        }
        else {
            getTitles(false);
            article[0].setAttribute("class", "hidden");
            sinFavoritos.classList.remove("hidden");
            document.getElementById("paginador").setAttribute("class", "hidden");
        }
    }

    function getTitles(favorites) {
        var store = sessionStorage.getItem("titles");
        if (store) {
            titles = JSON.parse(sessionStorage.getItem("titles"));
            arreglaLinkReceta();
            if (favorites) {
                actualizaDom();
            }
        }
        else {
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        titles = JSON.parse(xhr.responseText);
                        sessionStorage.setItem("titles", JSON.stringify(titles));
                        arreglaLinkReceta();
                        if (favorites) {
                            actualizaDom();
                        }
                    }
                    else {
                        alert("Fallo petición Ajax\nCódigo error: " + xhr.status + "\n" + xhr.statusText);
                    }
                }
            };
            xhr.open("GET", "/titles", true);
            xhr.send();
        }
    }

    function arreglaLinkReceta() {
        var indice = titles.length;
        var url = "/receta/" + indice;
        url = escapeHtml(url);
        document.getElementById("menuRece").href = url;
    }

    function actualizaDom() {
        var next = document.getElementById("next");
        var previous = document.getElementById("previous");
        var paginador = document.getElementById("paginador");
        page = parseInt(page);
        if (numPages === 1) {
            paginador.setAttribute("class", "hidden");
        } else if (page === 1 && numPages) {
            if (paginador.getAttribute("class")) {
                paginador.removeAttribute("class");
            }
            previous.disabled = true;
            previous.setAttribute("class", "disabled");
            next.disabled = false;
            next.removeAttribute("class");
        } else if (page === numPages) {
            if (paginador.getAttribute("class")) {
                paginador.removeAttribute("class");
            }
            next.disabled = true;
            next.setAttribute("class", "disabled");
            previous.disabled = false;
            previous.removeAttribute("class");
        } else {
            if (paginador.getAttribute("class")) {
                paginador.removeAttribute("class");
            }
            if (next.disabled === true) {
                next.disabled = false;
                next.removeAttribute("class");
            }
            if (previous.disabled === true) {
                previous.disabled = false;
                previous.removeAttribute("class");
            }
        }

        if (page === numPages && resto) {
            reescribeyoculta();
            ocultos = true;
        }
        else {
            if (ocultos) {
                reescribeTodos(true);
                ocultos = false;
            }
            else {
                reescribeTodos(false);
            }
        }
        var parrafPagin = paginador.getElementsByTagName("p");
        parrafPagin[0].textContent = "Página " + page + " de " + numPages;
    }

    function onClickPrevious(e) {
        e.stopPropagation();
        page = parseInt(page);
        page = page - 1;
        actualizaDom();
    }

    function onClickNext(e) {
        e.stopPropagation();
        page = parseInt(page);
        page = page + 1;
        actualizaDom();
    }

    function reescribeTodos(ocultos) {
        var items = document.getElementsByClassName("item");
        var z = numRecetas - (page - 1) * 15;
        for (var i = 0; i < 15; i++) {
            var receta = favoritos[z - 1];
            if (ocultos) {
                items[i].className = "item";
            }
            items[i].children[0].href = "/receta/" + receta;
            items[i].children[0].children[0].alt = "Foto receta " + receta;
            items[i].children[0].children[0].src = "img/" + receta + ".jpg";
            items[i].children[0].children[1].textContent = titles[receta - 1];
            z--;
        }
    }

    function reescribeyoculta() {
        var items = document.getElementsByClassName("item");
        var z = numRecetas - (page - 1) * 15;
        for (var i = 0; i < 15; i++) {
            if (i >= resto) {
                items[i].className += " hidden";
                continue;
            }
            var receta = favoritos[z - 1];
            items[i].children[0].href = "/receta/" + receta;
            items[i].children[0].children[0].alt = "Foto receta " + receta;
            items[i].children[0].children[0].src = "img/" + receta + ".jpg";
            items[i].children[0].children[1].textContent = titles[receta - 1];
            z--;
        }
    }

    function escapeHtml(text) {
        var map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        };
        return text.replace(/[&<>"']/g, function (m) { return map[m]; });
    }
}());