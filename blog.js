const items = document.getElementsByClassName("pastel");
if (items) {
    for (let i = 0; i < items.length; i++) {
        items[i].addEventListener("click", function() {
            const content = items[i].innerHTML;
            const name = items[i].getAttribute("id");
            localStorage.setItem("id", name);
            localStorage.setItem(name, content);
            window.location.href = "recetas.html";
        });
    }
}

