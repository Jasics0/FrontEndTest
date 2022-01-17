function saveShipment() {
    const xhttp = new XMLHttpRequest();
    xhttp.open("POST", localStorage.getItem("server")+"/depositos", true);
    xhttp.setRequestHeader("Content-type", "application/json;charset=UTF-8");
    xhttp.setRequestHeader("Authorization",sessionStorage.getItem("token"));
    xhttp.send(JSON.stringify({
        "name": document.getElementById("name").value,
        "type": document.getElementById("type").value,
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
    xhttp.open("GET", localStorage.getItem("server")+"/depositos", true);
    xhttp.setRequestHeader("Authorization",sessionStorage.getItem("token"))
    xhttp.send();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let datos = JSON.parse(this.responseText);
            console.log(datos)
            tablaHead = document.getElementById("table-head");
            tablaHead.innerHTML = `       
        <tr>
            <th>Id Deposito</th>
            <th>Nombre</th>
            <th>Tipo de Deposito</th>
        </tr>`
            tabla = document.getElementById("table-body");
            tabla.innerHTML = '';
            for (let item of datos) {
                tabla.innerHTML += `
                <tr>
                <td>${item.id}</td>
                <td>${item.name}</td>
                <td>${item.type}</td>
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
    xhttp.open("DELETE", localStorage.getItem("server")+"/depositos/"+document.getElementById("idWarehosedelete").value, true);
    xhttp.setRequestHeader("Authorization",sessionStorage.getItem("token"))
    xhttp.send();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            alert("Dato eliminado correctamente")
        }
    }
}