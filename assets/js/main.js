let ArrUnidadesMedidaFiltrado = [];
// llamada a la API
async function getMonedas(){
   try{
    const res = await fetch("https://mindicador.cl/api")
    const data = await res.json()
    return data;
   }catch (error){
    throw new  Error("Api no funciona");
   }
  }

  document.addEventListener("DOMContentLoaded", function(){
   async function crearSelectMonedas(){
    try{
        const data = await getMonedas();
        
        // OBTENGO LOS VALORES DE LA UNIDAD DE MEDIDA
        const ArrUnidadesMedida = Object.values(data).map((obj) => {
                return {
                    moneda: obj.nombre,
                    valor: obj.valor,
                    fecha: obj.fecha,
                }
            });

    // Filtrar elementos undefined
       ArrUnidadesMedidaFiltrado  = ArrUnidadesMedida.filter((element) => {
        return element.moneda !== undefined && 
        element.valor !== undefined && 
        element.fecha !== undefined;
      });

      const selectMoneda = document.getElementById("moneda");
      selectMoneda.innerHTML = "";

      const defaultOption = document.createElement("option");
      defaultOption.value = "select";
      defaultOption.text = "Seleccione moneda";
      selectMoneda.appendChild(defaultOption);

      ArrUnidadesMedidaFiltrado.forEach((element) => {
        const option = document.createElement("option");
        option.value = element.moneda;
        option.text = element.moneda;
        selectMoneda.appendChild(option);
      });
    //   console.log(ArrUnidadesMedidaFiltrado);
    }catch{
        // manejo de errores
    }
   }

   crearSelectMonedas();
});

async function ObtieneValorMoneda(){

}

async function convertirMoneda(){
    const cantidadInput = document.getElementById('cantidad');
    const selectInput = document.getElementById('moneda').value;
    // const result = document.getElementById('resultado');

    const cantidad = parseFloat(cantidadInput.value);

    if(!cantidad){
        alert("debe seleccionar la cantidad");
        return;
    }

    if(selectInput === 'select'){
        alert("debe seleccionar la moneda");
    }

    if(cantidad <= 0){
        alert("No se harán cálculos menores o iguales a 0");
    }


    try{

    const ArrValorMoneda = ArrUnidadesMedidaFiltrado.map(element => {
        return {
            moneda : element.moneda,
            valor: element.valor,
        }
    });

    const EncuentroMoneda = ArrValorMoneda.find(objeto => objeto.moneda === selectInput);

    // console.log(EncuentroMoneda);

    if (EncuentroMoneda) {
        const valorSeleccionado = EncuentroMoneda.valor;
        const calculado = cantidad / valorSeleccionado
        const calculado2TF = calculado.toFixed(2);

        document.getElementById("result").innerHTML = "La conversión final es de: " + calculado2TF + " " + EncuentroMoneda.moneda;
    } else {
        // No se encontró el valor seleccionado en el array
    }



    }catch (error){
        console.log();
     throw new  Error("Error al convertir la mondeda");
    }

 
}

window.onload = function() {
    const cantidadInput = document.getElementById("cantidad");
    cantidadInput.value = ""; 
  };
