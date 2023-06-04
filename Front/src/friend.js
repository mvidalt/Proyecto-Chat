function añadiramigos() {
    var mail = sessionStorage.getItem('mail');
    var session = sessionStorage.getItem('session');
    var friend = document.getElementById("friend").value;

    var http = new XMLHttpRequest();
    http.open("POST", "http://localhost:3000/XatLLM/Friend", true);
    http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  
    http.onreadystatechange = function () {
      if (http.readyState === XMLHttpRequest.DONE) {
        if (http.status === 200) {
          var response = http.responseText;
            if (response == '0') {
                document.getElementById("resultado").innerHTML = 'El servidor no responde';
            } else if (response == '1') {
                document.getElementById("resultado").innerHTML = 'Amigo agregado correctamente';
                document.getElementById("friend").value;
            } else if (response == '2') {
                document.getElementById("resultado").innerHTML = 'Amigo no encontrado';
            } else if (response == '3') {
                document.getElementById("resultado").innerHTML = 'El código de sesión ha expirado y se requiere iniciar sesión nuevamente';
            }
          }
        } else {
          console.error('Error en la petición al backend:', http.status);
        }
      
    };
  
    var params = "mail=" + encodeURIComponent(mail) + "&session=" + encodeURIComponent(session) + "&friend=" + encodeURIComponent(friend);
  
    http.send(params);
}
function recibiramigos() {
  var mail = sessionStorage.getItem('mail');
  var session = sessionStorage.getItem('session');
  console.log(mail);

  var http = new XMLHttpRequest();

  http.open("GET", "http://localhost:3000/XatLLM/Friend?mail=" + mail + "&session=" + session, true);

  http.onreadystatechange = function () {
    if (http.readyState === XMLHttpRequest.DONE) {
      if (http.status === 200) {
        var responseData = http.responseText;
        var parsedResponse;
        try {
          parsedResponse = JSON.parse(responseData);
          console.log(parsedResponse);
        } catch (error) {
          console.error("Error parsing JSON response:", error);
        }
        var selectElement = document.getElementById("amigo");
        var chatContainer = document.getElementById("chatContainer");

        selectElement.innerHTML = '';
        chatContainer.innerHTML = '';

        if (Array.isArray(parsedResponse)) {
          var addedFriends = []; 


          parsedResponse.forEach(function (amigo, index) {

            if (!addedFriends.includes(amigo)) {

              var option = document.createElement("option");

              option.value = amigo;
              option.textContent = amigo;

              selectElement.appendChild(option);

              addedFriends.push(amigo);
            }

            var divChat = document.createElement("div");
            divChat.classList.add("conversacion");
            divChat.dataset.amigo = amigo;
            chatContainer.appendChild(divChat);
            if (index === 0) {
              divChat.style.display = "block";
            } else {
              divChat.style.display = "none";
            }
          });
        } else {
          console.error("Invalid response format. Expected an array.");
        }
      } else {
        console.error('Error en la petición al backend:', http.status);
      }
    }
  };

  http.send();
}


  
  