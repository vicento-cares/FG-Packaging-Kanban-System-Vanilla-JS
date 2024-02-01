// Global Variables for Realtime Tables
var realtime_display_pending_on_section;
var realtime_display_ongoing_on_section;
var realtime_display_so_on_section;
var realtime_display_scanned; // global variable for realtime request modal table

// DOMContentLoaded function
document.addEventListener("DOMContentLoaded", () => {
  display_pending_on_section();
  display_ongoing_on_section();
  display_so_on_section();
  realtime_display_pending_on_section = setInterval(display_pending_on_section, 15000);
  realtime_display_ongoing_on_section = setInterval(display_ongoing_on_section, 30000);
  realtime_display_so_on_section = setInterval(display_so_on_section, 30000);
  sessionStorage.setItem('notif_ongoing', 0);
  sessionStorage.setItem('notif_store_out', 0);
  $('#RequestModal').modal("show");
  load_notification_section_req();
  realtime_load_notification_section_req = setInterval(load_notification_section_req, 30000);
  update_notification_section();
});

const display_pending_on_section = () => {
  var section = getCookie('section');
  let xhr = new XMLHttpRequest();
  let url = "../process/requestor/requestor-requested_processor.php", type = "POST";
  var data = serialize({
    method: 'display_pending_on_section',
    section:section,
    c:0
  });
  xhr.onreadystatechange = () => {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      let response = xhr.responseText;
      if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
        try {
          let response_array = JSON.parse(response);

          document.getElementById("pendingRequestData").innerHTML = response_array.data;

          var total_rows = parseInt(response_array.total);
          var total_rows_req = parseInt(response_array.total_req);

          if (total_rows != 0) {
            let counter_view_search = "";
            if (total_rows < 2) {
              counter_view_search = `<b>${total_rows}</b> Total Pending Request`;
            } else {
              counter_view_search = `<b>${total_rows}</b> Total Pending Requests`;
            }
            document.getElementById("counter_view_search").innerHTML = counter_view_search;
            document.getElementById("counter_view_search").style.display = 'block';
          } else {
            document.getElementById("counter_view_search").style.display = 'none';
          }

          if (total_rows_req != 0) {
            let counter_view_search_req = "";
            if (total_rows_req < 2) {
              counter_view_search_req = `<b>${total_rows_req}</b> Total Pending Request Group`;
            } else {
              counter_view_search_req = `<b>${total_rows_req}</b> Total Pending Request Groups`;
            }
            document.getElementById("counter_view_search_req").innerHTML = counter_view_search_req;
            document.getElementById("counter_view_search_req").style.display = 'block';
          } else {
            document.getElementById("counter_view_search_req").style.display = 'none';
          }
        } catch(e) {
          console.log(response);
          console.log(`Pending Request Error! Call IT Personnel Immediately!!! They will fix it right away. Error: ${response}`);
        }
      } else {
        console.log(xhr);
        console.log(`System Error! Call IT Personnel Immediately!!! They will fix it right away. Error: url: ${url}, method: ${type} ( HTTP ${xhr.status} - ${xhr.statusText} )`);
      }
    }
  };
  xhr.ontimeout = () => {
    console.log(xhr);
    console.log(`Error: url: ${url}, method: ${type} ( Connection / Request Timeout )`);
    clearInterval(realtime_display_pending_on_section);
    setTimeout(() => {window.location.reload()}, 5000);
  };
  xhr.open(type, url, true);
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.send(data);
}

const display_ongoing_on_section = () => {
  var section = getCookie('section');
  let xhr = new XMLHttpRequest();
  let url = "../process/requestor/requestor-requested_processor.php", type = "POST";
  var data = serialize({
    method: 'display_ongoing_on_section',
    section:section,
    c:0
  });
  xhr.onreadystatechange = () => {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      let response = xhr.responseText;
      if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
        try {
          let response_array = JSON.parse(response);

          document.getElementById("ongoingRequestData").innerHTML = response_array.data;

          var total_rows = parseInt(response_array.total);
          var total_rows_req = parseInt(response_array.total_req);

          if (total_rows != 0) {
            let counter_view_search2 = "";
            if (total_rows < 2) {
              counter_view_search2 = `<b>${total_rows}</b> Total Ongoing Request`;
            } else {
              counter_view_search2 = `<b>${total_rows}</b> Total Ongoing Requests`;
            }
            document.getElementById("counter_view_search2").innerHTML = counter_view_search2;
            document.getElementById("counter_view_search2").style.display = 'block';
          } else {
            document.getElementById("counter_view_search2").style.display = 'none';
          }

          if (total_rows_req != 0) {
            let counter_view_search_req2 = "";
            if (total_rows_req < 2) {
              counter_view_search_req2 = `<b>${total_rows_req}</b> Total Ongoing Request Group`;
            } else {
              counter_view_search_req2 = `<b>${total_rows_req}</b> Total Ongoing Request Groups`;
            }
            document.getElementById("counter_view_search_req2").innerHTML = counter_view_search_req2;
            document.getElementById("counter_view_search_req2").style.display = 'block';
          } else {
            document.getElementById("counter_view_search_req2").style.display = 'none';
          }
        } catch(e) {
          console.log(response);
          console.log(`Ongoing Request Error! Call IT Personnel Immediately!!! They will fix it right away. Error: ${response}`);
        }
      } else {
        console.log(xhr);
        console.log(`System Error! Call IT Personnel Immediately!!! They will fix it right away. Error: url: ${url}, method: ${type} ( HTTP ${xhr.status} - ${xhr.statusText} )`);
      }
    }
  };
  xhr.ontimeout = () => {
    console.log(xhr);
    console.log(`Error: url: ${url}, method: ${type} ( Connection / Request Timeout )`);
    clearInterval(realtime_display_ongoing_on_section);
    setTimeout(() => {window.location.reload()}, 5000);
  };
  xhr.open(type, url, true);
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.send(data);
}

const display_so_on_section = () => {
  var section = getCookie('section');
  let xhr = new XMLHttpRequest();
  let url = "../process/requestor/requestor-requested_processor.php", type = "POST";
  var data = serialize({
    method: 'display_so_on_section',
    section:section,
    c:0
  });
  xhr.onreadystatechange = () => {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      let response = xhr.responseText;
      if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
        document.getElementById("soRequestData").innerHTML = response;
      } else {
        console.log(xhr);
        console.log(`System Error! Call IT Personnel Immediately!!! They will fix it right away. Error: url: ${url}, method: ${type} ( HTTP ${xhr.status} - ${xhr.statusText} )`);
      }
    }
  };
  xhr.ontimeout = () => {
    console.log(xhr);
    console.log(`Error: url: ${url}, method: ${type} ( Connection / Request Timeout )`);
    clearInterval(realtime_display_so_on_section);
    setTimeout(() => {window.location.reload()}, 5000);
  };
  xhr.open(type, url, true);
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.send(data);
}

$('#pendingRequestTable').on('click', 'tbody tr', e => {
  e.currentTarget.classList.remove('table-primary');
});

$('#ongoingRequestTable').on('click', 'tbody tr', e => {
  e.currentTarget.classList.remove('table-warning');
});

$('#soRequestTable').on('click', 'tbody tr', e => {
  e.currentTarget.classList.remove('table-success');
});

const view_pending_request_details = request_id => {
  document.getElementById("pendingRequestDetailsData").innerHTML = '';
  let xhr = new XMLHttpRequest();
  let url = "../process/requestor/requestor-requested_processor.php", type = "POST";
  var data = serialize({
    method: 'view_pending_request_details',
    request_id:request_id
  });
  var loading = `<tr><td colspan="9" style="text-align:center;"><div class="spinner-border text-dark" role="status"><span class="sr-only">Loading...</span></div></td></tr>`;
  document.getElementById("pendingRequestDetailsData").innerHTML = loading;
  xhr.onreadystatechange = () => {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      let response = xhr.responseText;
      if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
        try {
          let response_array = JSON.parse(response);
          document.getElementById("pendingRequestDetailsData").innerHTML = response_array.data;
          document.getElementById("pending_requestor_name").innerHTML = response_array.requestor_name;
        } catch(e) {
          console.log(response);
          swal('Pending Request Error', `Call IT Personnel Immediately!!! They will fix it right away. Error: ${response}`, 'error');
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

const view_ongoing_request_details = el => {
  var request_id = el.dataset.request_id;
  document.getElementById("ongoingRequestDetailsData").innerHTML = '';
  let xhr = new XMLHttpRequest();
  let url = "../process/requestor/requestor-requested_processor.php", type = "POST";
  var data = serialize({
    method: 'view_ongoing_request_details',
    request_id:request_id
  });
  var loading = `<tr><td colspan="9" style="text-align:center;"><div class="spinner-border text-dark" role="status"><span class="sr-only">Loading...</span></div></td></tr>`;
  document.getElementById("ongoingRequestDetailsData").innerHTML = loading;
  xhr.onreadystatechange = () => {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      let response = xhr.responseText;
      if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
        try {
          let response_array = JSON.parse(response);
          document.getElementById("ongoingRequestDetailsData").innerHTML = response_array.data;
          document.getElementById("ongoing_requestor_name").innerHTML = response_array.requestor_name;
        } catch(e) {
          console.log(response);
          swal('Ongoing Request Error', `Call IT Personnel Immediately!!! They will fix it right away. Error: ${response}`, 'error');
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

const view_so_request_details = el => {
  var request_id = el.dataset.request_id;
  document.getElementById("soRequestDetailsData").innerHTML = '';
  let xhr = new XMLHttpRequest();
  let url = "../process/requestor/requestor-requested_processor.php", type = "POST";
  var data = serialize({
    method: 'view_so_request_details',
    request_id:request_id
  });
  var loading = `<tr><td colspan="12" style="text-align:center;"><div class="spinner-border text-dark" role="status"><span class="sr-only">Loading...</span></div></td></tr>`;
  document.getElementById("soRequestDetailsData").innerHTML = loading;
  xhr.onreadystatechange = () => {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      let response = xhr.responseText;
      if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
        try {
          let response_array = JSON.parse(response);
          document.getElementById("soRequestDetailsData").innerHTML = response_array.data;
          document.getElementById("so_requestor_name").innerHTML = response_array.requestor_name;
        } catch(e) {
          console.log(response);
          swal('Stored Out Request Error', `Call IT Personnel Immediately!!! They will fix it right away. Error: ${response}`, 'error');
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

const i_kanban_focus = () => {
  setTimeout(() => {
    document.getElementById("i_kanban").focus();
  }, 100);
}

const recursive_realtime_display_scanned = () => {
  load_recent_scanned();
  realtime_display_scanned = setTimeout(recursive_realtime_display_scanned, 10000);
}

$("#RequestModal").on('show.bs.modal', e => {
  var requestor_id_no = getCookie('id_no');
  var requestor_name = getCookie('requestor_name');
  var requestor = getCookie('requestor');
  var request_id = getCookie('request_id');
  document.getElementById("verified_id_no").value = requestor_id_no;
  document.getElementById("verified_requestor_name").value = requestor_name;
  document.getElementById("verified_requestor").value = requestor;
  document.getElementById("i_request_id").value = request_id;
  i_kanban_focus();
  recursive_realtime_display_scanned();
});

$("#RequestModal").on('hidden.bs.modal', e => {
  clearTimeout(realtime_display_scanned);
});

// Revisions (Vince)
var delay = (function(){
  var timer = 0;
  return function(callback, ms){
    clearTimeout (timer);
    timer = setTimeout(callback, ms);
  };
})();

document.getElementById("i_kanban").addEventListener("keyup", e => {
  delay(function(){
    if (e.which === 13){
      e.preventDefault();
      scanned_action();
    } else if (document.getElementById("i_kanban").value.length < 256) {
      document.getElementById("i_kanban").value = '';
    }
  }, 100);
});

const load_recent_scanned = () => {
  var requestor_id_no = getCookie('id_no');
  var section = getCookie('section');
  let xhr = new XMLHttpRequest();
  let url = "../process/requestor/requestor-request_processor.php", type = "POST";
  var data = serialize({
    method: 'load_recent_scanned',
    section: section,
    requestor_id_no: requestor_id_no
  });
  xhr.onreadystatechange = () => {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      let response = xhr.responseText;
      if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
        if (response != '') {
          document.getElementById("i_request_id").value = response;
          display_scanned();
        }
      } else {
        console.log(xhr);
        console.log(`System Error! Call IT Personnel Immediately!!! They will fix it right away. Error: url: ${url}, method: ${type} ( HTTP ${xhr.status} - ${xhr.statusText} )`);
      }
    }
  };
  xhr.ontimeout = () => {
    console.log(xhr);
    console.log(`Error: url: ${url}, method: ${type} ( Connection / Request Timeout )`);
    clearTimeout(realtime_display_scanned);
    setTimeout(() => {window.location.reload()}, 5000);
  };
  xhr.open(type, url, true);
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.send(data);
}

// Check and Create Request
const scanned_action = () => {
  var kanban = document.getElementById("i_kanban").value.trim();
  var requestor_id_no = document.getElementById("verified_id_no").value.trim();
  var requestor_name = document.getElementById("verified_requestor_name").value.trim();
  var requestor = document.getElementById("verified_requestor").value.trim();
  var request_id = document.getElementById("i_request_id").value.trim();
  var section = getCookie('section');
  let xhr = new XMLHttpRequest();
  let url = "../process/requestor/requestor-request_processor.php", type = "POST";
  var data = serialize({
    method: 'scanned_action',
    kanban:kanban,
    requestor_id_no:requestor_id_no,
    requestor_name:requestor_name,
    requestor:requestor,
    request_id:request_id,
    section:section
  });
  var loading = `Scan Kanban<span class="spinner-border spinner-border-sm ml-1" role="status" aria-hidden="true" id="loading"></span>`;
  document.getElementById("scan_kanban").innerHTML = loading;
  xhr.onreadystatechange = () => {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      let response = xhr.responseText;
      if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
        if (response == 'Please Scan Kanban') {
          swal('Request Info', `Please Scan Kanban`, 'info', {timer: 2000}).then(isConfirm => {document.getElementById("i_kanban").value = '';i_kanban_focus();return false;});
        } else if (response == 'Invalid Kanban') {
          swal('Request Error', `Invalid Kanban!!! If this happens again, call IT personnel immediately!`, 'error', {timer: 2000}).then(isConfirm => {document.getElementById("i_kanban").value = '';i_kanban_focus();return false;});
        } else if (response == 'Duplicated Entry') {
          swal('Request Info', `Duplicated Entry`, 'info', {timer: 2000}).then(isConfirm => {document.getElementById("i_kanban").value = '';i_kanban_focus();return false;});
        } else if (response == 'Already Requested') {
          swal('Request Info', `Already Requested`, 'info', {timer: 2000}).then(isConfirm => {document.getElementById("i_kanban").value = '';i_kanban_focus();return false;});
        } else if (response == 'Unregistered') {
          swal('Request Error', `Unregistered Kanban/Serial No.`, 'error', {timer: 2000}).then(isConfirm => {document.getElementById("i_kanban").value = '';i_kanban_focus();return false;});
        } else if (response == 'Wrong Section') {
          swal('Request Error', `Kanban/Serial No. Scanned In WRONG Section`, 'error', {timer: 2000}).then(isConfirm => {document.getElementById("i_kanban").value = '';i_kanban_focus();return false;});
        } else if (response == 'Multiple Line No.') {
          swal('Request Error', `Multiple Line No. Error!!! Cannot accept kanban that has different Line No. on your recent scanned kanban. Replace recent scanned kanban with this kanban or make a new request for this packaging material.`, 'error', {timer: 2000}).then(isConfirm => {document.getElementById("i_kanban").value = '';i_kanban_focus();return false;});
        } else if (response == 'Multiple Same Item') {
          swal('Request Error', `Multiple Same Item Error!!! Not duplicated entry but cannot accept kanban that has similar packaging material name on your recent scanned kanban. Replace recent scanned kanban with this kanban or make a new request for this packaging material.`, 'error', {timer: 2000}).then(isConfirm => {document.getElementById("i_kanban").value = '';i_kanban_focus();return false;});
        } else if (response == 'Request Limit Reached') {
          swal('Request Error', `Request Limit Reached!!! Request for this packaging material reaches its limit! Try again later or contact FG Personnel for more details.`, 'error', {timer: 2000}).then(isConfirm => {document.getElementById("i_kanban").value = '';i_kanban_focus();return false;});
        } else {
          try {
            let response_array = JSON.parse(response);
            if (response_array.message == 'success') {
              document.getElementById("i_request_id").value = response_array.request_id;
              display_scanned();
            } else {
              swal('Request Error', `Error: ${response_array.message}`, 'error');
            }
            console.log(response_array.message);
            document.getElementById("i_kanban").value = '';
            i_kanban_focus();
          } catch(e) {
            console.log(response);
            swal('Request Error', `Call IT Personnel Immediately!!! They will fix it right away. Error: ${response}`, 'error');
          }
        }
        document.getElementById("loading").removeAttribute('disabled');
      } else {
        console.log(xhr);
        swal('System Error', `Call IT Personnel Immediately!!! They will fix it right away. Error: url: ${url}, method: ${type} ( HTTP ${xhr.status} - ${xhr.statusText} ) Press F12 to see Console Log for more info.`, 'error');
        document.getElementById("loading").removeAttribute('disabled');
      }
    }
  };
  xhr.open(type, url, true);
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.send(data);
}

// Display Request on Table
const display_scanned = () => {
  var request_id = document.getElementById("i_request_id").value.trim();
  let xhr = new XMLHttpRequest();
  let url = "../process/requestor/requestor-request_processor.php", type = "POST";
  var data = serialize({
    method: 'display_scanned',
    request_id:request_id
  });
  var loading = `Scan Kanban<span class="spinner-border spinner-border-sm ml-1" role="status" aria-hidden="true" id="loading"></span>`;
  document.getElementById("scan_kanban").innerHTML = loading;
  xhr.onreadystatechange = () => {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      let response = xhr.responseText;
      if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
        try {
          let response_array = JSON.parse(response);
          if (response_array.message == 'success') {
            document.getElementById("scannedKanbanData").innerHTML = response_array.data;
            document.getElementById("current_request_id_shown").innerHTML = request_id;
            let table_rows = parseInt(document.getElementById("scannedKanbanData").childNodes.length);
            document.getElementById("current_total_kanban").innerHTML = table_rows;
            if (table_rows > 0) {
              document.getElementById("btnRequestScannedKanban").removeAttribute('disabled');
            } else {
              document.getElementById("btnRequestScannedKanban").setAttribute('disabled', true);
            }
          }
        } catch(e) {
          console.log(response);
          console.log(`Request Error! Call IT Personnel Immediately!!! They will fix it right away. Error: ${response}`);
        }
        document.getElementById("loading").remove();
      } else {
        console.log(xhr);
        console.log(`System Error! Call IT Personnel Immediately!!! They will fix it right away. Error: url: ${url}, method: ${type} ( HTTP ${xhr.status} - ${xhr.statusText} )`);
        document.getElementById("loading").remove();
      }
    }
  };
  xhr.ontimeout = () => {
    console.log(xhr);
    console.log(`Error: url: ${url}, method: ${type} ( Connection / Request Timeout )`);
    clearTimeout(realtime_display_scanned);
    setTimeout(() => {window.location.reload()}, 5000);
  };
  xhr.open(type, url, true);
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.send(data);
}

// Request Quantity
const quantity_details_section = el => {
  var request_id = el.dataset.request_id;
  var id = el.dataset.id;
  var quantity = el.dataset.quantity;
  var fixed_quantity = el.dataset.fixed_quantity;
  let xhr = new XMLHttpRequest();
  let url = "../process/requestor/requestor-request_processor.php", type = "POST";
  var data = serialize({
    method: 'quantity_details_section',
    id:id,
    request_id:request_id
  });
  xhr.onreadystatechange = () => {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      let response = xhr.responseText;
      if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
        if (response != '') {
          document.getElementById("i_request_limit_quantity").innerHTML = response;
          document.getElementById("i_req_limit_qty_row").style.display = 'block';
        } else {
          document.getElementById("i_req_limit_qty_row").style.display = 'none';
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

  document.getElementById("i_request_id_2").value = request_id;
  document.getElementById("i_request_quantity_id").value = id;
  document.getElementById("i_request_quantity").value = quantity;
  document.getElementById("i_request_quantity_max").innerHTML = fixed_quantity;
  $('#RequestQtyDetailsSectionModal').modal({backdrop: 'static', keyboard: false});
}

// Request Quantity
const update_request_quantity = () => {
  var id = document.getElementById("i_request_quantity_id").value.trim();
  var request_id = document.getElementById("i_request_id_2").value.trim();
  var quantity = document.getElementById("i_request_quantity").value.trim();
  let xhr = new XMLHttpRequest();
  let url = "../process/requestor/requestor-request_processor.php", type = "POST";
  var data = serialize({
    method: 'update_request_quantity',
    id:id,
    request_id:request_id,
    quantity:quantity
  });
  swal('Quantity', 'Loading please wait...', {
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
            swal('Quantity', 'Quantity Updated Successfully', 'success');
            display_scanned();
            $('#RequestQtyDetailsSectionModal').modal('hide');
            $('#RequestModal').modal('show');
          } else if (response == 'Zero Quantity') {
            swal('Quantity', `Cannot Proceed with Negative, Non Numerical or No Quantity`, 'info');
          } else if (response == 'Over Quantity') {
            swal('Quantity Error', `Cannot Save Quantity greater than previous quantity. Max Quantity is the Default Quantity Set on Kanban`, 'error');
          } else {
            console.log(response);
            swal('Quantity Error', `Call IT Personnel Immediately!!! They will fix it right away. Error: ${response}`, 'error');
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

// Remarks Modal
const remarks_details_section = el => {
  var id = el.dataset.id;
  var request_id = el.dataset.request_id;
  var kanban = el.dataset.kanban;
  var kanban_no = el.dataset.kanban_no;
  var serial_no = el.dataset.serial_no;
  var requestor_name = el.dataset.requestor_name;
  var scan_date_time = el.dataset.scan_date_time;
  var has_requestor_remarks = el.dataset.has_requestor_remarks;
  var is_history = el.dataset.is_history;
  var data_target = el.dataset.data_target;
  document.getElementById("btnRequestRemarksDetailsSectionModalClose1").setAttribute('data-target', data_target);
  document.getElementById("btnRequestRemarksDetailsSectionModalClose2").setAttribute('data-target', data_target);

  if (has_requestor_remarks == 1) {
    let xhr = new XMLHttpRequest();
    let url = "../process/requestor/remarks_processor.php", type = "POST";
    var data = serialize({
      method: 'get_requestor_remarks',
      request_id:request_id,
      kanban:kanban,
      serial_no:serial_no
    });
    xhr.onreadystatechange = () => {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        let response = xhr.responseText;
        if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
          try {
            let response_array = JSON.parse(response);
            if (response_array.message == 'success') {
              document.getElementById("requestor_remarks_id").value = response_array.requestor_remarks_id;
              document.getElementById("i_requestor_remarks").value = response_array.requestor_remarks;
              sessionStorage.setItem('saved_requestor_remarks', response_array.requestor_remarks);
              document.getElementById("remarks_requestor_date_time").innerHTML = response_array.requestor_date_time;
              document.getElementById("remarks_requestor_name").innerHTML = requestor_name;
              if (is_history != 1) {
                document.getElementById("btnSaveRemarks").style.display = 'block';
                document.getElementById("i_requestor_remarks").removeAttribute('disabled');
              } else {
                document.getElementById("i_requestor_remarks").setAttribute('disabled', true);
              }
              document.getElementById("btnSaveRemarks").setAttribute('disabled', true);
            }
          } catch(e) {
            console.log(response);
            swal('Remarks Error', `Call IT Personnel Immediately!!! They will fix it right away. Error: ${response}`, 'error');
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
  } else {
    sessionStorage.setItem('saved_requestor_remarks', '');
    document.getElementById("remarks_requestor_date_time").innerHTML = 'N/A';
    document.getElementById("remarks_requestor_name").innerHTML = '';
    if (is_history != 1) {
      document.getElementById("btnAddRemarks").style.display = 'block';
      document.getElementById("i_requestor_remarks").removeAttribute('disabled');
    } else {
      document.getElementById("i_requestor_remarks").setAttribute('disabled', true);
    }
    document.getElementById("btnAddRemarks").setAttribute('disabled', true);
  }

  document.getElementById("remarks_id").value = id;
  document.getElementById("remarks_request_id").value = request_id;
  document.getElementById("remarks_request_id_shown").innerHTML = request_id;
  document.getElementById("remarks_kanban").value = kanban;
  document.getElementById("remarks_kanban_no").value = kanban_no;
  document.getElementById("remarks_serial_no").value = serial_no;
  document.getElementById("remarks_scan_date_time").value = scan_date_time;

  $('#RequestRemarksDetailsSectionModal').modal({backdrop: 'static', keyboard: false});
}

// Remarks Modal
$("#RequestRemarksDetailsSectionModal").on('show.bs.modal', e => {
  setTimeout(() => {
    var max_length = document.getElementById("i_requestor_remarks").getAttribute("maxlength");
    var remarks_length = document.getElementById("i_requestor_remarks").value.length;
    var i_requestor_remarks_count = `${remarks_length} / ${max_length}`;
    document.getElementById("i_requestor_remarks_count").innerHTML = i_requestor_remarks_count;
  }, 100);
});

// Remarks Modal
$("#RequestRemarksDetailsSectionModal").on('hidden.bs.modal', e => {
  document.getElementById("btnRequestRemarksDetailsSectionModalClose1").setAttribute('data-target', '');
  document.getElementById("btnRequestRemarksDetailsSectionModalClose2").setAttribute('data-target', '');
  sessionStorage.removeItem('saved_requestor_remarks');
  document.getElementById("i_requestor_remarks").value = '';
  document.getElementById("btnAddRemarks").style.display = 'none';
  document.getElementById("btnAddRemarks").setAttribute('disabled', true);
  document.getElementById("btnSaveRemarks").style.display = 'none';
  document.getElementById("btnSaveRemarks").setAttribute('disabled', true);
});

// Remarks Modal
const count_requestor_remarks_char = () => {
  var max_length = document.getElementById("i_requestor_remarks").getAttribute("maxlength");
  var requestor_remarks = document.getElementById("i_requestor_remarks").value;
  var remarks_length = document.getElementById("i_requestor_remarks").value.length;
  var saved_requestor_remarks = sessionStorage.getItem('saved_requestor_remarks');
  var i_requestor_remarks_count = `${remarks_length} / ${max_length}`;
  document.getElementById("i_requestor_remarks_count").innerHTML = i_requestor_remarks_count;
  if (remarks_length > 0) {
    document.getElementById("btnAddRemarks").removeAttribute('disabled');
    if (saved_requestor_remarks != requestor_remarks) {
      document.getElementById("btnSaveRemarks").removeAttribute('disabled');
    } else {
      document.getElementById("btnSaveRemarks").setAttribute('disabled', true);
    }
  } else {
    document.getElementById("btnAddRemarks").setAttribute('disabled', true);
    document.getElementById("btnSaveRemarks").setAttribute('disabled', true);
  }
}

// Remarks Modal
const save_requestor_remarks = () => {
  var request_id = document.getElementById("remarks_request_id").value.trim();
  var kanban = document.getElementById("remarks_kanban").value.trim();
  var kanban_no = document.getElementById("remarks_kanban_no").value.trim();
  var serial_no = document.getElementById("remarks_serial_no").value.trim();
  var section = getCookie('section');
  var scan_date_time = document.getElementById("remarks_scan_date_time").value.trim();
  var requestor_remarks = document.getElementById("i_requestor_remarks").value.trim();
  var data_target = document.getElementById("btnRequestRemarksDetailsSectionModalClose1").getAttribute('data-target');
  
  let xhr = new XMLHttpRequest();
  let url = "../process/requestor/remarks_processor.php", type = "POST";
  var data = serialize({
    method: 'save_requestor_remarks',
    request_id:request_id,
    kanban:kanban,
    kanban_no:kanban_no,
    serial_no:serial_no,
    section:section,
    scan_date_time:scan_date_time,
    requestor_remarks:requestor_remarks,
    data_target:data_target
  });
  swal('Requestor Remarks', 'Loading please wait...', {
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
            swal('Requestor Remarks', 'Remarks Added Successfully', 'success');
            if (data_target == '#RequestModal') {
              display_scanned();
            } else if (data_target == '#PendingRequestDetailsSectionModal') {
              view_pending_request_details(request_id);
            }
            $('#RequestRemarksDetailsSectionModal').modal('hide');
            $(`${data_target}`).modal('show');
          } else if (response == 'Empty') {
            swal('Requestor Remarks', 'Please enter remarks', 'info');
          } else {
            console.log(response);
            swal('Requestor Remarks Error', `Call IT Personnel Immediately!!! They will fix it right away. Error: ${response}`, 'error');
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

// Remarks Modal
const update_requestor_remarks = () => {
  var request_id = document.getElementById("remarks_request_id").value.trim();
  var requestor_remarks_id = document.getElementById("requestor_remarks_id").value.trim();
  var requestor_remarks = document.getElementById("i_requestor_remarks").value.trim();
  var data_target = document.getElementById("btnRequestRemarksDetailsSectionModalClose1").getAttribute('data-target');
  
  let xhr = new XMLHttpRequest();
  let url = "../process/requestor/remarks_processor.php", type = "POST";
  var data = serialize({
    method: 'update_requestor_remarks',
    id:requestor_remarks_id,
    requestor_remarks:requestor_remarks
  });
  swal('Requestor Remarks', 'Loading please wait...', {
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
            swal('Requestor Remarks', 'Remarks Updated Successfully', 'success');
            if (data_target == '#RequestModal') {
              display_scanned();
            } else if (data_target == '#PendingRequestDetailsSectionModal') {
              view_pending_request_details(request_id);
            }
            $('#RequestRemarksDetailsSectionModal').modal('hide');
            $(`${data_target}`).modal('show');
          } else if (response == 'Empty') {
            swal('Requestor Remarks', 'Please enter remarks', 'info');
          } else {
            console.log(response);
            swal('Requestor Remarks Error', `Call IT Personnel Immediately!!! They will fix it right away. Error: ${response}`, 'error');
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

// Request Delete
const delete_single_scanned = el => {
  var request_id = el.dataset.request_id;
  var id = el.dataset.id;
  let xhr = new XMLHttpRequest();
  let url = "../process/requestor/requestor-request_processor.php", type = "POST";
  var data = serialize({
    method: 'delete_single_scanned',
    request_id:request_id,
    id:id
  });
  xhr.onreadystatechange = () => {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      let response = xhr.responseText;
      if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
        if (response == 'success') {
          display_scanned();
        } else {
          console.log(response);
          swal('Request Error', `Call IT Personnel Immediately!!! They will fix it right away. Error: ${response}`, 'error');
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

// Update Request to Pending
const update_scanned = () => {
  var requestor_id_no = document.getElementById("verified_id_no").value.trim();
  var requestor_name = document.getElementById("verified_requestor_name").value.trim();
  var requestor = document.getElementById("verified_requestor").value.trim();
  var request_id = document.getElementById("i_request_id").value.trim();
  let xhr = new XMLHttpRequest();
  let url = "../process/requestor/requestor-request_processor.php", type = "POST";
  var data = serialize({
    method: 'update_scanned',
    requestor_id_no:requestor_id_no,
    requestor_name:requestor_name,
    requestor:requestor,
    request_id:request_id
  });
  swal('Request Packaging Materials', 'Loading please wait...', {
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
            swal('Request Packaging Materials', 'Requested Successfully', 'success');
            document.getElementById("i_request_id").value = '';
            document.getElementById("verified_id_no").value = '';
            document.getElementById("verified_requestor_name").value = '';
            document.getElementById("verified_requestor").value = '';
            document.getElementById("scannedKanbanData").innerHTML = '';
            document.getElementById("current_request_id_shown").innerHTML = '';
            document.getElementById("current_total_kanban").innerHTML = '';
            document.getElementById("btnCloseScannedKanban").removeAttribute('disabled');
            document.getElementById("btnRequestScannedKanban").setAttribute('disabled', true);
            $('#RequestModal').modal('hide');
            display_pending_on_section();
          } else if (response == 'Limit Reached') {
            swal('Request Packaging Materials Error', `Cannot continue request when quantity is greater than the remaining quantity allowed for requesting. Please change quantity based on remaining quantity to all red rows!`, 'error');
          } else if (response == 'No Remarks') {
            swal('Request Packaging Materials', `Cannot continue request. Remarks is required for Kanban that has changed its quantity.`, 'info');
          } else {
            console.log(response);
            swal('Request Error', `Call IT Personnel Immediately!!! They will fix it right away. Error: ${response}`, 'error');
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