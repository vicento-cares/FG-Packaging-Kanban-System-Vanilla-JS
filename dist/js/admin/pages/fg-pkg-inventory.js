// DOMContentLoaded function
document.addEventListener("DOMContentLoaded", () => {
  get_area_dropdown_fg();
  get_items_datalist();
  get_items_dropdown();
  get_suppliers_dropdown();
  get_area_dropdown();
  sessionStorage.setItem('notif_pending', 0);
  load_notification_fg();
  realtime_load_notification_fg = setInterval(load_notification_fg, 5000);
});

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
        document.getElementById("inv_items").innerHTML = response;
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
        document.getElementById("si_item_name").innerHTML = response;
        document.getElementById("so_item_name").innerHTML = response;
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

const get_suppliers_dropdown = () => {
  let xhr = new XMLHttpRequest();
  let url = "../../process/admin/suppliers_processor.php", type = "POST";
  var data = serialize({
    method: 'fetch_suppliers_dropdown'
  });
  xhr.onreadystatechange = () => {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      let response = xhr.responseText;
      if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
        document.getElementById("si_supplier_name").innerHTML = response;
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
        document.getElementById("si_storage_area").innerHTML = response;
        document.getElementById("so_storage_area").innerHTML = response;
        document.getElementById("so_to_storage_area").innerHTML = response;
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
        document.getElementById("inv_storage_area").innerHTML = response;
        get_inventory(1);
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
  var item_no = el.dataset.item_no;
  var item_name = el.dataset.item_name;
  var storage_area = el.dataset.storage_area;
  var quantity = el.dataset.quantity;
  var safety_stock = el.dataset.safety_stock;
  
  document.getElementById("u_id").value = id;
  document.getElementById("u_item_no").value = item_no;
  document.getElementById("u_item_name").value = item_name;
  document.getElementById("u_quantity").value = quantity;
  document.getElementById("u_storage_area").value = storage_area;
  document.getElementById("u_safety_stock").value = safety_stock;
}

const count_inventory = () => {
  var storage_area = sessionStorage.getItem('search_inv_storage_area');
  var item_no = sessionStorage.getItem('search_inv_item_no');
  var item_name = sessionStorage.getItem('search_inv_item_name');
  let xhr = new XMLHttpRequest();
  let url = "../../process/admin/inventory_processor.php", type = "POST";
  var data = serialize({
    method: 'count_inventory',
    storage_area:storage_area,
    item_no:item_no,
    item_name:item_name
  });
  xhr.onreadystatechange = () => {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      let response = xhr.responseText;
      if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
        var total_rows = parseInt(response);
        let table_rows = parseInt(document.getElementById("fgPkgInvData").childNodes.length);
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
          document.getElementById("btnExportFgPkgInvCsv").removeAttribute('disabled');
          document.getElementById("btnRefreshFgPkgInv").removeAttribute('disabled');
        } else {
          document.getElementById("counter_view_search").style.display = 'none';
          document.getElementById("counter_view").style.display = 'none';
          document.getElementById("btnExportFgPkgInvCsv").setAttribute('disabled', true);
          document.getElementById("btnRefreshFgPkgInv").setAttribute('disabled', true);
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

const get_inventory = option => {
  var id = 0;
  var storage_area = '';
  var item_no = '';
  var item_name = '';
  var loader_count = 0;
  switch (option) {
    case 1:
      var storage_area = document.getElementById("inv_storage_area").value;
      var item_no = document.getElementById("inv_item_no").value.trim();
      var item_name = document.getElementById("inv_item_name").value.trim();
      break;
    case 2:
      var id = document.getElementById("fgPkgInvData").lastChild.getAttribute("id");
      var storage_area = sessionStorage.getItem('search_inv_storage_area');
      var item_no = sessionStorage.getItem('search_inv_item_no');
      var item_name = sessionStorage.getItem('search_inv_item_name');
      var loader_count = parseInt(document.getElementById("loader_count").value);
      break;
    case 3:
      var storage_area = sessionStorage.getItem('search_inv_storage_area');
      var item_no = sessionStorage.getItem('search_inv_item_no');
      var item_name = sessionStorage.getItem('search_inv_item_name');
      break;
    default:
  }
  let xhr = new XMLHttpRequest();
  let url = "../../process/admin/inventory_processor.php", type = "POST";
  var data = serialize({
    method: 'get_inventory',
    id: id,
    storage_area:storage_area,
    item_no:item_no,
    item_name:item_name,
    c: loader_count
  });
  switch (option) {
    case 1:
    case 3:
      var loading = `<tr><td colspan="6" style="text-align:center;"><div class="spinner-border text-dark" role="status"><span class="sr-only">Loading...</span></div></td></tr>`;
      document.getElementById("fgPkgInvData").innerHTML = loading;
      break;
    default:
  }
  xhr.onreadystatechange = () => {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      let response = xhr.responseText;
      if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
        switch (option) {
          case 1:
          case 3:
            document.getElementById("fgPkgInvData").innerHTML = response;
            document.getElementById("loader_count").value = 50;
            sessionStorage.setItem('search_inv_storage_area', storage_area);
            sessionStorage.setItem('search_inv_item_no', item_no);
            sessionStorage.setItem('search_inv_item_name', item_name);
            break;
          case 2:
            document.getElementById("fgPkgInvData").insertAdjacentHTML('beforeend', response);
            document.getElementById("loader_count").value = loader_count + 50;
            break;
          default:
        }
        count_inventory();
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

document.getElementById("inv_item_no").addEventListener("keyup", e => {
  if (e.which === 13) {
    e.preventDefault();
    get_inventory(1);
  }
});

document.getElementById("inv_item_name").addEventListener("keyup", e => {
  if (e.which === 13) {
    e.preventDefault();
    get_inventory(1);
  }
});

$("#FgPkgInvInfoModal").on('hidden.bs.modal', e => {
  document.getElementById("u_id").value = '';
  document.getElementById("u_item_no").value = '';
  document.getElementById("u_item_name").value = '';
  document.getElementById("u_storage_area").value = '';
  document.getElementById("u_quantity").value = '';
  document.getElementById("u_safety_stock").value = '';
});

const update_safety_stock = () => {
  var id = document.getElementById("u_id").value.trim();
  var safety_stock = document.getElementById("u_safety_stock").value.trim();
  let xhr = new XMLHttpRequest();
  let url = "../../process/admin/inventory_processor.php", type = "POST";
  var data = serialize({
    method: 'update_safety_stock',
    id:id,
    safety_stock:safety_stock
  });
  swal('FG Packaging Inventory', 'Loading please wait...', {
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
            swal('FG Packaging Inventory', 'Successfully Updated', 'success');
            get_inventory(1);
            $('#FgPkgInvInfoModal').modal('hide');
          } else if (response == 'Zero Quantity') {
            swal('FG Packaging Inventory', `Cannot Proceed with Negative, Non Numerical or No Safety Stock`, 'info');
          } else {
            console.log(response);
            swal('FG Packaging Inventory Error', `Call IT Personnel Immediately!!! They will fix it right away. Error: ${response}`, 'error');
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

$("#FgPkgInvStoreInModal").on('hidden.bs.modal', e => {
  document.getElementById("si_item_name").value = '';
  document.getElementById("si_supplier_name").value = '';
  document.getElementById("si_invoice_no").value = '';
  document.getElementById("si_po_no").value = '';
  document.getElementById("si_dr_no").value = '';
  document.getElementById("si_quantity").value = '';
  document.getElementById("si_storage_area").value = '';
  document.getElementById("si_delivery_date_time").value = '';
  document.querySelectorAll("#si_reason").forEach((el, i) => {
    el.checked = false;
  });
});

$("#FgPkgInvTransferModal").on('hidden.bs.modal', e => {
  document.getElementById("so_item_name").value = '';
  document.getElementById("so_quantity").value = '';
  document.getElementById("so_storage_area").value = '';
  document.getElementById("so_to_storage_area").value = '';
});

const store_in = () => {
  var select_item_name = document.getElementById("si_item_name");
  var item_no = select_item_name.value;
  var item_name = select_item_name.options[select_item_name.selectedIndex].text;
  var supplier_name = document.getElementById("si_supplier_name").value;
  var invoice_no = document.getElementById("si_invoice_no").value.trim();
  var po_no = document.getElementById("si_po_no").value.trim();
  var dr_no = document.getElementById("si_dr_no").value.trim();
  var quantity = document.getElementById("si_quantity").value.trim();
  var storage_area = document.getElementById("si_storage_area").value;
  var delivery_date_time = document.getElementById("si_delivery_date_time").value.trim();
  var reason = '';
  document.querySelectorAll("#si_reason:checked").forEach((el, i) => {
    reason = el.value;
  });

  let xhr = new XMLHttpRequest();
  let url = "../../process/admin/inventory_processor.php", type = "POST";
  var data = serialize({
    method: 'store_in',
    item_no:item_no,
    item_name:item_name,
    supplier_name:supplier_name,
    invoice_no:invoice_no,
    po_no:po_no,
    dr_no:dr_no,
    quantity:quantity,
    storage_area:storage_area,
    reason:reason,
    delivery_date_time:delivery_date_time
  });
  swal('Store In', 'Loading please wait...', {
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
            swal('Store In', 'Stored In Successfully', 'success');
            get_inventory(1);
            $('#FgPkgInvStoreInModal').modal('hide');
          } else if (response == 'Item Name Not Set') {
            swal('Store In', 'Please set Item Name', 'info');
          } else if (response == 'Supplier Not Set') {
            swal('Store In', 'Please set Supplier Name', 'info');
          } else if (response == 'Area Not Set') {
            swal('Store In', 'Please set Storage Area', 'info');
          } else if (response == 'Invoice No. Empty') {
            swal('Store In', 'Please fill out Invoice No. Field', 'info');
          } else if (response == 'PO No. Empty') {
            swal('Store In', 'PO No. is required. The reason set needs PO No. to continue store in', 'info');
          } else if (response == 'DR No. Empty') {
            swal('Store In', 'Please fill out DR No. Field', 'info');
          } else if (response == 'Zero Quantity') {
            swal('Store In', `Cannot Proceed with Zero, Negative, Non Numerical or No Quantity`, 'info');
          } else if (response == 'Exists') {
            swal('Store In Error', `Cannot Proceed to Store In. Record Exists!`, 'error');
          } else {
            console.log(response);
            swal('Store In Error', `Call IT Personnel Immediately!!! They will fix it right away. Error: ${response}`, 'error');
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

const transfer = () => {
  var select_item_name = document.getElementById("so_item_name");
  var item_no = select_item_name.value;
  var item_name = select_item_name.options[select_item_name.selectedIndex].text;
  var quantity = document.getElementById("so_quantity").value.trim();
  var storage_area = document.getElementById("so_storage_area").value;
  var to_storage_area = document.getElementById("so_to_storage_area").value;

  let xhr = new XMLHttpRequest();
  let url = "../../process/admin/inventory_processor.php", type = "POST";
  var data = serialize({
    method: 'transfer',
    item_no:item_no,
    item_name:item_name,
    quantity:quantity,
    storage_area:storage_area,
    to_storage_area:to_storage_area
  });
  swal('Transfer', 'Loading please wait...', {
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
            swal('Transfer', 'Stored Out Successfully', 'success');
            get_inventory(1);
            $('#FgPkgInvTransferModal').modal('hide');
          } else if (response == 'Item Name Not Set') {
            swal('Transfer', 'Please set Item Name', 'info');
          } else if (response == 'Area Not Set') {
            swal('Transfer', 'Please set Storage Area', 'info');
          } else if (response == 'To Area Not Set') {
            swal('Transfer', 'Please set To Storage Area', 'info');
          } else if (response == 'Zero Quantity') {
            swal('Transfer', `Cannot Proceed with Zero, Negative, Non Numerical or No Quantity`, 'info');
          } else if (response == 'Insufficient Stock') {
            swal('Transfer Error', `Cannot Transfer with Insufficient Stock. The quantity to be transfered is greater than the actual item quantity.`, 'error');
          } else {
            console.log(response);
            swal('Transfer Error', `Call IT Personnel Immediately!!! They will fix it right away. Error: ${response}`, 'error');
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

const export_fg_pkg_inv = () => {
  var storage_area = sessionStorage.getItem('search_inv_storage_area');
  var item_no = sessionStorage.getItem('search_inv_item_no');
  var item_name = sessionStorage.getItem('search_inv_item_name');

  window.open('../../process/export/export_fg_pkg_inv.php?storage_area='+storage_area+'&&item_no='+item_no+'&&item_name='+item_name,'_blank');
}