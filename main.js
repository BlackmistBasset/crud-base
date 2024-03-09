const tableBody = document.getElementById("tabla-categorias");
const editarModal = document.querySelector(".editar-categoria");
const inputEditarCategoria = document.getElementById("editar_categoria");
const editarCategoria = document.querySelector(".cargar_categoria");
const nuevaCategoriaContenedor = document.getElementById("nueva-categoria");

//Añadir eventos a los botones
const eventosEditarCategoria = (selectorAll) => {
  selectorAll.forEach((currentBtn) => {
    currentBtn.addEventListener("click", () => {
      editarModal.classList.remove("hidden");
      nuevaCategoriaContenedor.classList.add("hidden");
      console.log(obtenerCategoria(categorias, currentBtn.id.slice(7)).nombre);
      inputEditarCategoria.value = obtenerCategoria(
        categorias,
        currentBtn.id.slice(7)
      ).nombre;
      editarCategoria.setAttribute("id", `confirmar-${currentBtn.id.slice(7)}`);
      console.log(currentBtn.id);
    });
  });
};

const eventosEliminarCategoria = (selectorAll) => {
  selectorAll.forEach((currentBtn) => {
    currentBtn.addEventListener("click", () => {
      confirmarEliminarCategoria(
        categorias,
        obtenerCategoria(categorias, currentBtn.id.slice(9)).id
      );
    });
  });
};

//Generar tabla
const cargarTabla = (data) => {
  tableBody.innerHTML = "";
  data.forEach((categoria) => {
    const { descripcion, tipo } = categoria;
    tableBody.innerHTML += `
        <tr>
            <td>${tipo}</td>
            <td>${descripcion}</td>
            <td>
            <i class="far fa-edit boton-editar" id="editar-"></i>
            <i
                class="far fa-trash-alt boton-eliminar"
                id="eliminar-"
            ></i>
            </td>
        </tr>`;
  });

  // eventosEditarCategoria(document.querySelectorAll(".boton-editar"));
  // eventosEliminarCategoria(document.querySelectorAll(".boton-eliminar"));
};

cargarTabla(operaciones);

//Identificar categoría en función del id

const obtenerCategoria = (array, categoryId) =>
  array.find((element) => categoryId === element.id);

//Confirmar editar categoria
const confirmarEditarCategoria = (array, categoriaId) => {
  console.log(categoriaId);
  const categoriasEditadas = array.map((obj) => {
    if (obj.id === categoriaId) {
      return {
        ...obj,
        nombre: inputEditarCategoria.value,
        cambiado: true,
      };
    } else {
      return obj;
    }
  });
  cargarTabla(categoriasEditadas);
};

editarCategoria.addEventListener("click", (e) => {
  e.preventDefault();
  confirmarEditarCategoria(categorias, editarCategoria.id.slice(10));
  editarModal.classList.add("hidden");
});

//cargar categoría
const nuevaCategoria = document.getElementById("crear-nueva-categoria");
const cargarNuevaCategoria = document.getElementById("cargar_nueva_categoria");
const nuevaCategoriaInput = document.getElementById("nueva_categoria_input");

nuevaCategoria.addEventListener("click", () => {
  nuevaCategoriaContenedor.classList.remove("hidden");
  editarModal.classList.add("hidden");
});

// cargarNuevaCategoria.addEventListener("click", (e) => {
//   e.preventDefault();
//   const nuevaCategoriaObj = {
//     id: uuidv4(),
//     nombre: nuevaCategoriaInput.value,
//   };

//   const nuevoArray = [...categorias, nuevaCategoriaObj];
//   categorias = nuevoArray;
//   nuevaCategoriaContenedor.classList.add("hidden");
//   cargarTabla(categorias);
// });

//Eliminar categoría
const confirmarEliminarCategoria = (array, categoriaId) => {
  const arrayFiltrado = array.filter((obj) => obj.id !== categoriaId);
  console.log(arrayFiltrado);

  categorias = arrayFiltrado;

  cargarTabla(categorias);
};

//METODO SORT
const numeritos = [1, 23, 18, 34, 13, 100];
const palabritas = ["perro", "jirafa", "vaca", "gato", "arbol"];

console.log(numeritos.sort());

const numeritosOrdenados = numeritos.sort((a, b) => {
  return b - a;
});

// const operacionesOrdenadas = [...operaciones].sort((a, b) => {
//   return b.descripcion - a.descripcion;
// });

const operacionesOrdenadas = [...operaciones].sort((a, b) => {
  console.log(a.descripcion, b.descripcion);
  b.descripcion.localeCompare(a.descripcion);
});
console.log("operaciones solo", operaciones);

// console.log("ordenadas antes del push:", operacionesOrdenadas);
// console.log(operacionesOrdenadas[12]);
// operacionesOrdenadas.push({ nombre: "test" });
console.log("ordenadas filtradas", operacionesOrdenadas);
//console.log(operacionesOrdenadas[12]);

// FILTRAR POR TIPO
const selectTipoFiltro = document.getElementById("select-filtro-tipo");

const filtrarOperaciones = (tipoOperacion) => {
  console.log(tipoOperacion);
  const operacionesFiltradas = operaciones.filter(
    (operacion) => operacion.tipo.toLowerCase() === tipoOperacion
  );

  cargarTabla(operacionesFiltradas);
};

selectTipoFiltro.addEventListener("change", (e) => {
  filtrarOperaciones(e.target.value);
});

cargarTabla(operacionesOrdenadas);

const prueba = [
  "Compra en el super",
  "Verduras av 28",
  "Carne en a.t",
  "Sueldo enero",
];

console.log(prueba.sort());

const $ = (query) => document.querySelector(query);
const $$ = (query) => document.querySelectorAll(query);

const btn = $("#crear-nueva-categoria");

console.log(btn);

$("#crear-nueva-categoria").innerText = "Cambie el texto";
