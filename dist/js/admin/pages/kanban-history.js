// DOMContentLoaded function
document.addEventListener("DOMContentLoaded", () => {
  get_section_dropdown_fg();
  get_line_datalist();
  get_items_datalist();
  sessionStorage.setItem('search_store_out_date_from', '');
  sessionStorage.setItem('search_store_out_date_to', '');
  sessionStorage.setItem('search_store_out_section', '');
  sessionStorage.setItem('search_store_out_line_no', '');
  sessionStorage.setItem('search_store_out_item_no', '');
  sessionStorage.setItem('search_store_out_item_name', '');
  sessionStorage.setItem('notif_pending', 0);
  load_notification_fg();
  realtime_load_notification_fg = setInterval(load_notification_fg, 5000);
});

const get_section_dropdown_fg = () => {
  let xhr = new XMLHttpRequest();
  let url = "../../process/admin/section_processor.php", type = "POST";
  var data = serialize({
    method: 'fetch_section_dropdown_fg'
  });
  xhr.onreadystatechange = () => {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      let response = xhr.responseText;
      if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
        document.getElementById("store_out_history_section").innerHTML = response;
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
        document.getElementById("i_store_out_lines").innerHTML = response;
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
        document.getElementById("i_store_out_items").innerHTML = response;
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

document.getElementById("i_store_out_line_no").addEventListener("keyup", e => {
  if (e.which === 13) {
    e.preventDefault();
    get_store_out_request_history(1);
  }
});

document.getElementById("i_store_out_item_no").addEventListener("keyup", e => {
  if (e.which === 13) {
    e.preventDefault();
    get_store_out_request_history(1);
  }
});

document.getElementById("i_store_out_item_name").addEventListener("keyup", e => {
  if (e.which === 13) {
    e.preventDefault();
    get_store_out_request_history(1);
  }
});

const count_store_out_request_history = () => {
  var store_out_date_from = sessionStorage.getItem('search_store_out_date_from');
  var store_out_date_to = sessionStorage.getItem('search_store_out_date_to');
  var section = sessionStorage.getItem('search_store_out_section');
  var line_no = sessionStorage.getItem('search_store_out_line_no');
  var item_no = sessionStorage.getItem('search_store_out_item_no');
  var item_name = sessionStorage.getItem('search_store_out_item_name');
  let xhr = new XMLHttpRequest();
  let url = "../../process/requestor/kanban-history_processor.php", type = "POST";
  var data = serialize({
    method: 'count_store_out_request_history',
    store_out_date_from: store_out_date_from,
    store_out_date_to: store_out_date_to,
    section: section,
    line_no: line_no,
    item_no: item_no,
    item_name: item_name
  });
  xhr.onreadystatechange = () => {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      let response = xhr.responseText;
      if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
        var total_rows = parseInt(response);
        let table_rows = parseInt(document.getElementById("storeOutRequestHistoryData").childNodes.length);
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
          document.getElementById("btnExportStoreOutRequestHistoryCsv").removeAttribute('disabled');
          document.getElementById("btnExportWithRemarks").removeAttribute('disabled');
        } else {
          document.getElementById("counter_view_search").style.display = 'none';
          document.getElementById("counter_view").style.display = 'none';
          document.getElementById("btnExportStoreOutRequestHistoryCsv").setAttribute('disabled', true);
          document.getElementById("btnExportWithRemarks").setAttribute('disabled', true);
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

const get_store_out_request_history = option => {
  var id = 0;
  var store_out_date_from = '';
  var store_out_date_to = '';
  var line_no = '';
  var item_no = '';
  var item_name = '';
  var section = '';
  var loader_count = 0;
  var continue_loading = true;
  switch (option) {
    case 1:
      var store_out_date_from = document.getElementById("i_store_out_date_from").value.trim();
      var store_out_date_to = document.getElementById("i_store_out_date_to").value.trim();
      var line_no = document.getElementById("i_store_out_line_no").value.trim();
      var item_no = document.getElementById("i_store_out_item_no").value.trim();
      var item_name = document.getElementById("i_store_out_item_name").value.trim();
      var section = document.getElementById("store_out_history_section").value;
      if (store_out_date_from == '' && store_out_date_to == '') {
        var continue_loading = false;
        swal('Store Out Request History Search', 'Fill out date fields to search for', 'info');
      }
      break;
    case 2:
      var id = document.getElementById("storeOutRequestHistoryData").lastChild.getAttribute("id");
      var store_out_date_from = sessionStorage.getItem('search_store_out_date_from');
      var store_out_date_to = sessionStorage.getItem('search_store_out_date_to');
      var section = sessionStorage.getItem('search_store_out_section');
      var line_no = sessionStorage.getItem('search_store_out_line_no');
      var item_no = sessionStorage.getItem('search_store_out_item_no');
      var item_name = sessionStorage.getItem('search_store_out_item_name');
      var loader_count = parseInt(document.getElementById("loader_count").value);
      break;
    default:
  }
  if (continue_loading == true) {
    let xhr = new XMLHttpRequest();
    let url = "../../process/requestor/kanban-history_processor.php", type = "POST";
    var data = serialize({
      method: 'get_store_out_request_history',
      id: id,
      store_out_date_from: store_out_date_from,
      store_out_date_to: store_out_date_to,
      line_no: line_no,
      item_no: item_no,
      item_name: item_name, 
      section: section,
      printing: 0,
      c: loader_count
    });
    if (option == 1) {
      var loading = `<tr><td colspan="14" style="text-align:center;"><div class="spinner-border text-dark" role="status"><span class="sr-only">Loading...</span></div></td></tr>`;
      document.getElementById("storeOutRequestHistoryData").innerHTML = loading;
    }
    xhr.onreadystatechange = () => {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        let response = xhr.responseText;
        if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
          switch (option) {
            case 1:
              document.getElementById("storeOutRequestHistoryData").innerHTML = response;
              document.getElementById("loader_count").value = 25;
              sessionStorage.setItem('search_store_out_date_from', store_out_date_from);
              sessionStorage.setItem('search_store_out_date_to', store_out_date_to);
              sessionStorage.setItem('search_store_out_section', section);
              sessionStorage.setItem('search_store_out_line_no', line_no);
              sessionStorage.setItem('search_store_out_item_no', item_no);
              sessionStorage.setItem('search_store_out_item_name', item_name);
              break;
            case 2:
              document.getElementById("storeOutRequestHistoryData").insertAdjacentHTML('beforeend', response);
              document.getElementById("loader_count").value = loader_count + 25;
              break;
            default:
          }
          count_store_out_request_history();
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

const export_store_out_request_history = with_remarks => {
  var store_out_date_from = sessionStorage.getItem('search_store_out_date_from');
  var store_out_date_to = sessionStorage.getItem('search_store_out_date_to');
  var section = sessionStorage.getItem('search_store_out_section');
  var line_no = sessionStorage.getItem('search_store_out_line_no');
  var item_no = sessionStorage.getItem('search_store_out_item_no');
  var item_name = sessionStorage.getItem('search_store_out_item_name');
  window.open('../../process/export/export_store_out_request_history.php?store_out_date_from='+store_out_date_from+'&&store_out_date_to='+store_out_date_to+'&&line_no='+line_no+'&&item_no='+item_no+'&&item_name='+item_name+'&&section='+section+'&&with_remarks='+with_remarks,'_blank');
}