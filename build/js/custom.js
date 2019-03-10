'use strict';

/**
 * Resize function without multiple trigger
 * 
 * Usage:
 * $(window).smartresize(function(){  
 *     // code here
 * });
 */
(function ($, sr) {
  // debouncing function from John Hann
  // http://unscriptable.com/index.php/2009/03/20/debouncing-javascript-methods/
  var debounce = function debounce(func, threshold, execAsap) {
    var timeout;

    return function debounced() {
      var obj = this,
          args = arguments;
      function delayed() {
        if (!execAsap) func.apply(obj, args);
        timeout = null;
      }

      if (timeout) clearTimeout(timeout);else if (execAsap) func.apply(obj, args);

      timeout = setTimeout(delayed, threshold || 100);
    };
  };

  // smartresize 
  jQuery.fn[sr] = function (fn) {
    return fn ? this.bind('resize', debounce(fn)) : this.trigger(sr);
  };
})(jQuery, 'smartresize');
/**
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var CURRENT_URL = window.location.href.split('#')[0].split('?')[0],
    $BODY = $('body'),
    $MENU_TOGGLE = $('#menu_toggle'),
    $SIDEBAR_MENU = $('#sidebar-menu'),
    $SIDEBAR_FOOTER = $('.sidebar-footer'),
    $LEFT_COL = $('.left_col'),
    $RIGHT_COL = $('.right_col'),
    $NAV_MENU = $('.nav_menu'),
    $FOOTER = $('footer');

// Sidebar
$(document).ready(function () {
  // TODO: This is some kind of easy fix, maybe we can improve this
  var setContentHeight = function setContentHeight() {
    // reset height
    $RIGHT_COL.css('min-height', $(window).height());

    var bodyHeight = $BODY.outerHeight(),
        footerHeight = $BODY.hasClass('footer_fixed') ? -10 : $FOOTER.height(),
        leftColHeight = $LEFT_COL.eq(1).height() + $SIDEBAR_FOOTER.height(),
        contentHeight = bodyHeight < leftColHeight ? leftColHeight : bodyHeight;

    // normalize content
    contentHeight -= $NAV_MENU.height() + footerHeight;

    $RIGHT_COL.css('min-height', contentHeight);
  };

  $SIDEBAR_MENU.find('a').on('click', function (ev) {
    var $li = $(this).parent();

    if ($li.is('.active')) {
      $li.removeClass('active active-sm');
      $('ul:first', $li).slideUp(function () {
        setContentHeight();
      });
    } else {
      // prevent closing menu if we are on child menu
      if (!$li.parent().is('.child_menu')) {
        $SIDEBAR_MENU.find('li').removeClass('active active-sm');
        $SIDEBAR_MENU.find('li ul').slideUp();
      }

      $li.addClass('active');

      $('ul:first', $li).slideDown(function () {
        setContentHeight();
      });
    }
  });

  // toggle small or large menu
  $MENU_TOGGLE.on('click', function () {
    if ($BODY.hasClass('nav-md')) {
      $SIDEBAR_MENU.find('li.active ul').hide();
      $SIDEBAR_MENU.find('li.active').addClass('active-sm').removeClass('active');
    } else {
      $SIDEBAR_MENU.find('li.active-sm ul').show();
      $SIDEBAR_MENU.find('li.active-sm').addClass('active').removeClass('active-sm');
    }

    $BODY.toggleClass('nav-md nav-sm');

    setContentHeight();

    $('.dataTable').each(function () {
      $(this).dataTable().fnDraw();
    });
  });

  // check active menu
  $SIDEBAR_MENU.find('a[href="' + CURRENT_URL + '"]').parent('li').addClass('current-page');

  $SIDEBAR_MENU.find('a').filter(function () {
    return this.href == CURRENT_URL;
  }).parent('li').addClass('current-page').parents('ul').slideDown(function () {
    setContentHeight();
  }).parent().addClass('active');

  // recompute content when resizing
  $(window).smartresize(function () {
    setContentHeight();
  });

  setContentHeight();

  // fixed sidebar
  if ($.fn.mCustomScrollbar) {
    $('.menu_fixed').mCustomScrollbar({
      autoHideScrollbar: true,
      theme: 'minimal',
      mouseWheel: { preventDefault: true }
    });
  }
});
// /Sidebar

// Panel toolbox
$(document).ready(function () {
  $('.collapse-link').on('click', function () {
    var $BOX_PANEL = $(this).closest('.x_panel'),
        $ICON = $(this).find('i'),
        $BOX_CONTENT = $BOX_PANEL.find('.x_content');

    // fix for some div with hardcoded fix class
    if ($BOX_PANEL.attr('style')) {
      $BOX_CONTENT.slideToggle(200, function () {
        $BOX_PANEL.removeAttr('style');
      });
    } else {
      $BOX_CONTENT.slideToggle(200);
      $BOX_PANEL.css('height', 'auto');
    }

    $ICON.toggleClass('fa-chevron-up fa-chevron-down');
  });

  $('.close-link').click(function () {
    var $BOX_PANEL = $(this).closest('.x_panel');

    $BOX_PANEL.remove();
  });
});
// /Panel toolbox

// Tooltip
$(document).ready(function () {
  $('[data-toggle="tooltip"]').tooltip({
    container: 'body'
  });
});
// /Tooltip

// Progressbar
$(document).ready(function () {
  if ($(".progress .progress-bar")[0]) {
    $('.progress .progress-bar').progressbar();
  }
});
// /Progressbar

// Switchery
$(document).ready(function () {
  if ($(".js-switch")[0]) {
    var elems = Array.prototype.slice.call(document.querySelectorAll('.js-switch'));
    elems.forEach(function (html) {
      var switchery = new Switchery(html, {
        color: '#26B99A'
      });
    });
  }
});
// /Switchery

// iCheck
$(document).ready(function () {
  if ($("input.flat")[0]) {
    $(document).ready(function () {
      $('input.flat').iCheck({
        checkboxClass: 'icheckbox_flat-green',
        radioClass: 'iradio_flat-green'
      });
    });
  }
});
// /iCheck

// Table
$('table input').on('ifChecked', function () {
  checkState = '';
  $(this).parent().parent().parent().addClass('selected');
  countChecked();
});
$('table input').on('ifUnchecked', function () {
  checkState = '';
  $(this).parent().parent().parent().removeClass('selected');
  countChecked();
});

var checkState = '';

$('.bulk_action input').on('ifChecked', function () {
  checkState = '';
  $(this).parent().parent().parent().addClass('selected');
  countChecked();
});
$('.bulk_action input').on('ifUnchecked', function () {
  checkState = '';
  $(this).parent().parent().parent().removeClass('selected');
  countChecked();
});
$('.bulk_action input#check-all').on('ifChecked', function () {
  checkState = 'all';
  countChecked();
});
$('.bulk_action input#check-all').on('ifUnchecked', function () {
  checkState = 'none';
  countChecked();
});

function countChecked() {
  if (checkState === 'all') {
    $(".bulk_action input[name='table_records']").iCheck('check');
  }
  if (checkState === 'none') {
    $(".bulk_action input[name='table_records']").iCheck('uncheck');
  }

  var checkCount = $(".bulk_action input[name='table_records']:checked").length;

  if (checkCount) {
    $('.column-title').hide();
    $('.bulk-actions').show();
    $('.action-cnt').html(checkCount + ' Records Selected');
  } else {
    $('.column-title').show();
    $('.bulk-actions').hide();
  }
}

// Accordion
$(document).ready(function () {
  $(".expand").on("click", function () {
    $(this).next().slideToggle(200);
    $expand = $(this).find(">:first-child");

    if ($expand.text() == "+") {
      $expand.text("-");
    } else {
      $expand.text("+");
    }
  });
});

// NProgress
if (typeof NProgress != 'undefined') {
  $(document).ready(function () {
    NProgress.start();
  });

  $(window).on('load', function () {
    NProgress.done();
  });
}

/* DATA TABLES */

function _initDataTables() {
  console.log("run_datatables");

  if (typeof $.fn.DataTable === "undefined") {
    return;
  }
  console.log("init_DataTables");

  var handleDataTableButtons = function handleDataTableButtons() {
    if ($("#datatable-buttons").length) {
      $("#datatable-buttons").DataTable({
        dom: "Blfrtip",
        buttons: [{
          extend: "copy",
          className: "btn-sm"
        }, {
          extend: "csv",
          className: "btn-sm"
        }, {
          extend: "excel",
          className: "btn-sm"
        }, {
          extend: "pdfHtml5",
          className: "btn-sm"
        }, {
          extend: "print",
          className: "btn-sm"
        }],
        responsive: true
      });
    }
  };

  var TableManageButtons = function () {
    "use strict";

    return {
      init: function init() {
        handleDataTableButtons();
      }
    };
  }();

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
  $datatable.on("draw.dt", function () {
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
    initComplete: function initComplete() {
      this.api().columns().every(function () {
        var column = this;
        var select = $('<select><option value=""></option></select>').appendTo($(column.footer()).empty()).on("change", function () {
          var val = $.fn.dataTable.util.escapeRegex($(this).val());

          column.search(val ? "^" + val + "$" : "", true, false).draw();
        });

        column.data().unique().sort().each(function (d, j) {
          select.append('<option value="' + d + '">' + d + "</option>");
        });
      });
    },
    columns: [{
      width: "35%"
    }, {
      width: "30%"
    }, {
      width: "30%"
    }, {
      orderable: false
    }],
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

$("document").ready(function () {
  _initDataTables();
  _initDocumentTemplatesTable();
});

function _initDocumentTemplates() {
  var CONTAINER_DOCUMENT_TEMPLATES = "container-document-templates";
  var TEMPLATES_AREA = "document-templates-area";
  var TEMPLATES_GROUP = "document-templates-group";
  var TEMPLATES_GROUP_HEADER = "templates-group-header";
  var TEMPLATES_GROUP_CONTENT = "templates-group-content";
  var DOCUMENT_TEMPLATE = "document-template";

  function Component(tag, className) {
    return {
      tag: tag,
      className: className
    };
  }

  function DocumentTemplate(name, preview) {
    return Object.assign(Component("div", DOCUMENT_TEMPLATE), {
      content: [""]
    });
  }

  function TemplateGroupHeader(title) {
    return Object.assign(Component("p", TEMPLATES_GROUP_HEADER), {
      content: title
    });
  }

  function TemplateGroupContent(templates) {
    return Object.assign(Component("div", TEMPLATES_GROUP_CONTENT), {
      content: []
    });
  }

  function TemplateGroup(type, templates) {
    return Object.assign(Component("div", TEMPLATES_GROUP), {
      content: [TemplateGroupHeader(type), TemplateGroupContent(templates)]
    });
  }

  function TemplateArea(groups) {
    return Object.assign(Component("div", TEMPLATES_AREA), {
      content: groups.map(function (_ref) {
        var type = _ref.type,
            templates = _ref.templates;
        return TemplateGroup(type, templates);
      })
    });
  }

  function createComponent(component) {
    var tag = component.tag,
        className = component.className;


    var element = document.createElement(tag);
    element.className = className;

    switch (tag) {
      case "img":
        {
          var src = component.src;

          element.src = src;
          break;
        }
    }

    var content = component.content || null;
    if (Array.isArray(content)) {
      content.forEach(function (child) {
        return element.appendChild(createComponent(child));
      });
    } else if (typeof content === "string") {
      element.innerHTML = content;
    }

    return element;
  }

  // Array[Object { name, type }]
  var templates = [{
    name: "Принятие на работу",
    type: "Заявление"
  }, {
    name: "Отпуск",
    type: "Заявление"
  }, {
    name: "Отзыв из отпуска",
    type: "Заявление"
  }, {
    name: "Увольнение",
    type: "Заявление"
  }, {
    name: "Приём в аспирантуру",
    type: "Заявление"
  }, {
    name: "Академический отпуск",
    type: "Заявление"
  }, {
    name: "Отчисление из аспирантуры",
    type: "Заявление"
  }, {
    name: "Оплата расходов",
    type: "Заявление"
  }, {
    name: "Выплата премии за статью",
    type: "Заявление"
  }, {
    name: "Перевод с должности на должность",
    type: "Заявление"
  }, {
    name: "Направление в командировку",
    type: "Служебная запискa"
  }, {
    name: "Подготовка справок",
    type: "Служебная запискa"
  }, {
    name: "Замена лампочек",
    type: "Служебная запискa"
  }, {
    name: "Создание ящиков электронной почты",
    type: "Служебная запискa"
  }, {
    name: "Назначение ответственным исполнителем по проекту",
    type: "Служебная запискa"
  }, {
    name: "Выплаты по проектам",
    type: "Служебная запискa"
  }, {
    name: "Надбавки по бюджету",
    type: "Служебная запискa"
  }, {
    name: "Служебная записка в свободной форме",
    type: "Служебная запискa"
  }, {
    name: "Авансовый отчёт по командировке",
    type: "Отчёт"
  }, {
    name: "Финансовый отчёт по командировке",
    type: "Отчёт"
  }, {
    name: "Отчёт о заграничной командировке",
    type: "Отчёт"
  }, {
    name: "Бланк СПИИРАН",
    type: "Бланк"
  }, {
    name: "Бланк презентации",
    type: "Бланк"
  }];

  var container = document.getElementById(CONTAINER_DOCUMENT_TEMPLATES);

  var groups = templates.map(function (template) {
    return template.type;
  }).reduce(function (acc, type) {
    return acc.includes(type) ? acc : acc.concat(type);
  }, []).map(function (type) {
    return {
      type: type,
      templates: templates.filter(function (template) {
        return template.type === type;
      }).map(function (template) {
        return template.name;
      })
    };
  });

  // types.forEach(function(type) {
  //   generated.appendChild(groupTemplate.cloneNode(true));
  // });

  console.dir(groups);
  console.log(createComponent(TemplateArea(groups)));
}

$("document").ready(function () {
  _initDocumentTemplates();
});