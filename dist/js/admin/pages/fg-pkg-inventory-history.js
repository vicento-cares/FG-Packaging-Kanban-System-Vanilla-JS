// DOMContentLoaded function
document.addEventListener("DOMContentLoaded", () => {
  get_area_dropdown_fg();
  get_items_datalist();
  sessionStorage.setItem('search_store_in_date_from', '');
  sessionStorage.setItem('search_store_in_date_to', '');
  sessionStorage.setItem('search_si_storage_area', '');
  sessionStorage.setItem('search_si_item_no', '');
  sessionStorage.setItem('search_si_item_name', '');
  sessionStorage.setItem('search_store_out_date_from', '');
  sessionStorage.setItem('search_store_out_date_to', '');
  sessionStorage.setItem('search_so_storage_area', '');
  sessionStorage.setItem('search_so_remarks', '');
  sessionStorage.setItem('search_so_item_no', '');
  sessionStorage.setItem('search_so_item_name', '');
  sessionStorage.setItem('notif_pending', 0);
  load_notification_fg();
  realtime_load_notification_fg = setInterval(load_notification_fg, 5000);
});

const get_area_dropdown_fg = () => {
  let xhr = new XMLHttpRequest();
  let url = "../../process/admin/storage-area_processor.php", type = "POST";
  var data = serialize({
    method: 'fetch_area_dropdown_fg'
  });
  xhr.onreadystatechange = () => {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      let response = xhr.responseText;
      if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
        document.getElementById("si_storage_area").innerHTML = response;
        document.getElementById("so_storage_area").innerHTML = response;
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
        document.getElementById("si_items").innerHTML = response;
        document.getElementById("so_items").innerHTML = response;
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

const count_store_in = () => {
  var store_in_date_from = sessionStorage.getItem('search_store_in_date_from');
  var store_in_date_to = sessionStorage.getItem('search_store_in_date_to');
  var storage_area = sessionStorage.getItem('search_si_storage_area');
  var item_no = sessionStorage.getItem('search_si_item_no');
  var item_name = sessionStorage.getItem('search_si_item_name');
  let xhr = new XMLHttpRequest();
  let url = "../../process/admin/inventory-history_processor.php", type = "POST";
  var data = serialize({
    method: 'count_store_in',
    store_in_date_from:store_in_date_from,
    store_in_date_to:store_in_date_to,
    storage_area:storage_area,
    item_no:item_no,
    item_name:item_name
  });
  xhr.onreadystatechange = () => {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      let response = xhr.responseText;
      if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
        var total_rows = parseInt(response);
        let table_rows = parseInt(document.getElementById("siInvHistoryData").childNodes.length);
        let loader_count = document.getElementById("loader_count").value;
        document.getElementById("counter_view").style.display = 'none';
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
          document.getElementById("btnExportSiInvHistoryCsv").removeAttribute('disabled');
        } else {
          document.getElementById("counter_view_search").style.display = 'none';
          document.getElementById("counter_view").style.display = 'none';
          document.getElementById("btnExportSiInvHistoryCsv").setAttribute('disabled', true);
        }

        if (total_rows == 0) {
          document.getElementById("search_more_data").style.display = 'none';
        } else if (total_rows > loader_count) {
          document.getElementById("search_more_data").style.display = 'block';
        } else if (total_rows <= loader_count) {
          document.getElementById("search_more_data").style.display = 'none';
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

const count_store_out = () => {
  var store_out_date_from = sessionStorage.getItem('search_store_out_date_from');
  var store_out_date_to = sessionStorage.getItem('search_store_out_date_to');
  var storage_area = sessionStorage.getItem('search_so_storage_area');
  var remarks = sessionStorage.getItem('search_so_remarks');
  var item_no = sessionStorage.getItem('search_so_item_no');
  var item_name = sessionStorage.getItem('search_so_item_name');
  let xhr = new XMLHttpRequest();
  let url = "../../process/admin/inventory-history_processor.php", type = "POST";
  var data = serialize({
    method: 'count_store_out',
    store_out_date_from:store_out_date_from,
    store_out_date_to:store_out_date_to,
    storage_area:storage_area,
    remarks:remarks,
    item_no:item_no,
    item_name:item_name
  });
  xhr.onreadystatechange = () => {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      let response = xhr.responseText;
      if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
        var total_rows = parseInt(response);
        let table_rows = parseInt(document.getElementById("soInvHistoryData").childNodes.length);
        let loader_count2 = document.getElementById("loader_count2").value;
        document.getElementById("counter_view2").style.display = 'none';
        let counter_view2 = "";
        if (total_rows != 0) {
          let counter_view_search2 = "";
          if (total_rows < 2) {
            counter_view_search2 = `${total_rows} record found`;
            counter_view2 = `${table_rows} row of ${total_rows} record`;
          } else {
            counter_view_search2 = `${total_rows} records found`;
            counter_view2 = `${table_rows} rows of ${total_rows} records`;
          }
          document.getElementById("counter_view_search2").innerHTML = counter_view_search2;
          document.getElementById("counter_view_search2").style.display = 'block';
          document.getElementById("counter_view2").innerHTML = counter_view2;
          document.getElementById("counter_view2").style.display = 'block';
          document.getElementById("btnExportSoInvHistoryCsv").removeAttribute('disabled');
        } else {
          document.getElementById("counter_view_search2").style.display = 'none';
          document.getElementById("counter_view2").style.display = 'none';
          document.getElementById("btnExportSoInvHistoryCsv").setAttribute('disabled', true);
        }

        if (total_rows == 0) {
          document.getElementById("search_more_data2").style.display = 'none';
        } else if (total_rows > loader_count2) {
          document.getElementById("search_more_data2").style.display = 'block';
        } else if (total_rows <= loader_count2) {
          document.getElementById("search_more_data2").style.display = 'none';
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

const get_si_inventory_history = option => {
  var id = 0;
  var store_in_date_from = '';
  var store_in_date_to = '';
  var storage_area = '';
  var item_no = '';
  var item_name = '';
  var loader_count = 0;
  var continue_loading = true;
  switch (option) {
    case 1:
      var store_in_date_from = document.getElementById("store_in_date_from").value.trim();
      var store_in_date_to = document.getElementById("store_in_date_to").value.trim();
      var storage_area = document.getElementById("si_storage_area").value;
      var item_no = document.getElementById("si_item_no").value.trim();
      var item_name = document.getElementById("si_item_name").value.trim();
      if (store_in_date_from == '' && store_in_date_to == '') {
        var continue_loading = false;
        swal('Store In History Search', 'Fill out date fields to search for', 'info');
      }
      break;
    case 2:
      var id = document.getElementById("siInvHistoryData").lastChild.getAttribute("id");
      var store_in_date_from = sessionStorage.getItem('search_store_in_date_from');
      var store_in_date_to = sessionStorage.getItem('search_store_in_date_to');
      var storage_area = sessionStorage.getItem('search_si_storage_area');
      var item_no = sessionStorage.getItem('search_si_item_no');
      var item_name = sessionStorage.getItem('search_si_item_name');
      var loader_count = parseInt(document.getElementById("loader_count").value);
      break;
    default:
  }
  if (continue_loading == true) {
    let xhr = new XMLHttpRequest();
    let url = "../../process/admin/inventory-history_processor.php", type = "POST";
    var data = serialize({
      method: 'get_si_inventory_history',
      id: id,
      store_in_date_from:store_in_date_from,
      store_in_date_to:store_in_date_to,
      storage_area:storage_area,
      item_no:item_no,
      item_name:item_name,
      c: loader_count
    });
    if (option == 1) {
      var loading = `<tr><td colspan="15" style="text-align:center;"><div class="spinner-border text-dark" role="status"><span class="sr-only">Loading...</span></div></td></tr>`;
      document.getElementById("siInvHistoryData").innerHTML = loading;
    }
    xhr.onreadystatechange = () => {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        let response = xhr.responseText;
        if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
          switch (option) {
            case 1:
              document.getElementById("siInvHistoryData").innerHTML = response;
              document.getElementById("loader_count").value = 25;
              sessionStorage.setItem('search_store_in_date_from', store_in_date_from);
              sessionStorage.setItem('search_store_in_date_to', store_in_date_to);
              sessionStorage.setItem('search_si_storage_area', storage_area);
              sessionStorage.setItem('search_si_item_no', item_no);
              sessionStorage.setItem('search_si_item_name', item_name);
              break;
            case 2:
              document.getElementById("siInvHistoryData").insertAdjacentHTML('beforeend', response);
              document.getElementById("loader_count").value = loader_count + 25;
              break;
            default:
          }
          count_store_in();
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

const get_so_inventory_history = option => {
  var id = 0;
  var store_out_date_from = '';
  var store_out_date_to = '';
  var storage_area = '';
  var remarks = '';
  var item_no = '';
  var item_name = '';
  var loader_count2 = 0;
  var continue_loading = true;
  switch (option) {
    case 1:
      var store_out_date_from = document.getElementById("store_out_date_from").value.trim();
      var store_out_date_to = document.getElementById("store_out_date_to").value.trim();
      var storage_area = document.getElementById("so_storage_area").value;
      var remarks = document.getElementById("so_remarks").value;
      var item_no = document.getElementById("so_item_no").value.trim();
      var item_name = document.getElementById("so_item_name").value.trim();
      if (store_out_date_from == '' && store_out_date_to == '') {
        var continue_loading = false;
        swal('Store Out Request History Search', 'Fill out date fields to search for', 'info');
      }
      break;
    case 2:
      var id = document.getElementById("soInvHistoryData").lastChild.getAttribute("id");
      var store_out_date_from = sessionStorage.getItem('search_store_out_date_from');
      var store_out_date_to = sessionStorage.getItem('search_store_out_date_to');
      var storage_area = sessionStorage.getItem('search_so_storage_area');
      var remarks = sessionStorage.getItem('search_so_remarks');
      var item_no = sessionStorage.getItem('search_so_item_no');
      var item_name = sessionStorage.getItem('search_so_item_name');
      var loader_count2 = parseInt(document.getElementById("loader_count2").value);
      break;
    default:
  }
  if (continue_loading == true) {
    let xhr = new XMLHttpRequest();
    let url = "../../process/admin/inventory-history_processor.php", type = "POST";
    var data = serialize({
      method: 'get_so_inventory_history',
      id: id,
      store_out_date_from:store_out_date_from,
      store_out_date_to:store_out_date_to,
      storage_area:storage_area,
      remarks:remarks,
      item_no:item_no,
      item_name:item_name,
      c: loader_count2
    });
    if (option == 1) {
      var loading = `<tr><td colspan="10" style="text-align:center;"><div class="spinner-border text-dark" role="status"><span class="sr-only">Loading...</span></div></td></tr>`;
      document.getElementById("soInvHistoryData").innerHTML = loading;
    }
    xhr.onreadystatechange = () => {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        let response = xhr.responseText;
        if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
          switch (option) {
            case 1:
              document.getElementById("soInvHistoryData").innerHTML = response;
              document.getElementById("loader_count2").value = 25;
              sessionStorage.setItem('search_store_out_date_from', store_out_date_from);
              sessionStorage.setItem('search_store_out_date_to', store_out_date_to);
              sessionStorage.setItem('search_so_storage_area', storage_area);
              sessionStorage.setItem('search_so_remarks', remarks);
              sessionStorage.setItem('search_so_item_no', item_no);
              sessionStorage.setItem('search_so_item_name', item_name);
              break;
            case 2:
              document.getElementById("soInvHistoryData").insertAdjacentHTML('beforeend', response);
              document.getElementById("loader_count2").value = loader_count2 + 25;
              break;
            default:
          }
          count_store_out();
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

document.getElementById("si_item_no").addEventListener("keyup", e => {
  if (e.which === 13) {
    e.preventDefault();
    get_si_inventory_history(1);
  }
});

document.getElementById("si_item_name").addEventListener("keyup", e => {
  if (e.which === 13) {
    e.preventDefault();
    get_si_inventory_history(1);
  }
});

document.getElementById("so_item_no").addEventListener("keyup", e => {
  if (e.which === 13) {
    e.preventDefault();
    get_so_inventory_history(1);
  }
});

document.getElementById("so_item_name").addEventListener("keyup", e => {
  if (e.which === 13) {
    e.preventDefault();
    get_so_inventory_history(1);
  }
});

const export_si_inventory_history = () => {
  var store_in_date_from = sessionStorage.getItem('search_store_in_date_from');
  var store_in_date_to = sessionStorage.getItem('search_store_in_date_to');
  var storage_area = sessionStorage.getItem('search_si_storage_area');
  var item_no = sessionStorage.getItem('search_si_item_no');
  var item_name = sessionStorage.getItem('search_si_item_name');

  window.open('../../process/export/export_si_inventory_history.php?store_in_date_from='+store_in_date_from+'&&store_in_date_to='+store_in_date_to+'&&storage_area='+storage_area+'&&item_no='+item_no+'&&item_name='+item_name,'_blank');
}

const export_so_inventory_history = () => {
  var store_out_date_from = sessionStorage.getItem('search_store_out_date_from');
  var store_out_date_to = sessionStorage.getItem('search_store_out_date_to');
  var storage_area = sessionStorage.getItem('search_so_storage_area');
  var remarks = sessionStorage.getItem('search_so_remarks');
  var item_no = sessionStorage.getItem('search_so_item_no');
  var item_name = sessionStorage.getItem('search_so_item_name');

  window.open('../../process/export/export_so_inventory_history.php?store_out_date_from='+store_out_date_from+'&&store_out_date_to='+store_out_date_to+'&&storage_area='+storage_area+'&&remarks='+remarks+'&&item_no='+item_no+'&&item_name='+item_name,'_blank');
}

const po_no_details = el => {
  var id = el.dataset.id;
  var po_no = el.dataset.po_no;

  document.getElementById("u_store_in_id").value = id;
  document.getElementById("u_store_in_po_no").value = po_no;
}

$("#StoreInPoNoDetailsModal").on('hidden.bs.modal', e => {
  document.getElementById("u_store_in_id").value = '';
  document.getElementById("u_store_in_po_no").value = '';
});

const update_po_no = () => {
  var id = document.getElementById("u_store_in_id").value.trim();
  var po_no = document.getElementById("u_store_in_po_no").value.trim();
  let xhr = new XMLHttpRequest();
  let url = "../../process/admin/inventory-history_processor.php", type = "POST";
  var data = serialize({
    method: 'update_po_no',
    id:id,
    po_no:po_no
  });
  swal('Store In History', 'Loading please wait...', {
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
            swal('Store In History', 'Successfully Updated', 'success');
            get_si_inventory_history();
            $('#StoreInPoNoDetailsModal').modal('hide');
          } else {
            console.log(response);
            swal('Store In History Error', `Call IT Personnel Immediately!!! They will fix it right away. Error: ${response}`, 'error');
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