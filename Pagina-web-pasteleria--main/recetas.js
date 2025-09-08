(function init() {
    const id = localStorage.getItem("id"); // ✅ MANTIENE localStorage para comunicación
    if (id) {
        // Buscar el div oculto en recetas.html
        const recetaDiv = document.getElementById(id);
        if (recetaDiv) {
            document.getElementById("receta").innerHTML = recetaDiv.innerHTML;
        } else {
            document.getElementById("receta").innerHTML = `
                <div class="container mt-5 text-center">
                    <h2>Receta no encontrada</h2>
                    <p>Esta receta aún no está disponible.</p>
                    <a href="blog.html" class="btn btn-primary">Volver al Blog</a>
                </div>
            `;
        }
    } else {
        window.location.href = "blog.html";
    }
})();