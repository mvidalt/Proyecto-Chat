function recibirMensaje() {
    var mail = sessionStorage.getItem('mail');
    var session = sessionStorage.getItem('session');

    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://localhost:3000/XatLLM/Xat?mail=" + mail + "&session=" + session, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                var responseData = xhr.responseText;
                if (responseData !== "[]") {
                    var jsonObject = JSON.parse(responseData);
                    console.log(jsonObject);
                    var text = jsonObject.text;
                    var selectedFriend = document.getElementById('amigo').value;
                    var conversaciones = document.querySelectorAll('.conversacion');
                    
                    for (var i = 0; i < conversaciones.length; i++) {
                        var conversacion = conversaciones[i];
                        var amigo = conversacion.getAttribute('data-amigo');
                        
                        if (amigo === selectedFriend) {
                            var p = document.createElement("p");
                            p.textContent = text;
                            conversacion.appendChild(p);
                            
                            // Mostrar la conversación seleccionada
                            conversacion.style.display = 'block';
                        } else {
                            // Ocultar las conversaciones que no están seleccionadas
                            conversacion.style.display = 'none';
                        }
                    }
                }
            } else {
                console.error('Error en la petición al backend:', xhr.status);
            }
        }
    }
    xhr.send();
}
  

// Llamar a la función recibirMensaje cada 5 segundos (5000 milisegundos)
setInterval(recibirMensaje, 5000);



function enviarMensaje() {
    var mail = sessionStorage.getItem('mail');
    var session = sessionStorage.getItem('session');
    var receptor = document.getElementById("amigo").value;
    var sms = document.getElementById("sms").value;

    var http = new XMLHttpRequest();
    http.open("POST", "http:/localhost:3000/XatLLM/Xat", true);
    http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");




    http.onreadystatechange = function () {
        if (http.readyState === XMLHttpRequest.DONE) {
            if (http.status === 200) {
                console.log("Mensaje enviado correctamente");
            } else {
                console.error("Error al enviar el mensaje:", http.status);
            }
        }
    };

    var params = "mail=" + encodeURIComponent(mail) + "&session=" + encodeURIComponent(session) + "&receptor=" + encodeURIComponent(receptor) + "&sms=" + encodeURIComponent(sms);

    http.send(params);
}
