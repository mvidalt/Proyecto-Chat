function send() {

  let http = new XMLHttpRequest();
  let mail = document.getElementById("mail").value;
  let pass = document.getElementById("pass").value;

  http.open("GET", "http://localhost:3000/XatLLM/Login?mail=" + mail + "&pass=" + pass, true);


  http.onreadystatechange = function () {
    if (http.readyState === XMLHttpRequest.DONE) {
      if (http.status === 200) {
        var response = http.responseText;
        console.log(response);

        if (response == "false") {
          document.getElementById("resultado").innerHTML = 'Login erroneo';
          alert("login erroneo");
          document.getElementById("mail").value = "";
          document.getElementById("pass").value = "";
        } else { 
          var sessionCode = response;

          sessionStorage.setItem('session', sessionCode);
          sessionStorage.setItem('mail', mail);
          console.log(sessionStorage)

          window.location.href = 'Xat.html';
        }


      } else {

        console.error('Error en la petición al backend:', http.status);
      }
    }
  };

  http.send();
}