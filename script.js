let input = document.getElementById('inp');
let select = document.getElementById('selector');
let boton = document.getElementById('buscar');
let div = document.getElementById('resul');
let parrafo = document.getElementById('sinop');

let arch = 'peliculas.json';

select.addEventListener('change', mM);
input.addEventListener('keydown', limitar);
boton.addEventListener('click', busqueda);

function mM() {
    arch = select.value;
    alert("El archivo seleccionado es: " + arch);
}

function limitar(evento) {
    const teclaPermitida = /^[A-Za-z\s]$/;
    if (!teclaPermitida.test(evento.key) && evento.key !== 'Backspace') {
        evento.preventDefault();
    }
}

function busqueda() {
    div.innerHTML = '';
    
    fetch(arch)
        .then(res => res.json())
        .then(function (salida) {
            salida.data.forEach(i => {
                if (i.nombre.toUpperCase().startsWith(input.value.toUpperCase())) {
                    let nuevoDiv = document.createElement('div');
                    nuevoDiv.textContent = i.nombre;

                    nuevoDiv.addEventListener('mouseover', function() {
                        parrafo.style.display = "block";
                        parrafo.textContent = i.sinopsis;
                    });

                    nuevoDiv.addEventListener('mouseout', function() {
                        parrafo.style.display = "none";
                    });

                    div.appendChild(nuevoDiv);
                }
            });
        })
        .catch(error => {
            console.error('Error al obtener los datos:', error);
        });
}
