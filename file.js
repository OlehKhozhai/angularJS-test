angular.module('app',[]).controller('FileImportController', FileImportController)

FileImportController.$inject = ["$scope"];

function FileImportController($scope) {

    $scope.nyFunck = function(){
      return Math.random();
    }
    $scope.myVar= './foto.jpg'
  var ctrl = this;

  ctrl.goodFields = [
    {
      action: "title",
      val: true,
      text: "Назва товару",
      aliases: ["Назва товару", "Название_позиции", "Название позиции"],
      alias: null,
      disabled: true
    },
    {
      action: "description",
      val: true,
      text: "Опис товару",
      aliases: ["Опис товару", "Описание"],
      alias: null,
      disabled: true
    },
    {
      action: "price",
      val: true,
      text: "Ціна",
      aliases: ["Ціна", "Цена"],
      alias: null,
      disabled: true
    },
    {
      action: "currency",
      val: true,
      text: "Валюта",
      aliases: ["Валюта"],
      alias: null,
      disabled: true
    },
    {
      action: "typePrice",
      val: true,
      text: "Тип ціни",
      aliases: ["Тип ціни"],
      alias: null,
      disabled: true
    },
    {
      action: "mainGroup",
      val: true,
      text: "Категорія товару",
      aliases: [
        "Категорія товару",
        "Категорія_товару",
        "mainGroup",
        "main_group"
      ],
      alias: null,
      disabled: true
    },
    {
      action: "subGroup",
      val: true,
      text: "Підкатегорія товару",
      aliases: ["Підкатегорія товару"],
      alias: null,
      disabled: true
    },
    {
      action: "serialNumber",
      val: false,
      text: "Артикул (серийный номер)",
      aliases: [
        "Артикул (серійний номер)",
        "Код_товара",
        "серійний номер",
        "серійний_номер",
        "Артикул",
        "Артикул(серійний номер)"
      ],
      alias: null,
      disabled: false
    },
    {
      action: "pictures",
      val: true,
      text: "Посилання на зображення",
      aliases: ["Посилання на зображення", "Изображения"],
      alias: null,
      disabled: false
    },
    {
      action: "videos",
      val: true,
      text: "Посилання на відео",
      aliases: ["Посилання на відео", "Видео"],
      alias: null,
      disabled: false
    }
  ];
  ctrl.options = [{
      title: "Действие относительно списка:",
      id: 1,
      type: "radio",
      value: "create",
      values: [{
          action: "create",
          val: "create",
          text: "Добавить новые товары"
        },
        {
          action: "update",
          val: "update",
          text: "Обновить существующие"
        }
      ]
    },
    {
      title: "Обновить только:",
      type: "checkbox",
      value: null,
      values: ctrl.goodFields
    }
  ];

  // ctrl.editItem = editItem;
  // ctrl.createItem = createItem;
  // ctrl.viewItem = viewItem;
  // ctrl.removeItem = removeItem;

  // function onParsed(file) {
  //   file.fields = [];
  //   angular.copy(ctrl.goodFields, file.fields);
  //   setupAliases(file);
  //   file.imported = false;
  //   var index = ctrl.parsedFiles.objIndexOf("name", file.name);
  //   if (index === -1) {
  //     ctrl.tempFile.push(file);
  //     $scope.emptyField = false;
  //   } else {
  //     ctrl.parsedFiles[index] = file;
  //     $scope.emptyField = false;
  //   }
  //   $scope.$apply();
  // }

  // $scope.chosenFile = function () {
  //   ctrl.parsedFiles.push(ctrl.tempFile[ctrl.tempFile.length - 1]);
  //   angular.element("input[type='file']").val(null);
  //   $scope.emptyField = true;
  // }

  function setupAliases(file) {
    for (var key = 0; key < file.fields.length; ++key) {
      file.fields[key].alias = find(file.headings, function (item) {
        var _index = file.fields[key].aliases.indexOf(item);
        if (_index !== -1) {
          return item === file.fields[key].aliases[_index];
        }
        return false;
      }) || null;
    }
  }

  function importCurrentFile(file) {
    switch (ctrl.options[0].value) {
      case "create":
        createFromFile(file);
        break;
      case "update":
        updateFromFile(file);
        break;
      default:
        break;
    }
  }

  function importAllFiles() {
    switch (ctrl.options[0].value) {
      case "create":
        createFromFiles();
        break;
      case "update":
        updateFromFiles();
        break;
      default:
        break;
    }
  }

}