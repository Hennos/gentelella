function _initDocumentTemplates() {
  const CONTAINER_DOCUMENT_TEMPLATES = "container-document-templates";
  const TEMPLATES_AREA = "document-templates-area";
  const TEMPLATES_GROUP = "document-templates-group";
  const TEMPLATES_GROUP_HEADER = "templates-group-header";
  const TEMPLATES_GROUP_CONTENT = "templates-group-content";
  const DOCUMENT_TEMPLATE = "document-template";

  function Component(tag, className) {
    return {
      tag,
      className
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
      content: groups.map(({ type, templates }) =>
        TemplateGroup(type, templates)
      )
    });
  }

  function createComponent(component) {
    const { tag, className } = component;

    let element = document.createElement(tag);
    element.className = className;

    switch (tag) {
      case "img": {
        const { src } = component;
        element.src = src;
        break;
      }
    }

    const content = component.content || null;
    if (Array.isArray(content)) {
      content.forEach(child => element.appendChild(createComponent(child)));
    } else if (typeof content === "string") {
      element.innerHTML = content;
    }

    return element;
  }

  // Array[Object { name, type }]
  var templates = [
    {
      name: "Принятие на работу",
      type: "Заявление"
    },
    {
      name: "Отпуск",
      type: "Заявление"
    },
    {
      name: "Отзыв из отпуска",
      type: "Заявление"
    },
    {
      name: "Увольнение",
      type: "Заявление"
    },
    {
      name: "Приём в аспирантуру",
      type: "Заявление"
    },
    {
      name: "Академический отпуск",
      type: "Заявление"
    },
    {
      name: "Отчисление из аспирантуры",
      type: "Заявление"
    },
    {
      name: "Оплата расходов",
      type: "Заявление"
    },
    {
      name: "Выплата премии за статью",
      type: "Заявление"
    },
    {
      name: "Перевод с должности на должность",
      type: "Заявление"
    },
    {
      name: "Направление в командировку",
      type: "Служебная запискa"
    },
    {
      name: "Подготовка справок",
      type: "Служебная запискa"
    },
    {
      name: "Замена лампочек",
      type: "Служебная запискa"
    },
    {
      name: "Создание ящиков электронной почты",
      type: "Служебная запискa"
    },
    {
      name: "Назначение ответственным исполнителем по проекту",
      type: "Служебная запискa"
    },
    {
      name: "Выплаты по проектам",
      type: "Служебная запискa"
    },
    {
      name: "Надбавки по бюджету",
      type: "Служебная запискa"
    },
    {
      name: "Служебная записка в свободной форме",
      type: "Служебная запискa"
    },
    {
      name: "Авансовый отчёт по командировке",
      type: "Отчёт"
    },
    {
      name: "Финансовый отчёт по командировке",
      type: "Отчёт"
    },
    {
      name: "Отчёт о заграничной командировке",
      type: "Отчёт"
    },
    {
      name: "Бланк СПИИРАН",
      type: "Бланк"
    },
    {
      name: "Бланк презентации",
      type: "Бланк"
    }
  ];

  var container = document.getElementById(CONTAINER_DOCUMENT_TEMPLATES);

  var groups = templates
    .map(template => template.type)
    .reduce((acc, type) => (acc.includes(type) ? acc : acc.concat(type)), [])
    .map(type => ({
      type,
      templates: templates
        .filter(template => template.type === type)
        .map(template => template.name)
    }));

  // types.forEach(function(type) {
  //   generated.appendChild(groupTemplate.cloneNode(true));
  // });

  console.dir(groups);
  console.log(createComponent(TemplateArea(groups)));
}

$("document").ready(function() {
  _initDocumentTemplates();
});
