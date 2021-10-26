const Alquilario = new Ecommerce();
// Verifico si tengo algo en el local storage y lo recupero
if(localStorage.producto){
   Alquilario.carrito = JSON.parse(localStorage.producto);
   Alquilario.total= JSON.parse(localStorage.total);
   Alquilario.cantidad=JSON.parse(localStorage.cantidad);
}
// Muestro las cards de los productos que agregue al carrito
function mostrarCardsCarrito(){
   let acumular = ``;
   if( Alquilario.carrito.length>0){
       Alquilario.carrito=Array.from( Alquilario.carrito)
      Alquilario.carrito.forEach(item => {
          acumular += `<div class="agregados" >
               <h2>${item.nombre}</h2>
               <h2>${item.precio}</h2>
               <button data-iditem="${item.id}" class="btn-sacar-carrito">Quitar del carrito</button>
           </div>`
      });
      $('#clear').html('<button id="btnJQuery">Vaciar carrito</button>')
      $("#btnJQuery").click(vaciarCarrito)
      //Escribo en el html el total y la cantidad de elementos 
      document.getElementById("cantidad").innerHTML ="Cantidad de planes seleccionados: "+  Alquilario.cantidad;
      document.getElementById("total").innerHTML =  "$"+ Alquilario.total
   }
   else{
      console.log("no hay nada ")
           document.getElementById("cantidad").innerHTML ="No hay seleccionado ningun plan "
           document.getElementById("total").innerHTML =  ""
           $('#clear').html('')
   } ;
   document.getElementById("itemCarrito").innerHTML = acumular;
   this.cargarBotonesQuitar()
}
mostrarCardsCarrito()

// funcion para sacar uno por uno los productos elegidos
function quitarDelCarrito(id){
   const productoAQuitar = Alquilario.carrito.findIndex(item=>{ // guardado is not defined
      return item.id == id;
  }); 
    Alquilario.carrito.splice(productoAQuitar,1);
    localStorage.producto=JSON.stringify(Alquilario.carrito)
    let total=0
    Alquilario.carrito.forEach(item=> {
        total += item.precio
    });
    Alquilario.total=total
    Alquilario.cantidad=Alquilario.carrito.length
    localStorage.total = JSON.stringify(Alquilario.total);
    localStorage.cantidad = JSON.stringify(Alquilario.cantidad); 
    mostrarCardsCarrito()
}
function cargarBotonesQuitar() {
   //Identifica que boton toca para poder sacarlo del  carrito
   const arrayDeBotones = Array.from(document.getElementsByClassName('btn-sacar-carrito')) // Conversion Array
   arrayDeBotones.forEach(boton => {
       boton.onclick = (event) => {
           const responsableID = event.target.getAttribute("data-iditem");
           quitarDelCarrito(responsableID)
       }
   })
}
//vacio TODO el carrito y el storage
 function vaciarCarrito(){
   localStorage.total =0;
   localStorage.cantidad=0;
   localStorage.producto=[];
   Alquilario.total=0;
   Alquilario.cantidad=0;
   Alquilario.carrito=0;
   mostrarCardsCarrito();
 }