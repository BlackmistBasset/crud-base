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
    const { id, nombre } = categoria;
    tableBody.innerHTML += `
        <tr>
            <td>${id}</td>
            <td>${nombre}</td>
            <td>
            <i class="far fa-edit boton-editar" id="editar-${id}"></i>
            <i
                class="far fa-trash-alt boton-eliminar"
                id="eliminar-${id}"
            ></i>
            </td>
        </tr>`;
  });

  eventosEditarCategoria(document.querySelectorAll(".boton-editar"));
  eventosEliminarCategoria(document.querySelectorAll(".boton-eliminar"));
};

cargarTabla(categorias);

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

console.log(cargarNuevaCategoria);
nuevaCategoria.addEventListener("click", () => {
  nuevaCategoriaContenedor.classList.remove("hidden");
  editarModal.classList.add("hidden");
});

cargarNuevaCategoria.addEventListener("click", (e) => {
  e.preventDefault();
  const nuevaCategoriaObj = {
    id: uuidv4(),
    nombre: nuevaCategoriaInput.value,
  };

  const nuevoArray = [...categorias, nuevaCategoriaObj];
  categorias = nuevoArray;
  nuevaCategoriaContenedor.classList.add("hidden");
  cargarTabla(categorias);
});

//Eliminar categoría
const confirmarEliminarCategoria = (array, categoriaId) => {
  const arrayFiltrado = array.filter((obj) => obj.id !== categoriaId);
  console.log(arrayFiltrado);

  categorias = arrayFiltrado;

  cargarTabla(categorias);
};
