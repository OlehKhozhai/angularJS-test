angular.module('app', []).controller('FileImportController', function ($scope) {
  
  $scope.goodFields = [
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
  $scope.options = [
    {
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
      values: $scope.goodFields
    }
  ];
 
})
