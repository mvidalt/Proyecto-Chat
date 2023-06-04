function registre() {
    var user = document.getElementById("user").value;
    var mail = document.getElementById("mail").value;
    var pass = document.getElementById("pass").value;
    var pass2 = document.getElementById("pass2").value;
    var codeCountry = document.getElementById("codeCountry").value;
  
    if (pass !== pass2) {
      alert('Las contraseñas no coinciden');
      return;
    }
  
    var http = new XMLHttpRequest();
    http.open("POST", "http://localhost:3000/XatLLM/Register", true);
    http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  
    http.onreadystatechange = function () {
      if (http.readyState === XMLHttpRequest.DONE) {
        if (http.status === 200) {

          var response = http.responseText;
          
          if (response === "false") {

            alert('Email en uso');
          } else {
            document.getElementById("resultado").innerHTML = 'Usuario creado correctamente';
            document.getElementById("user").value = "";;
            document.getElementById("mail").value = "";;
            document.getElementById("pass").value = "";
            document.getElementById("pass2").value = "";
          }
        } else {

          console.error('Error en la petición al backend:', http.status);
        }
      }
    };
  
    var params = "user=" + encodeURIComponent(user) + "&mail=" + encodeURIComponent(mail) + "&pass=" + encodeURIComponent(pass) + "&codeCountry=" + encodeURIComponent(codeCountry);
  
    http.send(params);

  }
  


  function obtenerPaises() {
    var http = new XMLHttpRequest();
    http.open("GET", "http://localhost:3000/XatLLM/Register", true);

    http.onreadystatechange = function () {
        if (http.readyState === XMLHttpRequest.DONE) {
            if (http.status === 200) {
                var responseData = http.responseText;


                var parsedResponse;
                try {
                parsedResponse = JSON.parse(responseData);
                } catch (error) {
                console.error("Error parsing JSON response:", error);
                }


                var selectElement = document.getElementById("codeCountry");


                selectElement.innerHTML = '';


                if (Array.isArray(parsedResponse)) {

                parsedResponse.forEach(function(item) {

                    var option = document.createElement("option");
                    

                    option.value = item.code;
                    option.textContent = item.name;
                    

                    selectElement.appendChild(option);
                });
                } else {
                console.error("Invalid response format. Expected an array.");
                }

            } else {
                console.error('Error en la petición al backend:', http.status);
            }

        }
    }
    http.send();}