function enviarGET() {
    let http = new XMLHttpRequest();

    let user = document.getElementById("user").value;
    let pass = document.getElementById("pass").value;

    http.open("GET", "http://localhost:3000/DAMTomcat/Login?user=" + user + "&pass=" + pass, true);
    http.send();

    http.onreadystatechange=function() {
        if (this.readyState == 4 && this.status == 200) {
            if (http.responseText == "true") {
                document.body.style.backgroundColor = "red";
               /* window.location.replace("http://www.google.com") */
            }
            document.getElementById("resultado").innerHTML = http.responseText;
        }
    }
}

function enviarPOST() {
    let http = new XMLHttpRequest();
    let user = document.getElementById("user").value;
    let pass = document.getElementById("pass").value;
    http.open("POST", "http://localhost:3000/DAMTomcat/Login", true);
    http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    http.send("user=" + user + "&pass=" + pass);
}

function retroceder() {
    window.history.back();
  }