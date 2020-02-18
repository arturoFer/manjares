(function () {
    document.getElementById("btn-nav").addEventListener("click", handleMenu);
    document.addEventListener("click", closeMenu);
    document.getElementById("wrapper_cookies").setAttribute("class", "hidden");

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