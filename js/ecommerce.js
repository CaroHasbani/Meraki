class Ecommerce {
    
    constructor() {
        this.planes=[];
        this.carrito=[];
        this.total=0;
        this.cantidad=0;
    }

    armoPlanes() {
        //Llamo AJAX
        $.get('planes.json' , function(response, state){
            this.planes= response;
            localStorage.ajax = JSON.stringify(response); 
        });
    }
    llenarPlan(){
        this.planes = JSON.parse(localStorage.ajax);
    }

    mostrarCards() {
        //Muestro en el html las cards de los planes que tengo disponibles
        let acumular = ``;
        this.planes.forEach(plan => {
            acumular += `
            <div class="col-lg-4 col-md-6 col-sm-6">
                <div class="planes__item hotPlanes__item">
                    <div class="planes__item__pic">
                        <img src="images/Choosing clothes-amico.svg" alt="dibujo de ropa" >
                    </div>
                    <div class="planes__item__text">
                    <h4>${plan.nombre}</h4>
                        <p> Incluye</p>
                        <div class="price">${plan.precio}</div>
                        <div class="btn"><button data-idplan="${plan.id}" class="btn-agregar-carrito">¡Lo quiero!</button></div>
                    </div>
                </div>
            </div>
            `
        });

        document.getElementById("planes").innerHTML = acumular;
       
        this.cargarBotones()
    }

    cargarBotones() {
        //Identifica que boton toca para poder cargalo en el carrito
        const arrayDeBotones = Array.from(document.getElementsByClassName('btn-agregar-carrito')) // Conversion Array
        arrayDeBotones.forEach(boton => {
            boton.onclick = (event) => {
                const responsableID = event.target.getAttribute("data-idplan");
                // console.log(responsableID);
                this.agregarAlCarrito(responsableID)
            }
        })

    }

    agregarAlCarrito(id) {
        let existente=this.carrito.findIndex(element =>element.id==id)
        if(existente==-1){
            const productoAAgregar = this.planes.find(plan=>{
                return plan.id == id;
            }); // 1
            this.carrito.push(productoAAgregar); 
        }
        else{
            alert("No se puede seleccionar el mismo plan mas de una vez")

        }
        // Total del carrito
        let total = 0;
        this.carrito.forEach(plan=> {
            total += parseInt(plan.precio);
        });
        this.total=total;
        this.cantidad=this.carrito.length;
        // localStorage
        localStorage.total = JSON.stringify(this.total);
        localStorage.cantidad = JSON.stringify(this.cantidad); 
        localStorage.producto = JSON.stringify(this.carrito);
    }
}

