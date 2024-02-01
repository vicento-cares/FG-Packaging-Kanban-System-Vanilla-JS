// DOMContentLoaded function
document.addEventListener("DOMContentLoaded", () => {
  load_data(1);
  if (getCookie('role') != 'Admin') {
    document.getElementById("btnAddAdminAccount").setAttribute('disabled', true);
    document.getElementById("btnDeleteAdminAccount").setAttribute('disabled', true);
  }
  sessionStorage.setItem('saved_i_search', '');
  sessionStorage.setItem('notif_pending', 0);
  load_notification_fg();
  realtime_load_notification_fg = setInterval(load_notification_fg, 5000);
});

const get_details = el => {
  var id = el.dataset.id;
  var username = el.dataset.username;
  var name = el.dataset.name;
  var role = el.dataset.role;

  document.getElementById("u_id").value = id;
  document.getElementById("u_username").value = username;
  document.getElementById("u_name").value = name;
  document.getElementById("u_role").value = role;
}

const count_data = () => {
  var i_search = sessionStorage.getItem('saved_i_search');
  let xhr = new XMLHttpRequest();
  let url = "../../process/admin/admin-accounts_processor.php", type = "POST";
  var data = serialize({
    method: 'count_data',
    search: i_search
  });
  xhr.onreadystatechange = () => {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      let response = xhr.responseText;
      if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
        var total_rows = parseInt(response);
        let table_rows = parseInt(document.getElementById("adminAccountData").childNodes.length);
        let loader_count = document.getElementById("loader_count").value;
        if (i_search == '') {
          document.getElementById("counter_view_search").style.display = 'none';
          document.getElementById("search_more_data").style.display = 'none';
          let counter_view = "";
          if (total_rows != 0) {
            if (total_rows < 2) {
              counter_view = `${table_rows} row of ${total_rows} record`;
            } else {
              counter_view = `${table_rows} rows of ${total_rows} records`;
            }
            document.getElementById("counter_view").innerHTML = counter_view;
            document.getElementById("counter_view").style.display = 'block';
          } else {
            document.getElementById("counter_view").style.display = 'none';
          }

          if (total_rows == 0) {
            document.getElementById("load_more_data").style.display = 'none';
          } else if (total_rows > loader_count) {
            document.getElementById("load_more_data").style.display = 'block';
          } else if (total_rows <= loader_count) {
            document.getElementById("load_more_data").style.display = 'none';
          }
        } else {
          document.getElementById("counter_view").style.display = 'none';
          document.getElementById("load_more_data").style.display = 'none';
          let counter_view = "";
          if (total_rows != 0) {
            let counter_view_search = "";
            if (total_rows < 2) {
              counter_view_search = `${total_rows} record found`;
              counter_view = `${table_rows} row of ${total_rows} record`;
            } else {
              counter_view_search = `${total_rows} records found`;
              counter_view = `${table_rows} rows of ${total_rows} records`;
            }
            document.getElementById("counter_view_search").innerHTML = counter_view_search;
            document.getElementById("counter_view_search").style.display = 'block';
            document.getElementById("counter_view").innerHTML = counter_view;
            document.getElementById("counter_view").style.display = 'block';
          } else {
            document.getElementById("counter_view_search").style.display = 'none';
            document.getElementById("counter_view").style.display = 'none';
          }

          if (total_rows == 0) {
            document.getElementById("search_more_data").style.display = 'none';
          } else if (total_rows > loader_count) {
            document.getElementById("search_more_data").style.display = 'block';
          } else if (total_rows <= loader_count) {
            document.getElementById("search_more_data").style.display = 'none';
          }
        }
      } else {
        console.log(xhr);
        swal('System Error', `Call IT Personnel Immediately!!! They will fix it right away. Error: url: ${url}, method: ${type} ( HTTP ${xhr.status} - ${xhr.statusText} ) Press F12 to see Console Log for more info.`, 'error');
      }
    }
  };
  xhr.open(type, url, true);
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.send(data);
}

const load_data = option => {
  var id = 0;
  var i_search = '';
  var loader_count = 0;
  var continue_loading = true;
  switch (option) {
    case 2:
      var id = document.getElementById("adminAccountData").lastChild.getAttribute("id");
      var loader_count = parseInt(document.getElementById("loader_count").value);
      break;
    case 3:
      var i_search = document.getElementById("i_search").value.trim();
      if (i_search == '') {
        var continue_loading = false;
        swal('Admin Account Search', 'Fill out search input field', 'info');
      }
      break;
    case 4:
      var id = document.getElementById("adminAccountData").lastChild.getAttribute("id");
      var i_search = sessionStorage.getItem('saved_i_search');
      var loader_count = parseInt(document.getElementById("loader_count").value);
      break;
    default:
  }
  if (continue_loading == true) {
    let xhr = new XMLHttpRequest();
    let url = "../../process/admin/admin-accounts_processor.php", type = "POST";
    var data = serialize({
      method: 'fetch_data',
      id: id,
      search: i_search,
      c: loader_count
    });
    switch (option) {
      case 1:
      case 3:
        var loading = `<tr><td colspan="5" style="text-align:center;"><div class="spinner-border text-dark" role="status"><span class="sr-only">Loading...</span></div></td></tr>`;
        document.getElementById("adminAccountData").innerHTML = loading;
        break;
      default:
    }
    xhr.onreadystatechange = () => {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        let response = xhr.responseText;
        if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
          switch (option) {
            case 1:
              document.getElementById("adminAccountData").innerHTML = response;
              document.getElementById("loader_count").value = 10;
              sessionStorage.setItem('saved_i_search', '');
              break;
            case 3:
              document.getElementById("adminAccountData").innerHTML = response;
              document.getElementById("loader_count").value = 10;
              sessionStorage.setItem('saved_i_search', i_search);
              break;
            case 2:
            case 4:
              document.getElementById("adminAccountData").insertAdjacentHTML('beforeend', response);
              document.getElementById("loader_count").value = loader_count + 10;
              break;
            default:
          }
          count_data();
        } else {
          console.log(xhr);
          swal('System Error', `Call IT Personnel Immediately!!! They will fix it right away. Error: url: ${url}, method: ${type} ( HTTP ${xhr.status} - ${xhr.statusText} ) Press F12 to see Console Log for more info.`, 'error');
        }
      }
    };
    xhr.open(type, url, true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send(data);
  }
}

document.getElementById("i_search").addEventListener("keyup", e => {
  if (e.which === 13) {
    e.preventDefault();
    load_data(3);
  }
});

$("#AddAccountModal").on('hidden.bs.modal', e => {
  document.getElementById("i_username").value = '';
  document.getElementById("i_password").value = '';
  document.getElementById("i_name").value = '';
  document.getElementById("i_role").value = '';
});

const account_info_modal_hidden = () => {
  document.getElementById("u_id").value = '';
  document.getElementById("u_username").value = '';
  document.getElementById("u_password").value = '';
  document.getElementById("u_name").value = '';
  document.getElementById("u_role").value = '';
}

const save_data = () => {
  var username = document.getElementById("i_username").value.trim();
  var password = document.getElementById("i_password").value.trim();
  var name = document.getElementById("i_name").value.trim();
  var role = document.getElementById("i_role").value;
  let xhr = new XMLHttpRequest();
  let url = "../../process/admin/admin-accounts_processor.php", type = "POST";
  var data = serialize({
    method: 'save_data',
    username:username,
    password:password,
    name:name,
    role:role
  });
  swal('Admin Account', 'Loading please wait...', {
    buttons: false,
    closeOnClickOutside: false,
    closeOnEsc: false,
  });
  xhr.onreadystatechange = () => {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      let response = xhr.responseText;
      if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
        setTimeout(() => {
          swal.close();
          if (response == 'success') {
            swal('Admin Account', 'Successfully Saved', 'success');
            load_data(1);
            $('#AddAccountModal').modal('hide');
          } else if (response == 'Invalid Username') {
            swal('Admin Account', 'Username should be at least 2 characters in length. It should not begin, trailing or end with Special Characters or Whitespaces. Allowed Special Characters (-\'_.)', 'info');
          } else if (response == 'Invalid Password') {
            swal('Admin Account', 'Password should be at least 8 characters in length and should include at least one upper case letter, one number, and one special character.', 'info');
          } else if (response == 'Invalid Name') {
            swal('Admin Account', 'Name should be at least 2 characters in length. It should not begin, trailing or end with Special Characters or Whitespaces. Allowed Special Characters (-\'.)', 'info');
          } else if (response == 'Role Not Set') {
            swal('Admin Account', 'Please set an Account Role', 'info');
          } else if (response == 'Unauthorized Access') {
            swal('Admin Account Error', 'Only Admin Role is allowed to do this changes', 'error');
          } else if (response == 'Username Exists') {
            swal('Admin Account', 'Username Exists', 'info');
          } else {
            console.log(response);
            swal('Admin Account Error', `Call IT Personnel Immediately!!! They will fix it right away. Error: ${response}`, 'error');
          }
        }, 500);
      } else {
        console.log(xhr);
        swal('System Error', `Call IT Personnel Immediately!!! They will fix it right away. Error: url: ${url}, method: ${type} ( HTTP ${xhr.status} - ${xhr.statusText} ) Press F12 to see Console Log for more info.`, 'error');
      }
    }
  };
  xhr.open(type, url, true);
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.send(data);
}

const update_username = () => {
  var id = document.getElementById("u_id").value.trim();
  var username = document.getElementById("u_username").value.trim();
  let xhr = new XMLHttpRequest();
  let url = "../../process/admin/admin-accounts_processor.php", type = "POST";
  var data = serialize({
    method: 'update_username',
    id:id,
    username:username
  });
  swal('Admin Account', 'Loading please wait...', {
    buttons: false,
    closeOnClickOutside: false,
    closeOnEsc: false,
  });
  xhr.onreadystatechange = () => {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      let response = xhr.responseText;
      if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
        setTimeout(() => {
          swal.close();
          if (response == 'success') {
            swal('Admin Account', 'Username Changed Successfully', 'success');
            load_data(1);
            account_info_modal_hidden();
            $('#AccountInfoModal').modal('hide');
          } else if (response == 'Invalid Username') {
            swal('Admin Account', 'Username should be at least 2 characters in length. It should not begin, trailing or end with Special Characters or Whitespaces. Allowed Special Characters (-\'_.)', 'info');
          } else if (response == 'Unauthorized Access') {
            swal('Admin Account Error', 'Only Admin Role is allowed to do this changes', 'error');
          } else if (response == 'Username Exists') {
            swal('Admin Account', 'Username Exists', 'info');
          } else {
            console.log(response);
            swal('Admin Account Error', `Call IT Personnel Immediately!!! They will fix it right away. Error: ${response}`, 'error');
          }
        }, 500);
      } else {
        console.log(xhr);
        swal('System Error', `Call IT Personnel Immediately!!! They will fix it right away. Error: url: ${url}, method: ${type} ( HTTP ${xhr.status} - ${xhr.statusText} ) Press F12 to see Console Log for more info.`, 'error');
      }
    }
  };
  xhr.open(type, url, true);
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.send(data);
}

const update_password = () => {
  var id = document.getElementById("u_id").value.trim();
  var password = document.getElementById("u_password").value.trim();
  let xhr = new XMLHttpRequest();
  let url = "../../process/admin/admin-accounts_processor.php", type = "POST";
  var data = serialize({
    method: 'update_password',
    id:id,
    password:password
  });
  swal('Admin Account', 'Loading please wait...', {
    buttons: false,
    closeOnClickOutside: false,
    closeOnEsc: false,
  });
  xhr.onreadystatechange = () => {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      let response = xhr.responseText;
      if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
        setTimeout(() => {
          swal.close();
          if (response == 'success') {
            swal('Admin Account', 'Password Changed Successfully', 'success');
            load_data(1);
            account_info_modal_hidden();
            $('#AccountInfoModal').modal('hide');
          } else if (response == 'Invalid Password') {
            swal('Admin Account', 'Password should be at least 8 characters in length and should include at least one upper case letter, one number, and one special character.', 'info');
          } else if (response == 'Unauthorized Access') {
            swal('Admin Account Error', 'Only Admin Role is allowed to do this changes', 'error');
          } else {
            console.log(response);
            swal('Admin Account Error', `Call IT Personnel Immediately!!! They will fix it right away. Error: ${response}`, 'error');
          }
        }, 500);
      } else {
        console.log(xhr);
        swal('System Error', `Call IT Personnel Immediately!!! They will fix it right away. Error: url: ${url}, method: ${type} ( HTTP ${xhr.status} - ${xhr.statusText} ) Press F12 to see Console Log for more info.`, 'error');
      }
    }
  };
  xhr.open(type, url, true);
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.send(data);
}

const update_data = () => {
  var id = document.getElementById("u_id").value.trim();
  var name = document.getElementById("u_name").value.trim();
  var role = document.getElementById("u_role").value;
  let xhr = new XMLHttpRequest();
  let url = "../../process/admin/admin-accounts_processor.php", type = "POST";
  var data = serialize({
    method: 'update_data',
    id:id,
    name:name,
    role:role
  });
  swal('Admin Account', 'Loading please wait...', {
    buttons: false,
    closeOnClickOutside: false,
    closeOnEsc: false,
  });
  xhr.onreadystatechange = () => {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      let response = xhr.responseText;
      if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
        setTimeout(() => {
          swal.close();
          if (response == 'success') {
            swal('Admin Account', 'Account Updated Successfully', 'success');
            load_data(1);
            document.getElementById("user_panel_name").innerHTML = getCookie('name'); //current user new account name
            account_info_modal_hidden();
            $('#AccountInfoModal').modal('hide');
          } else if (response == 'Invalid Name') {
            swal('Admin Account', 'Name should be at least 2 characters in length. It should not begin, trailing or end with Special Characters or Whitespaces. Allowed Special Characters (-\'.)', 'info');
          } else if (response == 'Role Not Set') {
            swal('Admin Account', 'Please set an Account Role', 'info');
          } else if (response == 'Unauthorized Access') {
            swal('Admin Account Error', 'Only Admin Role is allowed to do this changes', 'error');
          } else if (response == 'Own Account') {
            swal('Admin Account Error', 'You cannot set role to your own account!', 'error');
          } else {
            console.log(response);
            swal('Admin Account Error', `Call IT Personnel Immediately!!! They will fix it right away. Error: ${response}`, 'error');
          }
        }, 500);
      } else {
        console.log(xhr);
        swal('System Error', `Call IT Personnel Immediately!!! They will fix it right away. Error: url: ${url}, method: ${type} ( HTTP ${xhr.status} - ${xhr.statusText} ) Press F12 to see Console Log for more info.`, 'error');
      }
    }
  };
  xhr.open(type, url, true);
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.send(data);
}

const delete_data = () => {
  var id = document.getElementById("u_id").value.trim();
  let xhr = new XMLHttpRequest();
  let url = "../../process/admin/admin-accounts_processor.php", type = "POST";
  var data = serialize({
    method: 'delete_data',
    id:id
  });
  swal('Admin Account', 'Loading please wait...', {
    buttons: false,
    closeOnClickOutside: false,
    closeOnEsc: false,
  });
  xhr.onreadystatechange = () => {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      let response = xhr.responseText;
      if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
        setTimeout(() => {
          swal.close();
          if (response == 'success') {
            swal('Admin Account', 'Data Deleted', 'info');
            load_data(1);
            account_info_modal_hidden();
            $('#deleteDataModal').modal('hide');
          } else if (response == 'Own Account') {
            swal('Admin Account Error', 'You cannot delete your own account!', 'error');
            $('#deleteDataModal').modal('hide');
            $('#AccountInfoModal').modal('show');
          } else if (response == 'Unauthorized Access') {
            swal('Admin Account Error', 'Only Admin Role is allowed to do this changes', 'error');
            $('#deleteDataModal').modal('hide');
            $('#AccountInfoModal').modal('show');
          } else {
            console.log(response);
            swal('Admin Account Error', `Call IT Personnel Immediately!!! They will fix it right away. Error: ${response}`, 'error');
          }
        }, 500);
      } else {
        console.log(xhr);
        swal('System Error', `Call IT Personnel Immediately!!! They will fix it right away. Error: url: ${url}, method: ${type} ( HTTP ${xhr.status} - ${xhr.statusText} ) Press F12 to see Console Log for more info.`, 'error');
      }
    }
  };
  xhr.open(type, url, true);
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.send(data);
}