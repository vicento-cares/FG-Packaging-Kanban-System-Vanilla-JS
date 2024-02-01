document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("qr_id").focus();
  setInterval(input_qr_id_focus, 1000);
  $.validator.setDefaults({
    submitHandler: () => {
      let qr_id = document.getElementById("qr_id").value;
      var ip = getCookie('ip');

      let xhr = new XMLHttpRequest();
      let url = "process/auth/sign_in2.php", type = "POST";
      var data = serialize({
        id_no: qr_id,
        ip: ip
      });
      var loading = `<span class="spinner-border spinner-border-sm mr-1" role="status" aria-hidden="true" id="loading"></span>`;
      document.getElementById("login").insertAdjacentHTML('afterbegin', loading);
      document.getElementById("login").setAttribute('disabled', true);
      xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          let response = xhr.responseText;
          if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
            if (response == 'success') {
              window.location.href = "pages/request.php";
            } else {
              if (response == 'failed') {
                swal('Requestor Account Sign In', `Sign In Failed. Maybe an incorrect credential or account not found`, 'info').then(isConfirm => {document.getElementById("qr_id").value = '';return false;});
              } else if (response == 'Wrong Section') {
                swal('Requestor Account Sign In Error', `Requestor Verification Failed. ID Scanned in WRONG Section`, 'error').then(isConfirm => {document.getElementById("qr_id").value = '';return false;});
              } else if (response == 'Not Section') {
                swal('Requestor Account Sign In Error', `Requestor Verification Failed. ID Scanned NOT in Section`, 'error').then(isConfirm => {document.getElementById("qr_id").value = '';return false;});
              } else {
                swal('Requestor Account Sign In Error', `Call IT Personnel Immediately!!! They will fix it right away. Error: ${response}`, 'error');
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
      qr_id: {
        required: true
      }
    },
    messages: {
      qr_id: {
        required: "Please enter/scan ID Number"
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

const input_qr_id_focus = () => {document.getElementById("qr_id").focus();}