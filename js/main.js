const Alquilario = new Ecommerce();

Alquilario.armoPlanes();
Alquilario.llenarPlan(); 
Alquilario.mostrarCards();

// me fijo si hay algo guardado
if(localStorage.producto){
   Alquilario.carrito = JSON.parse(localStorage.producto);
}