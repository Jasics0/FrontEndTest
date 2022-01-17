window.onload   = function (){
    localStorage.setItem("server","https://test-javier-charry.herokuapp.com/")
}
function login() {
    const xhttp = new XMLHttpRequest();
    xhttp.open("POST", localStorage.getItem("server")+"/login", true);
    xhttp.setRequestHeader("Content-type", "application/json;charset=UTF-8");
    xhttp.send(JSON.stringify({
        "idCard": document.getElementById("idCard").value,
        "password": document.getElementById("idCard").value
    }));
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let token = this.getResponseHeader("Authorization");
            sessionStorage.setItem("token", token);
            document.getElementById("idCard").value = "";
            window.location.href = "../home.html";
        } else if (this.status == 403) {
            document.getElementById("resp").innerText = "Los datos son incorrecots";
        }
    }

}
