// DOMContentLoaded function
document.addEventListener("DOMContentLoaded", () => {
  get_line_datalist();
  get_items_datalist();
  get_items_dropdown();
  get_section_dropdown();
  get_area_dropdown();
  load_data(1);
  sessionStorage.setItem('saved_i_search_line_no', '');
  sessionStorage.setItem('saved_i_search_item_no', '');
  sessionStorage.setItem('saved_i_search_item_name', '');
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
        document.getElementById("i_search_lines").innerHTML = response;
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

const get_items_datalist = () => {
  let xhr = new XMLHttpRequest();
  let url = "../../process/admin/packaging-materials_processor.php", type = "POST";
  var data = serialize({
    method: 'fetch_items_datalist'
  });
  xhr.onreadystatechange = () => {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      let response = xhr.responseText;
      if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
        document.getElementById("i_search_items").innerHTML = response;
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

const get_items_dropdown = () => {
  let xhr = new XMLHttpRequest();
  let url = "../../process/admin/packaging-materials_processor.php", type = "POST";
  var data = serialize({
    method: 'fetch_items_dropdown'
  });
  xhr.onreadystatechange = () => {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      let response = xhr.responseText;
      if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
        document.getElementById("i_item_name").innerHTML = response;
        document.getElementById("u_item_name").innerHTML = response;
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

const get_area_dropdown = () => {
  let xhr = new XMLHttpRequest();
  let url = "../../process/admin/storage-area_processor.php", type = "POST";
  var data = serialize({
    method: 'fetch_area_dropdown'
  });
  xhr.onreadystatechange = () => {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      let response = xhr.responseText;
      if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
        document.getElementById("i_storage_area").innerHTML = response;
        document.getElementById("u_storage_area").innerHTML = response;
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
  var batch_no = el.dataset.batch_no;
  var kanban = el.dataset.kanban;
  var kanban_no = el.dataset.kanban_no;
  var serial_no = el.dataset.serial_no;
  var item_no = el.dataset.item_no;
  var item_name = el.dataset.item_name;
  var section = el.dataset.section;
  var line_no = el.dataset.line_no;
  var dimension = el.dataset.dimension;
  var size = el.dataset.size;
  var color = el.dataset.color;
  var quantity = el.dataset.quantity;
  var storage_area = el.dataset.storage_area;
  var req_limit = el.dataset.req_limit;
  var req_limit_qty = el.dataset.req_limit_qty;
  var req_limit_time = el.dataset.req_limit_time;

  document.getElementById("u_id").value = id;
  document.getElementById("u_item_no").value = item_no;
  document.getElementById("u_item_name").value = item_no;
  document.getElementById("u_section").value = section;
  document.getElementById("u_line_no").value = line_no;
  document.getElementById("u_dimension").value = dimension;
  document.getElementById("u_size").value = size;
  document.getElementById("u_color").value = color;
  document.getElementById("u_quantity").value = quantity;
  document.getElementById("u_storage_area").value = storage_area;
  document.getElementById("u_batch_no").value = batch_no;
  document.getElementById("u_kanban_no").value = kanban_no;
  document.getElementById("u_req_limit").value = req_limit;
  document.getElementById("u_req_limit_qty").value = req_limit_qty;
  document.getElementById("u_req_limit_time").value = req_limit_time;
}

const count_data = () => {
  var line_no = sessionStorage.getItem('saved_i_search_line_no');
  var item_no = sessionStorage.getItem('saved_i_search_item_no');
  var item_name = sessionStorage.getItem('saved_i_search_item_name');

  let xhr = new XMLHttpRequest();
  let url = "../../process/admin/kanban-registration_processor.php", type = "POST";
  var data = serialize({
    method: 'count_data',
    line_no: line_no,
    item_no: item_no,
    item_name: item_name
  });
  xhr.onreadystatechange = () => {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      let response = xhr.responseText;
      if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
        var total_rows = parseInt(response);
        let table_rows = parseInt(document.getElementById("kanbanRegData").childNodes.length);
        let loader_count = document.getElementById("loader_count").value;
        if (line_no == '' && item_no == '' && item_name == '') {
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
  var line_no = '';
  var item_no = '';
  var item_name = '';
  var loader_count = 0;
  var continue_loading = true;
  switch (option) {
    case 2:
      var id = document.getElementById("kanbanRegData").lastChild.getAttribute("id");
      var loader_count = parseInt(document.getElementById("loader_count").value);
      break;
    case 3:
      var line_no = document.getElementById("i_search_line_no").value.trim();
      var item_no = document.getElementById("i_search_item_no").value.trim();
      var item_name = document.getElementById("i_search_item_name").value.trim();
      if (line_no == '' && item_no == '' && item_name == '') {
        var continue_loading = false;
        swal('Kanban Registration Search', 'Fill out search input field', 'info');
      }
      break;
    case 4:
      var id = document.getElementById("kanbanRegData").lastChild.getAttribute("id");
      var line_no = sessionStorage.getItem('saved_i_search_line_no');
      var item_no = sessionStorage.getItem('saved_i_search_item_no');
      var item_name = sessionStorage.getItem('saved_i_search_item_name');
      var loader_count = parseInt(document.getElementById("loader_count").value);
      break;
    default:
  }
  if (continue_loading == true) {
    let xhr = new XMLHttpRequest();
    let url = "../../process/admin/kanban-registration_processor.php", type = "POST";
    var data = serialize({
      method: 'fetch_data',
      id: id,
      line_no: line_no,
      item_no: item_no,
      item_name: item_name,
      c: loader_count
    });
    switch (option) {
      case 1:
      case 3:
        var loading = `<tr><td colspan="7" style="text-align:center;"><div class="spinner-border text-dark" role="status"><span class="sr-only">Loading...</span></div></td></tr>`;
        document.getElementById("kanbanRegData").innerHTML = loading;
        break;
      default:
    }
    xhr.onreadystatechange = () => {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        let response = xhr.responseText;
        if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
          switch (option) {
            case 1:
              document.getElementById("kanbanRegData").innerHTML = response;
              document.getElementById("loader_count").value = 25;
              sessionStorage.setItem('saved_i_search_line_no', '');
              sessionStorage.setItem('saved_i_search_item_no', '');
              sessionStorage.setItem('saved_i_search_item_name', '');
              break;
            case 3:
              document.getElementById("kanbanRegData").innerHTML = response;
              document.getElementById("loader_count").value = 25;
              sessionStorage.setItem('saved_i_search_line_no', line_no);
              sessionStorage.setItem('saved_i_search_item_no', item_no);
              sessionStorage.setItem('saved_i_search_item_name', item_name);
              break;
            case 2:
            case 4:
              document.getElementById("kanbanRegData").insertAdjacentHTML('beforeend', response);
              document.getElementById("loader_count").value = loader_count + 25;
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

document.getElementById("i_search_line_no").addEventListener("keyup", e => {
  if (e.which === 13) {
    e.preventDefault();
    load_data(3);
  }
});

document.getElementById("i_search_item_no").addEventListener("keyup", e => {
  if (e.which === 13) {
    e.preventDefault();
    load_data(3);
  }
});

document.getElementById("i_search_item_name").addEventListener("keyup", e => {
  if (e.which === 13) {
    e.preventDefault();
    load_data(3);
  }
});

$("#AddKanbanModal").on('hidden.bs.modal', e => {
  document.getElementById("i_item_name").value = '';
  document.getElementById("i_section").value = '';
  document.getElementById("i_line_no").value = '';
  document.getElementById("i_dimension").value = '';
  document.getElementById("i_size").value = '';
  document.getElementById("i_color").value = '';
  document.getElementById("i_quantity").value = '';
  document.getElementById("i_storage_area").value = '';
  document.getElementById("i_req_limit").value = '';
});

const clear_kanban_info_fields = () => {
  document.getElementById("u_id").value = '';
  document.getElementById("u_item_no").value = '';
  document.getElementById("u_item_name").value = '';
  document.getElementById("u_section").value = '';
  document.getElementById("u_line_no").value = '';
  document.getElementById("u_dimension").value = '';
  document.getElementById("u_size").value = '';
  document.getElementById("u_color").value = '';
  document.getElementById("u_quantity").value = '';
  document.getElementById("u_storage_area").value = '';
  document.getElementById("u_kanban_no").value = '';
  document.getElementById("u_req_limit").value = '';
  document.getElementById("u_req_limit_qty").value = '';
  document.getElementById("u_req_limit_time").value = '';
}

const get_item_details = action => {
  var item_no = '';
  if (action == 'insert') {
    var item_no = document.getElementById("i_item_name").value;
  } else if (action == 'update') {
    var item_no = document.getElementById("u_item_name").value;
  }
  if (item_no != '') {
    let xhr = new XMLHttpRequest();
    let url = "../../process/admin/packaging-materials_processor.php", type = "POST";
    var data = serialize({
      method: 'get_item_details',
      item_no:item_no
    });
    xhr.onreadystatechange = () => {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        let response = xhr.responseText;
        if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
          try {
            let response_array = JSON.parse(response);
            if (action == 'insert') {
              document.getElementById("i_dimension").value = response_array.dimension;
              document.getElementById("i_size").value = response_array.size;
              document.getElementById("i_color").value = response_array.color;
              document.getElementById("i_quantity").value = response_array.quantity;
            } else if (action == 'update') {
              document.getElementById("u_dimension").value = response_array.dimension;
              document.getElementById("u_size").value = response_array.size;
              document.getElementById("u_color").value = response_array.color;
              document.getElementById("u_quantity").value = response_array.quantity;
            }
          } catch(e) {
            console.log(response);
            swal('Kanban Registration Error', `Call IT Personnel Immediately!!! They will fix it right away. Error: ${response}`, 'error');
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
            } else if (action == 'update') {
              document.getElementById("u_line_no").value = response_array.line_no;
              document.getElementById("u_section").value = response_array.section;
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
  var select_item_name = document.getElementById("i_item_name");
  var item_no = select_item_name.value;
  var item_name = select_item_name.options[select_item_name.selectedIndex].text;
  var section =document.getElementById("i_section").value;
  var line_no = document.getElementById("i_line_no").value.trim();
  var dimension = document.getElementById("i_dimension").value.trim();
  var size = document.getElementById("i_size").value.trim();
  var color = document.getElementById("i_color").value.trim();
  var quantity = document.getElementById("i_quantity").value.trim();
  var storage_area = document.getElementById("i_storage_area").value;
  var req_limit = document.getElementById("i_req_limit").value.trim();

  let xhr = new XMLHttpRequest();
  let url = "../../process/admin/kanban-registration_processor.php", type = "POST";
  var data = serialize({
    method: 'save_data',
    item_no:item_no,
    item_name:item_name,
    section:section,
    line_no:line_no,
    dimension:dimension,
    size:size,
    color:color,
    quantity:quantity,
    storage_area:storage_area,
    req_limit:req_limit
  });
  swal('Kanban Registration', 'Loading please wait...', {
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
            swal('Kanban Registration', 'Successfully Saved', 'success');
            load_data(1);
            $('#AddKanbanModal').modal('hide');
          } else if (response == 'Item Name Not Set') {
            swal('Kanban Registration', 'Please set Item Name', 'info');
          } else if (response == 'Invalid Line No.') {
            swal('Kanban Registration', 'Line No. should be at least 2 characters in length. It should not begin, trailing or end with Special Characters. Allowed Special Characters: \'(\' and \')\'', 'info');
          } else if (response == 'Area Not Set') {
            swal('Kanban Registration', 'Please set Storage Area', 'info');
          } else if (response == 'Zero Quantity') {
            swal('Kanban Registration', `Cannot Proceed with Zero, Negative, Non Numerical or No Quantity`, 'info');
          } else if (response == 'Line No. Doesn\'t Exists') {
            swal('Kanban Registration', `Cannot Register Kanban. Line No. Doesn't Exists!`, 'error');
          } else {
            console.log(response);
            swal('Kanban Registration Error', `Call IT Personnel Immediately!!! They will fix it right away. Error: ${response}`, 'error');
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
  var select_item_name = document.getElementById("u_item_name");
  var item_no = select_item_name.value;
  var item_name = select_item_name.options[select_item_name.selectedIndex].text;
  var section =document.getElementById("u_section").value;
  var line_no = document.getElementById("u_line_no").value.trim();
  var dimension = document.getElementById("u_dimension").value.trim();
  var size = document.getElementById("u_size").value.trim();
  var color = document.getElementById("u_color").value.trim();
  var quantity = document.getElementById("u_quantity").value.trim();
  var storage_area = document.getElementById("u_storage_area").value;
  var req_limit = document.getElementById("u_req_limit").value.trim();
  var req_limit_time = document.getElementById("u_req_limit_time").value.trim();

  let xhr = new XMLHttpRequest();
  let url = "../../process/admin/kanban-registration_processor.php", type = "POST";
  var data = serialize({
    method: 'update_data',
    id:id,
    item_no:item_no,
    item_name:item_name,
    section:section,
    line_no:line_no,
    dimension:dimension,
    size:size,
    color:color,
    quantity:quantity,
    storage_area:storage_area,
    req_limit:req_limit,
    req_limit_time:req_limit_time
  });
  swal('Kanban Registration', 'Loading please wait...', {
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
            swal('Kanban Registration', 'Successfully Updated', 'success');
            load_data(1);
            clear_kanban_info_fields();
            $('#KanbanInfoModal').modal('hide');
          } else if (response == 'Item Name Not Set') {
            swal('Kanban Registration', 'Please set Item Name', 'info');
          } else if (response == 'Invalid Line No.') {
            swal('Kanban Registration', 'Line No. should be at least 2 characters in length. It should not begin, trailing or end with Special Characters. Allowed Special Characters: \'(\' and \')\'', 'info');
          } else if (response == 'Area Not Set') {
            swal('Kanban Registration', 'Please set Storage Area', 'info');
          } else if (response == 'Zero Limit') {
            swal('Kanban Registration', `Cannot Proceed with Zero, Negative, Non Numerical or No Request Limit`, 'info');
          } else if (response == 'Zero Quantity') {
            swal('Kanban Registration', `Cannot Proceed with Zero, Negative, Non Numerical or No Quantity`, 'info');
          } else if (response == 'Line No. Doesn\'t Exists') {
            swal('Kanban Registration', `Cannot Register Kanban. Line No. Doesn't Exists!`, 'error');
          } else {
            console.log(response);
            swal('Kanban Registration Error', `Call IT Personnel Immediately!!! They will fix it right away. Error: ${response}`, 'error');
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
  let url = "../../process/admin/kanban-registration_processor.php", type = "POST";
  var data = serialize({
    method: 'delete_data',
    id:id
  });
  swal('Kanban Registration', 'Loading please wait...', {
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
            swal('Kanban Registration', 'Data Deleted', 'info');
            load_data(1);
            clear_kanban_info_fields();
            $('#deleteDataModal').modal('hide');
          } else {
            console.log(response);
            swal('Kanban Registration Error', `Call IT Personnel Immediately!!! They will fix it right away. Error: ${response}`, 'error');
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

const download_format = () => {
  window.open('../../process/export/export_kanban_reg_format.php','_blank');
}

$("#UploadCsvModal").on('hidden.bs.modal', e => {
  document.getElementById("file").value = '';
});

const upload_csv = () => {
  var file_form = document.getElementById('file_form');
  var form_data = new FormData(file_form);
  let xhr = new XMLHttpRequest();
  let url = "../../process/import/import_kanban_reg.php", type = "POST";
  swal('Upload CSV', 'Loading please wait...', {
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
          if (response != '') {
            swal('Upload CSV', `Error: ${response}`, 'error');
          } else {
            swal('Upload CSV', 'Uploaded and updated successfully', 'success');
            load_data(1);
            $('#UploadCsvModal').modal('hide');
          }
        }, 500);
      } else {
        console.log(xhr);
        swal('System Error', `Call IT Personnel Immediately!!! They will fix it right away. Error: url: ${url}, method: ${type} ( HTTP ${xhr.status} - ${xhr.statusText} ) Press F12 to see Console Log for more info.`, 'error');
      }
    }
  };
  xhr.open(type, url, true);
  xhr.send(form_data);
}

const print_single_kanban = () => {
  var id = document.getElementById("u_id").value.trim();
  var kanban_printing_query = 'id='+id;
  document.getElementById("kanban_printing_option").value = 1;
  document.getElementById("kanban_printing_query").value = kanban_printing_query;
  $('#PrintKanbanModal').modal('show');
}