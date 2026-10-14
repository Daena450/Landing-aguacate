// Esperar a que cargue la página
document.addEventListener('DOMContentLoaded', () => {
  console.log("JavaScript cargado correctamente");
  
  // Manejo del formulario de suscripción
  const form = document.querySelector('#suscribete form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      alert("Gracias por suscribirte a Avocat 🍃");
      form.reset();
    });
  }

  // Conectar todos los botones "Agregar al carrito"
  const botonesAgregar = document.querySelectorAll('.agregar-carrito');
  console.log("Botones encontrados:", botonesAgregar.length);
  
  botonesAgregar.forEach((boton, index) => {
    boton.addEventListener('click', (e) => {
      e.preventDefault();
      console.log("Botón clickeado:", index + 1);
      agregarAlCarrito(index + 1);
    });
  });
});

// Datos de productos que coinciden exactamente con tu HTML
const productos = [
  {
    id: 1,
    nombre: "Aguacate Hass Premium",
    precio: 89,
    imagen: "images/aguacate hass premium.jpg"
  },
  {
    id: 2,
    nombre: "Aguacate Fuerte Orgánico",
    precio: 75,
    imagen: "images/aguacate fuerte organico.jpg"
  },
  {
    id: 3,
    nombre: "Aguacate Bacon",
    precio: 68,
    imagen: "images/aguacate bacon.jpg"
  }
];

// Array del carrito
const carrito = [];

// Función para agregar productos al carrito
function agregarAlCarrito(id) {
  console.log("Agregando producto ID:", id);
  
  const producto = productos.find(p => p.id === id);
  if (!producto) {
    console.error("Producto no encontrado");
    return;
  }
  
  const existente = carrito.find(p => p.id === id);
  
  if (existente) {
    existente.cantidad++;
    console.log("Cantidad aumentada:", existente.cantidad);
  } else {
    carrito.push({ ...producto, cantidad: 1 });
    console.log("Producto agregado:", producto.nombre);
  }
  
  actualizarCarrito();
  mostrarCarrito();
  
  // Notificación visual
}

// Función para actualizar la vista del carrito
function actualizarCarrito() {
  const lista = document.getElementById("cart-items");
  const totalSpan = document.getElementById("cart-total");
  
  if (!lista || !totalSpan) {
    console.error("Elementos del carrito no encontrados");
    return;
  }
  
  // Limpiar lista
  lista.innerHTML = "";
  
  // Agregar cada item
  carrito.forEach((item, index) => {
    const li = document.createElement("li");
    li.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center");
    li.innerHTML = `
      <div>
        <strong>${item.nombre}</strong><br>
        <small>Cantidad: ${item.cantidad}</small>
      </div>
      <div class="text-end">
        <div class="fw-bold text-success">$${item.precio * item.cantidad} MXN</div>
        <button class="btn btn-sm btn-outline-danger mt-1" onclick="eliminarDelCarrito(${index})">
          <i class="bi bi-trash"></i> Quitar
        </button>
      </div>
    `;
    lista.appendChild(li);
  });
  
  // Calcular y mostrar total
  const total = carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
  totalSpan.textContent = `$${total}`;
  
  console.log("Carrito actualizado. Total:", total);
}

// Función para eliminar un producto del carrito
function eliminarDelCarrito(index) {
  const producto = carrito[index];
  console.log("Eliminando:", producto.nombre);
  
  carrito.splice(index, 1);
  actualizarCarrito();
  
  // Si el carrito está vacío, ocultarlo
  if (carrito.length === 0) {
    ocultarCarrito();
  }
  
}

// Función para vaciar todo el carrito
function clearCart() {
  carrito.length = 0;
  actualizarCarrito();
  ocultarCarrito();
  alert("Carrito vaciado 🗑️");
}

// Función para mostrar el carrito
function mostrarCarrito() {
  const carritoDiv = document.getElementById('cart');
  if (carritoDiv) {
    carritoDiv.style.display = 'block';
    console.log("Carrito mostrado");
  }
}

// Función para ocultar el carrito
function ocultarCarrito() {
  const carritoDiv = document.getElementById('cart');
  if (carritoDiv) {
    carritoDiv.style.display = 'none';
    console.log("Carrito ocultado");
  }
}

// Función para alternar visibilidad del carrito
function toggleCart(mostrar) {
  const carritoDiv = document.getElementById('cart');
  if (carritoDiv) {
    carritoDiv.style.display = mostrar ? 'block' : 'none';
  }
}