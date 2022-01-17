function saveShipment() {
    const xhttp = new XMLHttpRequest();
    xhttp.open("POST", localStorage.getItem("server")+"/envios", true);
    xhttp.setRequestHeader("Content-type", "application/json;charset=UTF-8");
    xhttp.setRequestHeader("Authorization",sessionStorage.getItem("token"));
    xhttp.send(JSON.stringify({
        "typeProduct": document.getElementById("typeProduct").value,
        "dateIn": document.getElementById("dateIn").value,
        "idVehicle": document.getElementById("idVehicle").value,
        "idClient": document.getElementById("idClient").value,
        "idWarehouse": document.getElementById("idWarehouse").value,
        "quantity": document.getElementById("quantity").value
    }));
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            alert("Dato insertado correctamente")
        }
    }
}



function clean() {
    document.getElementById("table").classList.add("disable");
    document.getElementById("form").classList.remove("disable");
    document.getElementById("delete").classList.add("disable");
}

function getData() {
    document.getElementById("table").classList.remove("disable");
    document.getElementById("form").classList.add("disable");
    document.getElementById("delete").classList.add("disable");
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", localStorage.getItem("server")+"/envios", true);
    xhttp.setRequestHeader("Authorization",sessionStorage.getItem("token"))
    xhttp.send();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let datos = JSON.parse(this.responseText);
            console.log(datos)
            tablaHead = document.getElementById("table-head");
            tablaHead.innerHTML = `       
        <tr>
            <th>Id</th>
            <th>Guia</th>
            <th>Tipo de producto</th>
            <th>Cantidad</th>
            <th>Fecha de ingreso</th>
            <th>Fecha de entrega</th>
            <th>Precio</th>
            <th>Descuento</th>
            <th>ID Vehiculo</th>
            <th>ID Cliente</th>
            <th>ID Deposito</th>
        </tr>`
            tabla = document.getElementById("table-body");
            tabla.innerHTML = '';
            for (let item of datos) {
                if (item.dateDelivery == null) {
                    dateDelivery = "No entregado";
                } else {
                    dateDelivery = item.dateDelivery;
                }
                tabla.innerHTML += `
                <tr>
                <td>${item.id}</td>
                <td>${item.guide}</td>
                <td>${item.typeProduct}</td>
                <td>${item.quantity}</td>
                <td>${item.dateIn}</td> 
                <td>${dateDelivery}</td>
                <td>${item.price}</td>
                <td>${item.discount}</td>
                <td>${item.idVehicle}</td>
                <td>${item.idClient}</td>
                <td>${item.idWarehouse}</td>

                </tr>
                `
            }
        }
    }
}

function getForm() {
    clean();
}

function getDelete() {
    document.getElementById("table").classList.add("disable");
    document.getElementById("form").classList.add("disable");
    document.getElementById("delete").classList.remove("disable");
}

function deleteData(){
    const xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", localStorage.getItem("server")+"/envios/"+document.getElementById("guideDelete").value, true);
    xhttp.setRequestHeader("Authorization",sessionStorage.getItem("token"))
    xhttp.send();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            alert("Dato eliminado correctamente")
        }
    }
}