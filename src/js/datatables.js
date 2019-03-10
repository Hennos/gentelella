/* DATA TABLES */

function _initDataTables() {
  console.log("run_datatables");

  if (typeof $.fn.DataTable === "undefined") {
    return;
  }
  console.log("init_DataTables");

  var handleDataTableButtons = function() {
    if ($("#datatable-buttons").length) {
      $("#datatable-buttons").DataTable({
        dom: "Blfrtip",
        buttons: [
          {
            extend: "copy",
            className: "btn-sm"
          },
          {
            extend: "csv",
            className: "btn-sm"
          },
          {
            extend: "excel",
            className: "btn-sm"
          },
          {
            extend: "pdfHtml5",
            className: "btn-sm"
          },
          {
            extend: "print",
            className: "btn-sm"
          }
        ],
        responsive: true
      });
    }
  };

  var TableManageButtons = (function() {
    "use strict";
    return {
      init: function() {
        handleDataTableButtons();
      }
    };
  })();

  $("#datatable").dataTable();

  $("#datatable-keytable").DataTable({
    keys: true
  });

  $("#datatable-responsive").DataTable();

  $("#datatable-scroller").DataTable({
    ajax: "js/datatables/json/scroller-demo.json",
    deferRender: true,
    scrollY: 380,
    scrollCollapse: true,
    scroller: true
  });

  $("#datatable-fixed-header").DataTable({
    fixedHeader: true
  });

  var $datatable = $("#datatable-checkbox");

  $datatable.dataTable({
    order: [[1, "asc"]],
    columnDefs: [{ orderable: false, targets: [0] }]
  });
  $datatable.on("draw.dt", function() {
    $("checkbox input").iCheck({
      checkboxClass: "icheckbox_flat-green"
    });
  });

  TableManageButtons.init();
}

function _initDocumentTemplatesTable() {
  if (typeof $.fn.DataTable === "undefined") {
    return;
  }

  $("#datatable-document-templates").DataTable({
    initComplete: function() {
      this.api()
        .columns()
        .every(function() {
          var column = this;
          var select = $('<select><option value=""></option></select>')
            .appendTo($(column.footer()).empty())
            .on("change", function() {
              var val = $.fn.dataTable.util.escapeRegex($(this).val());

              column.search(val ? "^" + val + "$" : "", true, false).draw();
            });

          column
            .data()
            .unique()
            .sort()
            .each(function(d, j) {
              select.append('<option value="' + d + '">' + d + "</option>");
            });
        });
    },
    columns: [
      {
        width: "35%"
      },
      {
        width: "30%"
      },
      {
        width: "30%"
      },
      {
        orderable: false
      }
    ],
    language: {
      lengthMenu: "Показать _MENU_ элементов на странице",
      zeroRecords: "Не найдено шаблонов документов",
      info: "Показать _PAGE_ из _PAGES_ страниц",
      infoEmpty: "Нет доступных шаблонов",
      search: "Поиск:",
      paginate: {
        first: "Первая",
        last: "Последняя",
        next: "Следующая",
        previous: "Предыдущая"
      },
      infoFiltered: ""
    }
  });
  console.log("_initDocumentTemplatesTable");
}

$("document").ready(function() {
  _initDataTables();
  _initDocumentTemplatesTable();
});
