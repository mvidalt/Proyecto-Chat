function cambiarConversacion() {
    var selectedFriend = document.getElementById('amigo').value;
    var conversaciones = document.querySelectorAll('.conversacion');
  
    for (var i = 0; i < conversaciones.length; i++) {
      var conversacion = conversaciones[i];
      var amigo = conversacion.getAttribute('data-amigo');
  
      if (amigo === selectedFriend) {
        if (conversacion.style.display !== 'block') {
          conversacion.style.display = 'block';
        }
      } else {
        if (conversacion.style.display !== 'none') {
          conversacion.style.display = 'none';
        }
      }
    }
  }

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
                    var emisor = jsonObject.emisor;
                    var conversacionElement = document.querySelector('.conversacion[data-amigo="' + emisor + '"]');
                    if (conversacionElement) {
                        var mensaje = document.createElement('p');
                        mensaje.textContent = emisor + ": " + text;
                        mensaje.classList.add('received');
                        conversacionElement.appendChild(mensaje);
                    }
                }
            } else {
                console.error('Error en la petición al backend:', xhr.status);
            }
        }
    };
    xhr.send();
}



setInterval(recibirMensaje, 5000);



function enviarMensaje() {
    var mail = sessionStorage.getItem('mail');
    var session = sessionStorage.getItem('session');
    var receptor = document.getElementById("amigo").value;
    var sms = document.getElementById("sms").value;

    if (sms.trim() === "") {
      alert("El mensaje está vacío, escribe algo porfavor");
      return;
  }

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:3000/XatLLM/Xat", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                console.log("Mensaje enviado correctamente");

                var text = sms;

                var conversacionElement = document.querySelector('.conversacion[data-amigo="' + receptor + '"]');
                if (conversacionElement) {
                  var mensaje = document.createElement('p');
                  mensaje.textContent = 'Tu: ' + text;
                  mensaje.classList.add('sent');
                  conversacionElement.appendChild(mensaje);
                  
                }
            } else {
                console.error("Error al enviar el mensaje:", xhr.status);
            }
        }
    };

    var params = "mail=" + encodeURIComponent(mail) + "&session=" + encodeURIComponent(session) + "&receptor=" + encodeURIComponent(receptor) + "&sms=" + encodeURIComponent(sms);

    xhr.send(params);
    document.getElementById("sms").value = "";
}

function mostrarCorreoUsuario() {
  var loggedMail = sessionStorage.getItem('mail');

  if (loggedMail === null) {
      alert("No has iniciado sesión.");
      window.location.href = "login.html";
      return;
  }

  var correoElement = document.getElementById('usuario');
  correoElement.textContent = 'Usuario: ' + loggedMail;
}


  window.addEventListener('load', mostrarCorreoUsuario);

  function logout() {
    sessionStorage.clear();
    location.href = "login.html";
  }
  