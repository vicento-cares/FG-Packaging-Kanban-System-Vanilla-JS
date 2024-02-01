// DOMContentLoaded function
document.addEventListener("DOMContentLoaded", () => {
  load_data(1);
  sessionStorage.setItem('saved_i_search', '');
  sessionStorage.setItem('notif_pending', 0);
  load_notification_fg();
  realtime_load_notification_fg = setInterval(load_notification_fg, 5000);
});

const get_details = el => {
  var id = el.dataset.id;
  var item_no = el.dataset.item_no;
  var item_name = el.dataset.item_name;
  var dimension = el.dataset.dimension;
  var size = el.dataset.size;
  var color = el.dataset.color;
  var pcs_bundle = el.dataset.pcs_bundle;
  var req_quantity = el.dataset.req_quantity;

  document.getElementById("u_id").value = id;
  document.getElementById("u_item_no").value = item_no;
  document.getElementById("u_item_name").value = item_name;
  document.getElementById("u_dimension").value = dimension;
  document.getElementById("u_size").value = size;
  document.getElementById("u_color").value = color;
  document.getElementById("u_pcs_bundle").value = pcs_bundle;
  document.getElementById("u_req_quantity").value = req_quantity;
}

const count_data = () => {
  var i_search = sessionStorage.getItem('saved_i_search');
  let xhr = new XMLHttpRequest();
  let url = "../../process/admin/packaging-materials_processor.php", type = "POST";
  var data = serialize({
    method: 'count_data',
    search: i_search
  });
  xhr.onreadystatechange = () => {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      let response = xhr.responseText;
      if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
        var total_rows = parseInt(response);
        let table_rows = parseInt(document.getElementById("packagingMaterialsData").childNodes.length);
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
      var id = document.getElementById("packagingMaterialsData").lastChild.getAttribute("id");
      var loader_count = parseInt(document.getElementById("loader_count").value);
      break;
    case 3:
      var i_search = document.getElementById("i_search").value.trim();
      if (i_search == '') {
        var continue_loading = false;
        swal('Packaging Materials Search', 'Fill out search input field', 'info');
      }
      break;
    case 4:
      var id = document.getElementById("packagingMaterialsData").lastChild.getAttribute("id");
      var i_search = sessionStorage.getItem('saved_i_search');
      var loader_count = parseInt(document.getElementById("loader_count").value);
      break;
    default:
  }
  if (continue_loading == true) {
    let xhr = new XMLHttpRequest();
    let url = "../../process/admin/packaging-materials_processor.php", type = "POST";
    var data = serialize({
      method: 'fetch_data',
      id: id,
      search: i_search,
      c: loader_count
    });
    switch (option) {
      case 1:
      case 3:
        var loading = `<tr><td colspan="6" style="text-align:center;"><div class="spinner-border text-dark" role="status"><span class="sr-only">Loading...</span></div></td></tr>`;
        document.getElementById("packagingMaterialsData").innerHTML = loading;
        break;
      default:
    }
    xhr.onreadystatechange = () => {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        let response = xhr.responseText;
        if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
          switch (option) {
            case 1:
              document.getElementById("packagingMaterialsData").innerHTML = response;
              document.getElementById("loader_count").value = 10;
              sessionStorage.setItem('saved_i_search', '');
              break;
            case 3:
              document.getElementById("packagingMaterialsData").innerHTML = response;
              document.getElementById("loader_count").value = 10;
              sessionStorage.setItem('saved_i_search', i_search);
              break;
            case 2:
            case 4:
              document.getElementById("packagingMaterialsData").insertAdjacentHTML('beforeend', response);
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

$("#AddPackagingMaterialsModal").on('hidden.bs.modal', e => {
  document.getElementById("i_item_no").value = '';
  document.getElementById("i_item_name").value = '';
  document.getElementById("i_dimension").value = '';
  document.getElementById("i_size").value = '';
  document.getElementById("i_color").value = '';
  document.getElementById("i_pcs_bundle").value = '';
  document.getElementById("i_req_quantity").value = '';
});

const clear_pkg_materials_info_fields = () => {
  document.getElementById("u_id").value = '';
  document.getElementById("u_item_no").value = '';
  document.getElementById("u_item_name").value = '';
  document.getElementById("u_dimension").value = '';
  document.getElementById("u_size").value = '';
  document.getElementById("u_color").value = '';
  document.getElementById("u_pcs_bundle").value = '';
  document.getElementById("u_req_quantity").value = '';
}

const save_data = () => {
  var item_no = document.getElementById("i_item_no").value.trim();
  var item_name = document.getElementById("i_item_name").value.trim();
  var dimension = document.getElementById("i_dimension").value.trim();
  var size = document.getElementById("i_size").value.trim();
  var color = document.getElementById("i_color").value.trim();
  var pcs_bundle = document.getElementById("i_pcs_bundle").value.trim();
  var req_quantity = document.getElementById("i_req_quantity").value;

  let xhr = new XMLHttpRequest();
  let url = "../../process/admin/packaging-materials_processor.php", type = "POST";
  var data = serialize({
    method: 'save_data',
    item_no:item_no,
    item_name:item_name,
    dimension:dimension,
    size:size,
    color:color,
    pcs_bundle:pcs_bundle,
    req_quantity:req_quantity
  });
  swal('Packaging Materials', 'Loading please wait...', {
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
            swal('Packaging Materials', 'Successfully Saved', 'success');
            load_data(1);
            $('#AddPackagingMaterialsModal').modal('hide');
          } else if (response == 'Invalid Item No.') {
            swal('Packaging Materials', 'Item No. should be numerical characters', 'info');
          } else if (response == 'Invalid Item Name') {
            swal('Packaging Materials', 'Item Name should be at least 8 characters in length', 'info');
          } else if (response == 'Invalid Pcs Bundle') {
            swal('Packaging Materials', 'Pcs / Bundle should be at least 3 characters in length', 'info');
          } else if (response == 'Req Qty Not Set') {
            swal('Packaging Materials', 'Please set Req Quantity', 'info');
          } else if (response == 'Already Exists') {
            swal('Packaging Materials', 'Item Name Already Exists', 'info');
          } else {
            console.log(response);
            swal('Packaging Materials Error', `Call IT Personnel Immediately!!! They will fix it right away. Error: ${response}`, 'error');
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
  var item_no = document.getElementById("u_item_no").value.trim();
  var item_name = document.getElementById("u_item_name").value.trim();
  var dimension = document.getElementById("u_dimension").value.trim();
  var size = document.getElementById("u_size").value.trim();
  var color = document.getElementById("u_color").value.trim();
  var pcs_bundle = document.getElementById("u_pcs_bundle").value.trim();
  var req_quantity = document.getElementById("u_req_quantity").value;

  let xhr = new XMLHttpRequest();
  let url = "../../process/admin/packaging-materials_processor.php", type = "POST";
  var data = serialize({
    method: 'update_data',
    id:id,
    item_no:item_no,
    item_name:item_name,
    dimension:dimension,
    size:size,
    color:color,
    pcs_bundle:pcs_bundle,
    req_quantity:req_quantity
  });
  swal('Packaging Materials', 'Loading please wait...', {
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
            swal('Packaging Materials', 'Successfully Updated', 'success');
            load_data(1);
            clear_pkg_materials_info_fields();
            $('#PackagingMaterialsInfoModal').modal('hide');
          } else if (response == 'Invalid Item Name') {
            swal('Packaging Materials', 'Item Name should be at least 8 characters in length', 'info');
          } else if (response == 'Invalid Pcs Bundle') {
            swal('Packaging Materials', 'Pcs / Bundle should be at least 3 characters in length', 'info');
          } else if (response == 'Req Qty Not Set') {
            swal('Packaging Materials', 'Please set Req Quantity', 'info');
          } else if (response == 'Already Exists') {
            swal('Packaging Materials', 'Item Name Already Exists', 'info');
          } else {
            console.log(response);
            swal('Packaging Materials Error', `Call IT Personnel Immediately!!! They will fix it right away. Error: ${response}`, 'error');
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
  var item_no = document.getElementById("u_item_no").value.trim();
  let url = "../../process/admin/packaging-materials_processor.php", type = "POST";
  var data = serialize({
    method: 'delete_data',
    id:id,
    item_no:item_no
  });
  swal('Packaging Materials', 'Loading please wait...', {
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
            swal('Packaging Materials Information', 'Data Deleted', 'info');
            load_data(1);
            clear_pkg_materials_info_fields();
            $('#deleteDataModal').modal('hide');
          } else if (response == 'Not Empty') {
            swal('Packaging Materials Info', `The inventory of this item from all storage areas are not empty`, 'info');
            $('#PackagingMaterialsInfoModal').modal('show');
            $('#deleteDataModal').modal('hide');
          } else if (response == 'Kanban Exists') {
            swal('Packaging Materials Info', `Registered Kanban of this item still exists. Please remove all Registered Kanban associated with this item before deletion.`, 'info');
            $('#PackagingMaterialsInfoModal').modal('show');
            $('#deleteDataModal').modal('hide');
          } else {
            console.log(response);
            swal('Packaging Materials Error', `Call IT Personnel Immediately!!! They will fix it right away. Error: ${response}`, 'error');
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