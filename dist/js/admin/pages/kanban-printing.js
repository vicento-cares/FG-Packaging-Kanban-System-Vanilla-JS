// DOMContentLoaded function
document.addEventListener("DOMContentLoaded", () => {
  get_section_dropdown_fg();
  get_batch_dropdown();
  get_line_dropdown();
  get_line_datalist();
  get_items_datalist();
  sessionStorage.setItem('search_print_category', '');
  sessionStorage.setItem('search_section', '');
  sessionStorage.setItem('search_batch_no', '');
  sessionStorage.setItem('search_line_no', '');
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
        document.getElementById("i_section_batch").innerHTML = response;
        document.getElementById("i_section_line").innerHTML = response;
        document.getElementById("i_section").innerHTML = response;
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

const get_batch_dropdown = () => {
  let xhr = new XMLHttpRequest();
  let url = "../../process/admin/kanban-printing_processor.php", type = "POST";
  var data = serialize({
    method: 'fetch_batch_dropdown'
  });
  xhr.onreadystatechange = () => {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      let response = xhr.responseText;
      if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
        document.getElementById("i_batch").innerHTML = response;
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

const get_line_dropdown = () => {
  let xhr = new XMLHttpRequest();
  let url = "../../process/admin/kanban-printing_processor.php", type = "POST";
  var data = serialize({
    method: 'fetch_line_dropdown'
  });
  xhr.onreadystatechange = () => {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      let response = xhr.responseText;
      if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
        document.getElementById("i_line").innerHTML = response;
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

const printing_category = () => {
  var category = document.getElementById("i_print_category").value;
  if (category == 'By Batch') {
    document.getElementById("i_batch").style.display = 'block';
    document.getElementById("i_line").style.display = 'none';
    document.getElementById("i_section").style.display = 'none';
    document.getElementById("i_section_line").style.display = 'none';
    document.getElementById("i_section_batch").style.display = 'block';
  } else if(category == 'By Line No.') {
    document.getElementById("i_line").style.display = 'block';
    document.getElementById("i_batch").style.display = 'none';
    document.getElementById("i_section_batch").style.display = 'none';
    document.getElementById("i_section").style.display = 'none';
    document.getElementById("i_section_line").style.display = 'block';
  } else if(category == 'By Latest Upload') {
    document.getElementById("i_line").style.display = 'none';
    document.getElementById("i_batch").style.display = 'none';
    document.getElementById("i_section_batch").style.display = 'none';
    document.getElementById("i_section_line").style.display = 'none';
    document.getElementById("i_section").style.display = 'block';
  }
  sessionStorage.setItem('search_print_category', category);
  load_kanban(1);
}

const count_kanban = () => {
  var section = sessionStorage.getItem('search_section');
  var batch_no = sessionStorage.getItem('search_batch_no');
  var line_no = sessionStorage.getItem('search_line_no');
  let xhr = new XMLHttpRequest();
  let url = "../../process/admin/kanban-printing_processor.php", type = "POST";
  var data = serialize({
    method: 'count_kanban',
    batch_no: batch_no,
    line_no: line_no,
    section: section
  });
  xhr.onreadystatechange = () => {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      let response = xhr.responseText;
      if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
        var total_rows = parseInt(response);
        let table_rows = parseInt(document.getElementById("kanbanRegData").childNodes.length);
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
          document.getElementById("btnPrintKbnByCat").removeAttribute('disabled');
        } else {
          document.getElementById("counter_view_search").style.display = 'none';
          document.getElementById("counter_view").style.display = 'none';
          document.getElementById("btnPrintKbnByCat").setAttribute('disabled', true);
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

const load_kanban = option => {
  var id = 0;
  var category = sessionStorage.getItem('search_print_category');
  var section = '';
  var batch_no = '';
  var line_no = '';
  var loader_count = 0;
  switch (option) {
    case 1:
      if (category == 'By Batch') {
        var batch_no = document.getElementById("i_batch").value;
        var section = document.getElementById("i_section_batch").value;
      } else if (category == 'By Line No.') {
        var line_no = document.getElementById("i_line").value;
        var section = document.getElementById("i_section_line").value;
      } else if (category == 'By Latest Upload') {
        var section = document.getElementById("i_section").value;
      }
      break;
    case 2:
      var id = document.getElementById("kanbanRegData").lastChild.getAttribute("id");
      var section = sessionStorage.getItem('search_section');
      var batch_no = sessionStorage.getItem('search_batch_no');
      var line_no = sessionStorage.getItem('search_line_no');
      var loader_count = parseInt(document.getElementById("loader_count").value);
      break;
    default:
  }
  let xhr = new XMLHttpRequest();
  let url = "../../process/admin/kanban-printing_processor.php", type = "POST";
  var data = serialize({
    method: 'fetch_kanban',
    id:id,
    batch_no:batch_no,
    line_no:line_no,
    section:section,
    c:loader_count
  });
  if (option == 1) {
    var loading = `<tr><td colspan="7" style="text-align:center;"><div class="spinner-border text-dark" role="status"><span class="sr-only">Loading...</span></div></td></tr>`;
    document.getElementById("kanbanRegData").innerHTML = loading;
  }
  xhr.onreadystatechange = () => {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      let response = xhr.responseText;
      if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
        switch (option) {
          case 1:
            document.getElementById("kanbanRegData").innerHTML = response;
            document.getElementById("loader_count").value = 25;
            sessionStorage.setItem('search_section', section);
            if (category == 'By Batch') {
              sessionStorage.setItem('search_batch_no', batch_no);
              sessionStorage.setItem('search_line_no', '');
            } else if (category == 'By Line No.') {
              sessionStorage.setItem('search_batch_no', '');
              sessionStorage.setItem('search_line_no', line_no);
            } else if (category == 'By Latest Upload') {
              sessionStorage.setItem('search_batch_no', '');
              sessionStorage.setItem('search_line_no', '');
            }
            uncheck_all_kanban();
            break;
          case 2:
            document.getElementById("kanbanRegData").insertAdjacentHTML('beforeend', response);
            document.getElementById("loader_count").value = loader_count + 25;
            break;
          default:
        }
        count_kanban();
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

// uncheck all
const uncheck_all_kanban = () => {
  var select_all = document.getElementById('check_all_kanban');
  select_all.checked = false;
  document.querySelectorAll(".singleCheck").forEach((el, i) => {
    el.checked = false;
  });
  get_checked_kanban();
}
// check all
const select_all_kanban_func = () => {
  var select_all = document.getElementById('check_all_kanban');
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
  get_checked_kanban();
}
// GET THE LENGTH OF CHECKED CHECKBOXES
const get_checked_kanban = () => {
  var arr = [];
  document.querySelectorAll("input.singleCheck[type='checkbox']:checked").forEach((el, i) => {
    arr.push(el.value);
  });
  console.log(arr);
  var numberOfChecked = arr.length;
  if (numberOfChecked > 0) {
    document.getElementById("btnPrintSelKbnByCat").removeAttribute('disabled');
  } else {
    document.getElementById("btnPrintSelKbnByCat").setAttribute('disabled', true);
  }
}

const print_selected_kanban_by_category = () => {
  var arr = [];
  document.querySelectorAll("input.singleCheck[type='checkbox']:checked").forEach((el, i) => {
    arr.push(el.value);
  });
  console.log(arr);
  var numberOfChecked = arr.length;
  if (numberOfChecked > 0) {
    kanban_reg_id_arr = Object.values(arr);
    var kanban_printing_query = 'kanban_reg_id_arr='+kanban_reg_id_arr;
    document.getElementById("kanban_printing_option").value = 2;
    document.getElementById("kanban_printing_query").value = kanban_printing_query;
    $('#PrintKanbanModal').modal('show');
    uncheck_all_kanban();
  } else {
    swal('Kanban Printing', `No checkbox checked`, 'info');
  }
}

const print_kanban_by_category = () => {
  var category = document.getElementById("i_print_category").value;
  var section = '';
  var kanban_printing_query = '';
  if (category == 'By Batch') {
    var batch_no = document.getElementById("i_batch").value;
    var section = document.getElementById("i_section_batch").value;
    var kanban_printing_query = 'batch_no='+batch_no+'&&section='+section;
    document.getElementById("kanban_printing_option").value = 3;
  } else if (category == 'By Line No.') {
    var line_no = document.getElementById("i_line").value;
    var section = document.getElementById("i_section_line").value;
    var kanban_printing_query = 'line_no='+line_no+'&&section='+section;
    document.getElementById("kanban_printing_option").value = 4;
  } else if (category == 'By Latest Upload') {
    var section = document.getElementById("i_section").value;
    var kanban_printing_query = 'section='+section;
    document.getElementById("kanban_printing_option").value = 5;
  }
  document.getElementById("kanban_printing_query").value = kanban_printing_query;
  $('#PrintKanbanModal').modal('show');
}

const print_single_kanban = id => {
  var kanban_printing_query = 'id='+id;
  document.getElementById("kanban_printing_option").value = 1;
  document.getElementById("kanban_printing_query").value = kanban_printing_query;
  $('#PrintKanbanModal').modal('show');
}

document.getElementById("i_store_out_line_no").addEventListener("keyup", e => {
  if (e.which === 13) {
    e.preventDefault();
    get_store_out_request_history_printing(1);
  }
});

document.getElementById("i_store_out_item_no").addEventListener("keyup", e => {
  if (e.which === 13) {
    e.preventDefault();
    get_store_out_request_history_printing(1);
  }
});

document.getElementById("i_store_out_item_name").addEventListener("keyup", e => {
  if (e.which === 13) {
    e.preventDefault();
    get_store_out_request_history_printing(1);
  }
});

const count_store_out_request_history_printing = () => {
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
          document.getElementById("btnPrintStoreOutRequestKbnHistory").removeAttribute('disabled');
        } else {
          document.getElementById("counter_view_search2").style.display = 'none';
          document.getElementById("counter_view2").style.display = 'none';
          document.getElementById("btnPrintStoreOutRequestKbnHistory").setAttribute('disabled', true);
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

const get_store_out_request_history_printing = option => {
  var id = 0;
  var store_out_date_from = '';
  var store_out_date_to = '';
  var line_no = '';
  var item_no = '';
  var item_name = '';
  var section = '';
  var loader_count2 = 0;
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
      var loader_count2 = parseInt(document.getElementById("loader_count2").value);
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
      printing: 1,
      c: loader_count2
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
              document.getElementById("loader_count2").value = 25;
              sessionStorage.setItem('search_store_out_date_from', store_out_date_from);
              sessionStorage.setItem('search_store_out_date_to', store_out_date_to);
              sessionStorage.setItem('search_store_out_section', section);
              sessionStorage.setItem('search_store_out_line_no', line_no);
              sessionStorage.setItem('search_store_out_item_no', item_no);
              sessionStorage.setItem('search_store_out_item_name', item_name);
              uncheck_all_kanban_history();
              break;
            case 2:
              document.getElementById("storeOutRequestHistoryData").insertAdjacentHTML('beforeend', response);
              document.getElementById("loader_count2").value = loader_count2 + 25;
              break;
            default:
          }
          count_store_out_request_history_printing();
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

// uncheck all
const uncheck_all_kanban_history = () => {
  var select_all = document.getElementById('check_all_kanban_history');
  select_all.checked = false;
  document.querySelectorAll(".singleCheck2").forEach((el, i) => {
    el.checked = false;
  });
  get_checked_kanban_history();
}
// check all
const select_all_kanban_history_func = () => {
  var select_all = document.getElementById('check_all_kanban_history');
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
  get_checked_kanban_history();
}
// GET THE LENGTH OF CHECKED CHECKBOXES
const get_checked_kanban_history = () => {
  var arr = [];
  document.querySelectorAll("input.singleCheck2[type='checkbox']:checked").forEach((el, i) => {
    arr.push(el.value);
  });
  console.log(arr);
  var numberOfChecked = arr.length;
  if (numberOfChecked > 0) {
    document.getElementById("btnPrintSelStoreOutRequestKbnHistory").removeAttribute('disabled');
  } else {
    document.getElementById("btnPrintSelStoreOutRequestKbnHistory").setAttribute('disabled', true);
  }
}

const print_selected_store_out_request_history = () => {
  var arr = [];
  document.querySelectorAll("input.singleCheck2[type='checkbox']:checked").forEach((el, i) => {
    arr.push(el.value);
  });
  console.log(arr);
  var numberOfChecked = arr.length;
  if (numberOfChecked > 0) {
    kanban_history_id_arr = Object.values(arr);
    var kanban_printing_query = 'kanban_history_id_arr='+kanban_history_id_arr;
    document.getElementById("kanban_printing_option").value = 9;
    document.getElementById("kanban_printing_query").value = kanban_printing_query;
    $('#PrintKanbanModal').modal('show');
    uncheck_all_kanban_history();
  } else {
    swal('Kanban Printing', `No checkbox checked`, 'info');
  }
}

const print_store_out_request_history = () => {
  var store_out_date_from = sessionStorage.getItem('search_store_out_date_from');
  var store_out_date_to = sessionStorage.getItem('search_store_out_date_to');
  var section = sessionStorage.getItem('search_store_out_section');
  var line_no = sessionStorage.getItem('search_store_out_line_no');
  var item_no = sessionStorage.getItem('search_store_out_item_no');
  var item_name = sessionStorage.getItem('search_store_out_item_name');

  var kanban_printing_query = 'store_out_date_from='+store_out_date_from+'&&store_out_date_to='+store_out_date_to+'&&line_no='+line_no+'&&item_no='+item_no+'&&item_name='+item_name+'&&section='+section+'&&c=0';
  document.getElementById("kanban_printing_option").value = 7;
  document.getElementById("kanban_printing_query").value = kanban_printing_query;
  $('#PrintKanbanModal').modal('show');
}

const print_single_kanban_history = id => {
  var kanban_printing_query = 'id='+id;
  document.getElementById("kanban_printing_option").value = 6;
  document.getElementById("kanban_printing_query").value = kanban_printing_query;
  $('#PrintKanbanModal').modal('show');
}