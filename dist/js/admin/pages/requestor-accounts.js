// DOMContentLoaded function
document.addEventListener("DOMContentLoaded", () => {
  get_line_datalist();
  get_section_dropdown();
  get_car_model_dropdown();
  get_factory_area_dropdown();
  load_data(1);
  sessionStorage.setItem('saved_i_search', '');
  sessionStorage.setItem('notif_pending', 0);
  load_notification_fg();
  realtime_load_notification_fg = setInterval(load_notification_fg, 5000);
});

const get_line_datalist = () => {
  let xhr = new XMLHttpRequest();
  let url = "../../process/admin/route-number_processor.php", type = "POST";
  var data = serialize({
    method: 'fetch_line_datalist'
  });
  xhr.onreadystatechange = () => {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      let response = xhr.responseText;
      if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
        document.getElementById("i_lines").innerHTML = response;
        document.getElementById("u_lines").innerHTML = response;
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

const get_section_dropdown = () => {
  let xhr = new XMLHttpRequest();
  let url = "../../process/admin/section_processor.php", type = "POST";
  var data = serialize({
    method: 'fetch_section_dropdown'
  });
  xhr.onreadystatechange = () => {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      let response = xhr.responseText;
      if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
        document.getElementById("i_section").innerHTML = response;
        document.getElementById("u_section").innerHTML = response;
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

const get_car_model_dropdown = () => {
  let xhr = new XMLHttpRequest();
  let url = "../../process/admin/car-model_processor.php", type = "POST";
  var data = serialize({
    method: 'fetch_car_model_dropdown'
  });
  xhr.onreadystatechange = () => {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      let response = xhr.responseText;
      if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
        document.getElementById("i_car_model").innerHTML = response;
        document.getElementById("u_car_model").innerHTML = response;
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

const get_factory_area_dropdown = () => {
  let xhr = new XMLHttpRequest();
  let url = "../../process/admin/factory-area_processor.php", type = "POST";
  var data = serialize({
    method: 'fetch_factory_area_dropdown'
  });
  xhr.onreadystatechange = () => {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      let response = xhr.responseText;
      if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
        document.getElementById("i_factory_area").innerHTML = response;
        document.getElementById("u_factory_area").innerHTML = response;
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

const get_details = el => {
  var id = el.dataset.id;
  var id_no = el.dataset.id_no;
  var name = el.dataset.name;
  var section = el.dataset.section;
  var car_model = el.dataset.car_model;
  var line_no = el.dataset.line_no;
  var factory_area = el.dataset.factory_area;
  var requestor = el.dataset.requestor;
  
  document.getElementById("u_id").value = id;
  document.getElementById("u_id_no").value = id_no;
  document.getElementById("u_name").value = name;
  document.getElementById("u_section").value = section;
  document.getElementById("u_car_model").value = car_model;
  document.getElementById("u_line_no").value = line_no;
  document.getElementById("u_factory_area").value = factory_area;
  document.getElementById("u_requestor").value = requestor;
}

const count_data = () => {
  var i_search = sessionStorage.getItem('saved_i_search');
  let xhr = new XMLHttpRequest();
  let url = "../../process/admin/requestor-accounts_processor.php", type = "POST";
  var data = serialize({
    method: 'count_data',
    search: i_search
  });
  xhr.onreadystatechange = () => {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      let response = xhr.responseText;
      if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
        var total_rows = parseInt(response);
        let table_rows = parseInt(document.getElementById("requestorAccountData").childNodes.length);
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
      var id = document.getElementById("requestorAccountData").lastChild.getAttribute("id");
      var loader_count = parseInt(document.getElementById("loader_count").value);
      break;
    case 3:
      var i_search = document.getElementById("i_search").value.trim();
      if (i_search == '') {
        var continue_loading = false;
        swal('Requestor Account Search', 'Fill out search input field', 'info');
      }
      break;
    case 4:
      var id = document.getElementById("requestorAccountData").lastChild.getAttribute("id");
      var i_search = sessionStorage.getItem('saved_i_search');
      var loader_count = parseInt(document.getElementById("loader_count").value);
      break;
    default:
  }
  if (continue_loading == true) {
    let xhr = new XMLHttpRequest();
    let url = "../../process/admin/requestor-accounts_processor.php", type = "POST";
    var data = serialize({
      method: 'fetch_data',
      id: id,
      search: i_search,
      c: loader_count
    });
    switch (option) {
      case 1:
      case 3:
        var loading = `<tr><td colspan="8" style="text-align:center;"><div class="spinner-border text-dark" role="status"><span class="sr-only">Loading...</span></div></td></tr>`;
        document.getElementById("requestorAccountData").innerHTML = loading;
        break;
      default:
    }
    xhr.onreadystatechange = () => {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        let response = xhr.responseText;
        if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
          switch (option) {
            case 1:
              document.getElementById("requestorAccountData").innerHTML = response;
              document.getElementById("loader_count").value = 10;
              sessionStorage.setItem('saved_i_search', '');
              break;
            case 3:
              document.getElementById("requestorAccountData").innerHTML = response;
              document.getElementById("loader_count").value = 10;
              sessionStorage.setItem('saved_i_search', i_search);
              break;
            case 2:
            case 4:
              document.getElementById("requestorAccountData").insertAdjacentHTML('beforeend', response);
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

$("#AddRAccountModal").on('hidden.bs.modal', e => {
  document.getElementById("i_id_no").value = '';
  document.getElementById("i_name").value = '';
  document.getElementById("i_section").value = '';
  document.getElementById("i_car_model").value = '';
  document.getElementById("i_line_no").value = '';
  document.getElementById("i_factory_area").value = '';
  document.getElementById("i_requestor").value = '';
});

const clear_r_account_info_fields = () => {
  document.getElementById("u_id").value = '';
  document.getElementById("u_id_no").value = '';
  document.getElementById("u_name").value = '';
  document.getElementById("u_section").value = '';
  document.getElementById("u_car_model").value = '';
  document.getElementById("u_line_no").value = '';
  document.getElementById("u_factory_area").value = '';
  document.getElementById("u_requestor").value = '';
}

const get_route_details = action => {
  var line_no = '';
  if (action == 'insert') {
    var line_no = document.getElementById("i_line_no").value.trim();
  } else if (action == 'update') {
    var line_no = document.getElementById("u_line_no").value.trim();
  }
  if (line_no != '') {
    let xhr = new XMLHttpRequest();
    let url = "../../process/admin/route-number_processor.php", type = "POST";
    var data = serialize({
      method: 'get_route_details',
      line_no:line_no
    });
    xhr.onreadystatechange = () => {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        let response = xhr.responseText;
        if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
          try {
            let response_array = JSON.parse(response);
            if (action == 'insert') {
              document.getElementById("i_line_no").value = response_array.line_no;
              document.getElementById("i_section").value = response_array.section;
              document.getElementById("i_car_model").value = response_array.car_model;
              document.getElementById("i_factory_area").value = response_array.factory_area;
            } else if (action == 'update') {
              document.getElementById("u_line_no").value = response_array.line_no;
              document.getElementById("u_section").value = response_array.section;
              document.getElementById("u_car_model").value = response_array.car_model;
              document.getElementById("u_factory_area").value = response_array.factory_area;
            }
          } catch(e) {
            console.log(response);
            swal('Requestor Account Error', `Call IT Personnel Immediately!!! They will fix it right away. Error: ${response}`, 'error');
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
}

const save_data = () => {
  var id_no = document.getElementById("i_id_no").value.trim();
  var name = document.getElementById("i_name").value.trim();
  var section = document.getElementById("i_section").value;
  var car_model = document.getElementById("i_car_model").value;
  var line_no = document.getElementById("i_line_no").value.trim();
  var factory_area = document.getElementById("i_factory_area").value;
  var requestor = document.getElementById("i_requestor").value.trim();

  let xhr = new XMLHttpRequest();
  let url = "../../process/admin/requestor-accounts_processor.php", type = "POST";
  var data = serialize({
    method: 'save_data',
    id_no:id_no,
    name:name,
    section:section,
    car_model:car_model,
    line_no:line_no,
    factory_area:factory_area,
    requestor:requestor
  });
  swal('Requestor Account', 'Loading please wait...', {
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
            swal('Requestor Account', 'Successfully Saved', 'success');
            load_data(1);
            $('#AddRAccountModal').modal('hide');
          } else if (response == 'Invalid ID No.') {
            swal('Requestor Account', 'ID No. should be at least 8 characters in length. It should not begin, trailing or end with Special Characters or Whitespaces. Allowed Special Characters: (-)', 'info');
          } else if (response == 'Invalid Name') {
            swal('Requestor Account', 'Name should be at least 2 characters in length. It should not begin, trailing or end with Special Characters or Whitespaces. Allowed Special Characters (-\'.)', 'info');
          } else if (response == 'Section Not Set') {
            swal('Requestor Account', 'Please set Section', 'info');
          } else if (response == 'Car Model Empty') {
            swal('Requestor Account', 'Please fill out Car Model Field', 'info');
          } else if (response == 'Invalid Line No.') {
            swal('Requestor Account', 'Line No. should be at least 2 characters in length. It should not begin, trailing or end with Special Characters. Allowed Special Characters: \'(\' and \')\'', 'info');
          } else if (response == 'Factory Area Not Set') {
            swal('Requestor Account', 'Please set Factory Area', 'info');
          } else if (response == 'Invalid Requestor') {
            swal('Requestor Account', 'Requestor should be at least 2 characters in length. It should not begin, trailing or end with Special Characters or Whitespaces. Allowed Special Characters: (-)', 'info');
          } else if (response == 'Line No. Doesn\'t Exists') {
            swal('Requestor Account', `Cannot Add New Requestor Account. Line No. Doesn't Exists!`, 'error');
          } else if (response == 'ID No. Exists') {
            swal('Requestor Account', 'ID No. Exists', 'info');
          } else {
            console.log(response);
            swal('Requestor Account Error', `Call IT Personnel Immediately!!! They will fix it right away. Error: ${response}`, 'error');
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

const update_id_no = () => {
  var id = document.getElementById("u_id").value.trim();
  var id_no = document.getElementById("u_id_no").value.trim();
  let xhr = new XMLHttpRequest();
  let url = "../../process/admin/requestor-accounts_processor.php", type = "POST";
  var data = serialize({
    method: 'update_id_no',
    id:id,
    id_no:id_no
  });
  swal('Requestor Account', 'Loading please wait...', {
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
            swal('Requestor Account', 'Successfully Updated', 'success');
            load_data(1);
            clear_r_account_info_fields();
            $('#RAccountInfoModal').modal('hide');
          } else if (response == 'Invalid ID No.') {
            swal('Requestor Account', 'ID No. should be at least 8 characters in length. It should not begin, trailing or end with Special Characters or Whitespaces. Allowed Special Characters: (-)', 'info');
          } else if (response == 'ID No. Exists') {
            swal('Requestor Account', 'ID No. Exists', 'info');
          } else {
            console.log(response);
            swal('Requestor Account Error', `Call IT Personnel Immediately!!! They will fix it right away. Error: ${response}`, 'error');
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
  var section = document.getElementById("u_section").value;
  var car_model = document.getElementById("u_car_model").value;
  var line_no = document.getElementById("u_line_no").value.trim();
  var factory_area = document.getElementById("u_factory_area").value;
  var requestor = document.getElementById("u_requestor").value.trim();
  let xhr = new XMLHttpRequest();
  let url = "../../process/admin/requestor-accounts_processor.php", type = "POST";
  var data = serialize({
    method: 'update_data',
    id:id,
    name:name,
    section:section,
    car_model:car_model,
    line_no:line_no,
    factory_area:factory_area,
    requestor:requestor
  });
  swal('Requestor Account', 'Loading please wait...', {
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
            swal('Requestor Account', 'Successfully Updated', 'success');
            load_data(1);
            clear_r_account_info_fields();
            $('#RAccountInfoModal').modal('hide');
          } else if (response == 'Invalid Name') {
            swal('Requestor Account', 'Name should be at least 2 characters in length. It should not begin, trailing or end with Special Characters or Whitespaces. Allowed Special Characters (-\'.)', 'info');
          } else if (response == 'Section Not Set') {
            swal('Requestor Account', 'Please set Section', 'info');
          } else if (response == 'Car Model Empty') {
            swal('Requestor Account', 'Please fill out Car Model Field', 'info');
          } else if (response == 'Invalid Line No.') {
            swal('Requestor Account', 'Line No. should be at least 2 characters in length. It should not begin, trailing or end with Special Characters. Allowed Special Characters: \'(\' and \')\'', 'info');
          } else if (response == 'Factory Area Not Set') {
            swal('Requestor Account', 'Please set Factory Area', 'info');
          } else if (response == 'Invalid Requestor') {
            swal('Requestor Account', 'Requestor should be at least 2 characters in length. It should not begin, trailing or end with Special Characters or Whitespaces. Allowed Special Characters: (-)', 'info');
          } else if (response == 'Line No. Doesn\'t Exists') {
            swal('Requestor Account', `Cannot Update Requestor Account. Line No. Doesn't Exists!`, 'error');
          } else {
            console.log(response);
            swal('Requestor Account Error', `Call IT Personnel Immediately!!! They will fix it right away. Error: ${response}`, 'error');
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
  let url = "../../process/admin/requestor-accounts_processor.php", type = "POST";
  var data = serialize({
    method: 'delete_data',
    id:id
  });
  swal('Requestor Account', 'Loading please wait...', {
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
            swal('Requestor Account Information', 'Data Deleted', 'info');
            load_data(1);
            clear_r_account_info_fields();
            $('#deleteDataModal').modal('hide');
          } else {
            console.log(response);
            swal('Requestor Account Error', `Call IT Personnel Immediately!!! They will fix it right away. Error: ${response}`, 'error');
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