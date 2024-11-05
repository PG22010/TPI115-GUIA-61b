var fila = "<tr><td class='id'></td><td class='foto'></td><td class='price'></td><td class='title'></td><td class='description'></td><td class='category'></td></tr>";
var productos = null;

function codigoCat(catstr) {
    switch (catstr) {
        case "electronics":
            return "c1";
        case "jewelery":
            return "c2";
        case "men's clothing":
            return "c3";
        case "women's clothing":
            return "c4";
        default:
            return "null";
    }
}

var orden = 0;

function listarProductos(productos) {
    var precio = document.getElementById("price");
    precio.onclick = function () {
        orden *= -1;
        listarProductos(productos);
    };
    var num = productos.length;
    var listado = document.getElementById("listado");
    var tbody = document.getElementById("tbody");
    tbody.innerHTML = "";

    productos.forEach(() => tbody.innerHTML += fila);

    var ids = document.getElementsByClassName("id");
    var titles = document.getElementsByClassName("title");
    var descriptions = document.getElementsByClassName("description");
    var categories = document.getElementsByClassName("category");
    var fotos = document.getElementsByClassName("foto");
    var prices = document.getElementsByClassName("price");

    if (orden === 0) {
        orden = -1;
        precio.innerHTML = "Precio";
    } else if (orden === 1) {
        ordenarAsc(productos, "price");
        precio.innerHTML = "Precio A";
        precio.style.color = "darkgreen";
    } else if (orden === -1) {
        ordenarDesc(productos, "price");
        precio.innerHTML = "Precio D";
        precio.style.color = "blue";
    }

    listado.style.display = "block";
    productos.forEach((producto, index) => {
        ids[index].innerHTML = producto.id;
        titles[index].innerHTML = producto.title;
        descriptions[index].innerHTML = producto.description;
        categories[index].innerHTML = producto.category;
        var catcode = codigoCat(producto.category);
        var tr = categories[index].parentElement;
        tr.setAttribute("class", catcode);
        prices[index].innerHTML = "$" + producto.price;
        fotos[index].innerHTML = `<img src='${producto.image}' alt='${producto.title}' style='cursor: pointer;'>`;
        fotos[index].firstChild.onclick = function () {
            window.open(producto.image);
        };
    });
}

function obtenerProductos() {
    fetch('https://fakestoreapi.com/products')
        .then(res => res.json())
        .then(data => {
            productos = data;
            listarProductos(data);
        })
        .catch(error => console.error('Error al obtener productos:', error));
}

function ordenarDesc(p_array_json, p_key) {
    p_array_json.sort((a, b) => b[p_key] - a[p_key]);
}

function ordenarAsc(p_array_json, p_key) {
    p_array_json.sort((a, b) => a[p_key] - b[p_key]);
}
