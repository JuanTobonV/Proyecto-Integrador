let listaProveedoresAgregados = JSON.parse(localStorage.getItem("storageProveedoresAgregados")) || [];
export let idCounter = listaProveedoresAgregados.length > 0 ? listaProveedoresAgregados[listaProveedoresAgregados.length - 1].id + 1 : 1;

let agregar = document.getElementById('btnAgregar');
let eliminar = document.getElementById('btnEliminar');

agregar.addEventListener("click", function(event){
    
    let numeroIdentificacion = document.getElementById('numeroIdentificacion');
    let nombreProveedor = document.getElementById('nombreProveedor');
    let razonSocial = document.getElementById('razonSocialProveedor');
    let telefonoProveedor = document.getElementById('telefonoProveedor');
    let correoProveedor = document.getElementById('emailProveedor');
    let ciudadProveedor = document.getElementById('ciudadProveedor');
    let selectorProveedor = document.getElementById('selectorProveedor');
    let selectorPolizasActivas = document.getElementById('selector-polizas-activas');
    let selectorPolizasDisponibles = document.getElementById('selector-polizas-disponibles');
    let selectorBeneficios = document.getElementById('selector-beneficios');

    event.preventDefault();

    if(selectorProveedor.value <= "0"){
        alert('Seleccione un proveedor');
        return;
    }

    if(selectorPolizasActivas.value <= "0"){
        alert('Seleccione una poliza activa');
        return;
    }

    if(selectorPolizasDisponibles.value <= "0"){
        alert('Seleccione una póliza disponible');
        return;
    }

    if(selectorBeneficios.value <= "0"){
        alert('Seleccione un beneficio');
        return;
    }

    // Obtener el texto de la opción seleccionada porque no se puede con el .value, debido que según mi lógica, estos son números y el textcontent no se puede usar directamente a options de los selects
    let activaTexto = selectorPolizasActivas.options[selectorPolizasActivas.selectedIndex].textContent;
    let disponibleTexto = selectorPolizasDisponibles.options[selectorPolizasDisponibles.selectedIndex].textContent;
    let beneficioTexto = selectorBeneficios.options[selectorBeneficios.selectedIndex].textContent;

    let proveedorAgregado = {
        id: idCounter++,
        NIT: numeroIdentificacion.value,
        nombre: nombreProveedor.value,
        razon: razonSocial.value,
        telefono: telefonoProveedor.value,
        correo: correoProveedor.value,
        ciudad: ciudadProveedor.value,
        proveedor: selectorProveedor.value,
        activa: activaTexto,
        disponible: disponibleTexto,
        beneficio: beneficioTexto 
    }
    // validación para que no se agregeue una misma póliza con el mismo beneficio
    const coincideciaBeneficio = listaProveedoresAgregados.find(proveedorAuxiliar => beneficioTexto === proveedorAuxiliar.beneficio)

    const coincideciaPoliza = listaProveedoresAgregados.find(proveedorAuxiliar => activaTexto === proveedorAuxiliar.activa)
    
    // console.log(coincideciaBeneficio, coincideciaPoliza) // me imprime los objetos en coincidencia
    
    if(coincideciaBeneficio && coincideciaPoliza){
        
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "El beneficio asociado a esta póliza ya se encuentra agregado!!!"
            });

            document.getElementById('selector-beneficios').value = "0";
            idCounter--; // este decremento es para que cada vez que se me repita un beneficio, se mantenga el id consecutivo por objetos
        return;
    }

        listaProveedoresAgregados.push(proveedorAgregado);
        localStorage.setItem("storageProveedoresAgregados", JSON.stringify(listaProveedoresAgregados));

        Swal.fire({
            position: "center",
            icon: "success",
            title: "Haz agregado correctamente",
            showConfirmButton: false,
            timer: 2000,
            customClass: {
            title: 'text--blue'
            }
        });
    

            
    limpiarSelectores();
    mostrarSelectorBeneficios();
})

// funcion boton eliminar


/*
eliminar.addEventListener("click", function(event){

    
})
*/