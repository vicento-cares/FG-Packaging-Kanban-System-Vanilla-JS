document.addEventListener("DOMContentLoaded", () => {
  $.validator.setDefaults({
    submitHandler: () => {
      let username = document.getElementById("username").value;
      let password = document.getElementById("password").value;

      let xhr = new XMLHttpRequest();
      let url = "../process/auth/sign_in.php", type = "POST";
      var data = serialize({
        username: username,
        password: password
      });
      var loading = `<span class="spinner-border spinner-border-sm mr-1" role="status" aria-hidden="true" id="loading"></span>`;
      document.getElementById("login").insertAdjacentHTML('afterbegin', loading);
      document.getElementById("login").setAttribute('disabled', true);
      xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          let response = xhr.responseText;
          if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
            if (response == 'success') {
              window.location.href = "pages/requested-packaging-materials.php";
            } else {
              if (response == 'failed') {
                swal('Account Sign In', `Sign In Failed. Maybe an incorrect credential or account not found`, 'info');
              } else {
                swal('Account Sign In Error', `Call IT Personnel Immediately!!! They will fix it right away. Error: ${response}`, 'error');
              }
              document.getElementById("loading").remove();
              document.getElementById("login").removeAttribute('disabled');
            }
          } else {
            console.log(xhr);
            swal('System Error', `Call IT Personnel Immediately!!! They will fix it right away. Error: url: ${url}, method: ${type} ( HTTP ${xhr.status} - ${xhr.statusText} ) Press F12 to see Console Log for more info.`, 'error');
            document.getElementById("loading").remove();
            document.getElementById("login").removeAttribute('disabled');
          }
        }
      };
      xhr.open(type, url, true);
      xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      xhr.send(data);
    }
  });
  $('#quickForm').validate({
    rules: {
      username: {
        required: true
      },
      password: {
        required: true
      }
    },
    messages: {
      username: {
        required: "Please enter your username",
      },
      password: {
        required: "Please enter your password"
      }
    },
    errorElement: 'span',
    errorPlacement: (error, element) => {
      error.addClass('invalid-feedback');
      element.closest('.form-group').append(error);
    },
    highlight: (element, errorClass, validClass) => {
      element.classList.add('is-invalid');
    },
    unhighlight: (element, errorClass, validClass) => {
      element.classList.remove('is-invalid');
    }
  });
});