// Global Variables for Realtime Tables
var realtime_display_pending_on_fg;
var realtime_display_ongoing_on_fg;

// DOMContentLoaded function
document.addEventListener("DOMContentLoaded", () => {
  display_pending_on_fg();
  display_ongoing_on_fg();
  realtime_display_pending_on_fg = setInterval(display_pending_on_fg, 15000);
  realtime_display_ongoing_on_fg = setInterval(display_ongoing_on_fg, 30000);
  sessionStorage.setItem('notif_pending', 0);
  load_notification_fg_req();
  realtime_load_notification_fg_req = setInterval(load_notification_fg_req, 30000);
  update_notification_fg();
  document.getElementById("PrintKanbanModal").setAttribute('data-backdrop', 'static');
  document.getElementById("PrintKanbanModal").setAttribute('data-keyboard', 'false');
});

const display_pending_on_fg = () => {
  var section = document.getElementById("pending_section").value;
  let xhr = new XMLHttpRequest();
  let url = "../../process/requestor/requestor-requested_processor.php", type = "POST";
  var data = serialize({
    method: 'display_pending_on_fg',
    section:section,
    c:0
  });
  xhr.onreadystatechange = () => {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      let response = xhr.responseText;
      if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
        try {
          let response_array = JSON.parse(response);

          document.getElementById("pending_section").innerHTML = response_array.dropdown;

          document.getElementById("pendingRequestedData").innerHTML = response_array.data;

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
    clearInterval(realtime_display_pending_on_fg);
    setTimeout(() => {window.location.reload()}, 5000);
  };
  xhr.open(type, url, true);
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.send(data);
}

const display_ongoing_on_fg = () => {
  var section = document.getElementById("ongoing_section").value;
  let xhr = new XMLHttpRequest();
  let url = "../../process/requestor/requestor-requested_processor.php", type = "POST";
  var data = serialize({
    method: 'display_ongoing_on_fg',
    section:section,
    c:0
  });
  xhr.onreadystatechange = () => {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      let response = xhr.responseText;
      if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
        try {
          let response_array = JSON.parse(response);

          document.getElementById("ongoing_section").innerHTML = response_array.dropdown;

          document.getElementById("ongoingRequestedData").innerHTML = response_array.data;

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
    clearInterval(realtime_display_ongoing_on_fg);
    setTimeout(() => {window.location.reload()}, 5000);
  };
  xhr.open(type, url, true);
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.send(data);
}

$('#pendingRequestedTable').on('click', 'tbody tr', e => {
  e.currentTarget.classList.remove('table-primary');
});

$('#ongoingRequestedTable').on('click', 'tbody tr', e => {
  e.currentTarget.classList.remove('table-warning');
});

const view_pending_requested_details = el => {
  var request_id = el.dataset.request_id;
  document.getElementById("pendingRequestedDetailsData").innerHTML = '';
  let xhr = new XMLHttpRequest();
  let url = "../../process/requestor/requestor-requested_processor.php", type = "POST";
  var data = serialize({
    method: 'view_pending_requested_details',
    request_id:request_id
  });
  var loading = `<tr><td colspan="10" style="text-align:center;"><div class="spinner-border text-dark" role="status"><span class="sr-only">Loading...</span></div></td></tr>`;
  document.getElementById("pendingRequestedDetailsData").innerHTML = loading;
  xhr.onreadystatechange = () => {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      let response = xhr.responseText;
      if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
        try {
          let response_array = JSON.parse(response);
          document.getElementById("pending_request_id").value = request_id;
          document.getElementById("pendingRequestedDetailsData").innerHTML = response_array.data;
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

const view_ongoing_requested_details = el => {
  var request_id = el.dataset.request_id;
  document.getElementById("ongoingRequestedDetailsData").innerHTML = '';
  let xhr = new XMLHttpRequest();
  let url = "../../process/requestor/requestor-requested_processor.php", type = "POST";
  var data = serialize({
    method: 'view_ongoing_requested_details',
    request_id:request_id
  });
  var loading = `<tr><td colspan="10" style="text-align:center;"><div class="spinner-border text-dark" role="status"><span class="sr-only">Loading...</span></div></td></tr>`;
  document.getElementById("ongoingRequestedDetailsData").innerHTML = loading;
  xhr.onreadystatechange = () => {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      let response = xhr.responseText;
      if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
        try {
          let response_array = JSON.parse(response);
          document.getElementById("ongoing_request_id").value = request_id;
          document.getElementById("ongoingRequestedDetailsData").innerHTML = response_array.data;
          document.getElementById("ongoing_requestor_name").innerHTML = response_array.requestor_name;
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

// Remarks Modal (View)
const remarks_details_fg_view = el => {
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
  document.getElementById("btnViewRemarksDetailsFgModalClose1").setAttribute('data-target', data_target);
  document.getElementById("btnViewRemarksDetailsFgModalClose2").setAttribute('data-target', data_target);

  if (has_requestor_remarks == 1) {
    let xhr = new XMLHttpRequest();
    let url = "../../process/requestor/remarks_processor.php", type = "POST";
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
              document.getElementById("requestor_remarks_id1").value = response_array.requestor_remarks_id;
              document.getElementById("i_requestor_remarks1").value = response_array.requestor_remarks;
              sessionStorage.setItem('saved_requestor_remarks1', response_array.requestor_remarks);
              document.getElementById("remarks_requestor_date_time1").innerHTML = response_array.requestor_date_time;
              document.getElementById("remarks_requestor_name1").innerHTML = requestor_name;
              document.getElementById("i_requestor_remarks1").setAttribute('disabled', true);
              document.getElementById("btnSaveRemarks1").setAttribute('disabled', true);
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
    sessionStorage.setItem('saved_requestor_remarks1', '');
    document.getElementById("remarks_requestor_date_time1").innerHTML = 'N/A';
    document.getElementById("remarks_requestor_name1").innerHTML = '';
    document.getElementById("i_requestor_remarks1").setAttribute('disabled', true);
    document.getElementById("btnAddRemarks1").setAttribute('disabled', true);
  }

  document.getElementById("remarks_id1").value = id;
  document.getElementById("remarks_request_id1").value = request_id;
  document.getElementById("remarks_request_id_shown1").innerHTML = request_id;
  document.getElementById("remarks_kanban1").value = kanban;
  document.getElementById("remarks_kanban_no1").value = kanban_no;
  document.getElementById("remarks_serial_no1").value = serial_no;
  document.getElementById("remarks_scan_date_time1").value = scan_date_time;

  $('#ViewRemarksDetailsFgModal').modal({backdrop: 'static', keyboard: false});
}

// Remarks Modal (Pending - View)
$("#ViewRemarksDetailsFgModal").on('show.bs.modal', e => {
  setTimeout(() => {
    var max_length = document.getElementById("i_requestor_remarks1").getAttribute("maxlength");
    var remarks_length = document.getElementById("i_requestor_remarks1").value.length;
    var i_requestor_remarks_count = `${remarks_length} / ${max_length}`;
    document.getElementById("i_requestor_remarks_count1").innerHTML = i_requestor_remarks_count;
  }, 100);
});

// Remarks Modal (Pending - View)
$("#ViewRemarksDetailsFgModal").on('hidden.bs.modal', e => {
  document.getElementById("btnViewRemarksDetailsFgModalClose1").setAttribute('data-target', '');
  document.getElementById("btnViewRemarksDetailsFgModalClose2").setAttribute('data-target', '');
  sessionStorage.removeItem('saved_requestor_remarks1');
  document.getElementById("i_requestor_remarks1").value = '';
  document.getElementById("btnAddRemarks1").style.display = 'none';
  document.getElementById("btnAddRemarks1").setAttribute('disabled', true);
  document.getElementById("btnSaveRemarks1").style.display = 'none';
  document.getElementById("btnSaveRemarks1").setAttribute('disabled', true);
});

// Remarks Modal (Pending - View)
const count_requestor_remarks_char_view = () => {
  var max_length = document.getElementById("i_requestor_remarks1").getAttribute("maxlength");
  var requestor_remarks = document.getElementById("i_requestor_remarks1").value;
  var remarks_length = document.getElementById("i_requestor_remarks1").value.length;
  var saved_requestor_remarks = sessionStorage.getItem('saved_requestor_remarks1');
  var i_requestor_remarks_count = `${remarks_length} / ${max_length}`;
  document.getElementById("i_requestor_remarks_count1").innerHTML = i_requestor_remarks_count;
  if (remarks_length > 0) {
    document.getElementById("btnAddRemarks1").removeAttribute('disabled');
    if (saved_requestor_remarks != requestor_remarks) {
      document.getElementById("btnSaveRemarks1").removeAttribute('disabled');
    } else {
      document.getElementById("btnSaveRemarks1").setAttribute('disabled', true);
    }
  } else {
    document.getElementById("btnAddRemarks1").setAttribute('disabled', true);
    document.getElementById("btnSaveRemarks1").setAttribute('disabled', true);
  }
}

// uncheck all
const uncheck_all_pending = () => {
  var select_all = document.getElementById('check_all_pending');
  select_all.checked = false;
  document.querySelectorAll(".singleCheck").forEach((el, i) => {
    el.checked = false;
  });
  get_checked_pending();
}
// check all
const select_all_pending_func = () => {
  var select_all = document.getElementById('check_all_pending');
  if (select_all.checked == true) {
    console.log('check');
    document.querySelectorAll(".singleCheck").forEach((el, i) => {
      el.checked = true;
    });
  } else {
    console.log('uncheck');
    document.querySelectorAll(".singleCheck").forEach((el, i) => {
      el.checked = false;
    });
  }
  get_checked_pending();
}
// GET THE LENGTH OF CHECKED CHECKBOXES
const get_checked_pending = () => {
  var arr = [];
  document.querySelectorAll("input.singleCheck[type='checkbox']:checked").forEach((el, i) => {
    arr.push(el.value);
  });
  console.log(arr);
  var numberOfChecked = arr.length;
  if (numberOfChecked > 0) {
    document.getElementById("btnMarkAsOngoingRequest").removeAttribute('disabled');
  } else {
    document.getElementById("btnMarkAsOngoingRequest").setAttribute('disabled', true);
  }
}

const mark_as_ongoing_request_arr = () => {
  var request_id = $.trim($('#pending_request_id').val());
  var arr = [];
  document.querySelectorAll("input.singleCheck[type='checkbox']:checked").forEach((el, i) => {
    arr.push(el.value);
  });
  console.log(arr);

  var numberOfChecked = arr.length;
  if (numberOfChecked > 0) {
    let xhr = new XMLHttpRequest();
    let url = "../../process/requestor/requestor-requested_processor.php", type = "POST";
    var data = serialize({
      method: 'mark_as_ongoing_request_arr',
      request_id: request_id,
      requested_arr: arr
    });
    swal('Pending Request', 'Loading please wait...', {
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
            try {
              let response_array = JSON.parse(response);
              if (response_array.message == 'success') {
                scanned_kanban_id_arr = Object.values(response_array.scanned_kanban_id_arr);
                var kanban_printing_query = 'scanned_kanban_id_arr='+scanned_kanban_id_arr;
                document.getElementById("kanban_printing_option").value = 8;
                document.getElementById("kanban_printing_query").value = kanban_printing_query;
                $('#PrintKanbanModal').modal('show');
                swal('Pending Request', 'Status Changed Successfully', 'info');
                uncheck_all_pending();
                display_pending_on_fg();
                display_ongoing_on_fg();
              } else if (response_array.message == 'Inventory Limit Reached') {
                swal('Pending Request Error', `Inventory Limit Reached!!! One or more requested packaging materials reaches its limit before running out of inventory`, 'error');
                uncheck_all_pending();
                $("#PendingRequestDetailsFgModal").modal('show');
              } else {
                swal('Pending Request Error', `Error: ${response_array.message}`, 'error');
              }
            } catch(e) {
              console.log(response);
              swal('Pending Request Error', `Call IT Personnel Immediately!!! They will fix it right away. Error: ${response}`, 'error');
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
  } else {
    swal('Pending Request', `No checkbox checked`, 'info');
  }
}

// uncheck all
const uncheck_all_ongoing = () => {
  var select_all = document.getElementById('check_all_ongoing');
  select_all.checked = false;
  document.querySelectorAll(".singleCheck2").forEach((el, i) => {
    el.checked = false;
  });
  get_checked_ongoing();
}
// check all
const select_all_ongoing_func = () => {
  var select_all = document.getElementById('check_all_ongoing');
  if (select_all.checked == true) {
    console.log('check');
    document.querySelectorAll(".singleCheck2").forEach((el, i) => {
      el.checked = true;
    });
  } else {
    console.log('uncheck');
    document.querySelectorAll(".singleCheck2").forEach((el, i) => {
      el.checked = false;
    }); 
  }
  get_checked_ongoing();
}
// GET THE LENGTH OF CHECKED CHECKBOXES
const get_checked_ongoing = () => {
  var arr = [];
  document.querySelectorAll("input.singleCheck2[type='checkbox']:checked").forEach((el, i) => {
    arr.push(el.value);
  });
  console.log(arr);
  var numberOfChecked = arr.length;
  if (numberOfChecked > 0) {
    document.getElementById("btnPrintOngoing").removeAttribute('disabled');
    document.getElementById("btnStoreOutRequested").removeAttribute('disabled');
  } else {
    document.getElementById("btnPrintOngoing").setAttribute('disabled', true);
    document.getElementById("btnStoreOutRequested").setAttribute('disabled', true);
  }
}

const print_ongoing = () => {
  var arr = [];
  document.querySelectorAll("input.singleCheck2[type='checkbox']:checked").forEach((el, i) => {
    arr.push(el.value);
  });
  console.log(arr);

  var numberOfChecked = arr.length;
  if (numberOfChecked > 0) {
    scanned_kanban_id_arr = Object.values(arr);
    $('#OngoingRequestDetailsFgModal').modal('hide');
    var kanban_printing_query = 'scanned_kanban_id_arr='+scanned_kanban_id_arr;
    document.getElementById("kanban_printing_option").value = 8;
    document.getElementById("kanban_printing_query").value = kanban_printing_query;
    $('#PrintKanbanModal').modal('show');
    uncheck_all_ongoing();
  } else {
    swal('Ongoing Request', `No checkbox checked`, 'info');
  }
}

const store_out_requested_arr = () => {
  var request_id = document.getElementById("ongoing_request_id").value.trim();
  var store_out_person = getCookie('name');
  var arr = [];
  document.querySelectorAll("input.singleCheck2[type='checkbox']:checked").forEach((el, i) => {
    arr.push(el.value);
  });
  console.log(arr);

  var numberOfChecked = arr.length;
  if (numberOfChecked > 0) {
    let xhr = new XMLHttpRequest();
    let url = "../../process/requestor/requestor-requested_processor.php", type = "POST";
    var data = serialize({
      method: 'store_out_requested_arr',
      request_id: request_id,
      store_out_person: store_out_person,
      requested_arr: arr
    });
    swal('Ongoing Request', 'Loading please wait...', {
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
            try {
              let response_array = JSON.parse(response);
              if (response_array.message == 'success') {
                kanban_history_id_arr = Object.values(response_array.kanban_history_id_arr);
                var kanban_printing_query = 'kanban_history_id_arr='+kanban_history_id_arr;
                document.getElementById("kanban_printing_option").value = 9;
                document.getElementById("kanban_printing_query").value = kanban_printing_query;
                $('#PrintKanbanModal').modal('show');
                swal('Ongoing Request', 'Status Changed Successfully', 'info');
                document.getElementById("btnPrintOngoing").setAttribute('disabled', true);
                document.getElementById("btnStoreOutRequested").setAttribute('disabled', true);
                uncheck_all_ongoing();
                display_ongoing_on_fg();
              } else {
                swal('Ongoing Request Error', `Error: ${response_array.message}`, 'error');
              }
            } catch(e) {
              console.log(response);
              swal('Ongoing Request Error', `Call IT Personnel Immediately!!! They will fix it right away. Error: ${response}`, 'error');
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
  } else {
    swal('Ongoing Request', `No checkbox checked`, 'info');
  }
}