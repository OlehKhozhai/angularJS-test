const app = angular.module('app', []);

app.controller('firstCtrl', function ($scope, $timeout, $q) {
  $scope.dayDefault = 'Day';
  $scope.monthDefault = 'Month';
  $scope.yearDefault = 'Year';
  $scope.monthArray = {
    first: ['january', 'february', 'march', 'april', 'may', 'juli', 'julay'],
    second: ['august', 'september', 'october', 'november', 'december']
  };
  console.log($scope.monthArray.first[0])
  $scope.dayArray = [];

  for (let i = 1; i <= 31; i++) {
    $scope.dayArray.push(i)
  };

  $scope.yearArray = [];
  for (let i = 2009; i >= 1940; i--) {
    $scope.yearArray.push(i)
  };

  $scope.blurClose = function () {
    $timeout(function () {
      $scope.show = false;
    }, 200);
  };
  $scope.inValid = false
  $scope.blurClosew = function () {
    $timeout(function () {
      $scope.showw = false;
    }, 200);
  };

  $scope.currentOption = function (dayDefault) {
    $scope.dayDefault = dayDefault;
  };


  $scope.setValue = function (value, text, index) {
    // switch($scope.monthArray.indexOf($scope.monthDefault)){
    // case 7: 
    // }
    if (text === 'day') {
      $scope.dayDefault = value
      if (($scope.yearDefault % 4 !== 0) && $scope.monthDefault === 'february' && $scope.dayDefault > 28 && $scope.yearDefault !== 'Year' ||
          ($scope.yearDefault % 4 === 0) && $scope.monthDefault === 'february' && $scope.dayDefault > 29 && $scope.yearDefault !== 'Year' ||
        $scope.monthArray.first.indexOf($scope.monthDefault) % 2 !== 0 && $scope.monthArray.second.indexOf($scope.monthDefault) % 2 !== 0 &&
        ($scope.dayDefault > 30) && $scope.yearDefault == 'Year') {
        $scope.inValid = true;
      } else {
        $scope.inValid = false;
      };
    };

    if (text === 'month') {
      $scope.monthDefault = value;
      if (($scope.yearDefault % 4 !== 0) && $scope.monthDefault === 'february' && $scope.dayDefault > 28 && $scope.yearDefault !== 'Year' ||
        (($scope.monthDefault === 'february') && ($scope.dayDefault > 29)) ||
        ((index % 2 === 0) && ($scope.dayDefault > 30))) {
        $scope.inValid = true
      } else {
        $scope.inValid = false
      }
    };

    if (text === 'year') {
      $scope.yearDefault = value;
      if (value % 4 !== 0 && $scope.monthDefault === 'february' && $scope.dayDefault > 28 ||
        $scope.monthDefault === 'february' && $scope.dayDefault > 29 ||
        $scope.monthArray.first.indexOf($scope.monthDefault) % 2 !== 0 && $scope.monthArray.second.indexOf($scope.monthDefault) % 2 !== 0 &&
        $scope.dayDefault > 30) {


        $scope.inValid = true
      } else {
        $scope.inValid = false
      }
    }
  };

  function sum(a, b, callback) {
    $timeout(function () {
      callback(a + b);
    }, 2000)
  };

  sum(2, 3, function (result) {
    $scope.result = result
  })


  function sum(a, b) {
    return $timeout(function () {
      return (a + b);
    }, 2000)
  };

  sum(2, 3)
    .then(function (result) {
      $scope.result = result
    })


  $scope.files = [{
      id: 1,
      name: 'Oleh'
    },
    {
      id: 2,
      name: 'pppp'
    },
    {
      id: 3,
      name: 'Olll'
    },
    {
      id: 4,
      name: 'Nana'
    },
    {
      id: 5,
      name: 'Lolo'
    },
    {
      id: 6,
      name: 'Gygo'
    },
  ]

  $scope.apiRequest = function (good) {
    return new Promise((resolve, rej) => {
      setTimeout(()=> {
          if (good.id === 2) {
            good.id = 111;
          } else {
            good.id = 9            
          }
          
          resolve(good);
      }, 5000);
  })
  }

  $scope.sendPost = function (goods) {
    var promises = [];
  
    goods.forEach(good => {
       promises.push($scope.apiRequest(good));
    });
    
    Promise.all(promises).then(res => {
     console.log('Response end', res)
   });
  }

});

// let files = [{
//   id: 1,
//   name: 'Oleh'
// },
// {
//   id: 2,
//   name: 'pppp'
// },
// {
//   id: 3,
//   name: 'Olll'
// }
// ]

// function apiRequest(good) {
// return new Promise((resolve, rej) => {
//     setTimeout(()=> {
//         if (good.id === 2) {
//           good.id = 111;
//         } else {
//           good.id = 9            
//         }
        
//         resolve(good);
//     }, 5000);
// })
// }

// function sendPost(goods) {
//   var promises = [];
  
//  goods.forEach(good => {
//     promises.push(apiRequest(good));
//  });
 
//  Promise.all(promises).then(res => {
//   console.log('Response end', res)
// });
// }

// sendPost(files);ctrl.goodFields = [
    // {
    //   action: 'id',
    //   val: true,
    //   text: 'Ідентифікатор товару',
    //   aliases: [
    //     'Ідентифікатор товару',
    //     'Ідентифікатор_товару',
    //     'id',
    //     '_id'
    //   ],
    //   alias: null
    // }
    "use strict";
var angular = require("angular");
var find = require("lodash/find");
var fileImportForm = {
  templateUrl: require("../../../../../views/templates/import/_file.import.component.html"),
  controller: FileImportController,
  controllerAs: "file"
};
FileImportController.$inject = [
  "$scope",
  "$reqImport",
  "$rootScope",
  "$editImported",
  "$state",
  "$shop",
  "goodsService",
  "$log",
  "$window"
];
function FileImportController($scope,
                              $reqImport,
                              $rootScope,
                              $editImported,
                              $state,
                              $shop,
                              goodsService,
                              $log,
                              $window) {
  var ctrl = this;
  ctrl.importResult = {};
  ctrl.parsedFiles = [];
  ctrl.tempFile = [];
  ctrl.onParsed = onParsed;
  ctrl.importCurrentFile = importCurrentFile;
  ctrl.importAllFiles = importAllFiles;
  $scope.emptyField = true;
  ctrl.goodFields = [
    // {
    //   action: 'id',
    //   val: true,
    //   text: 'Ідентифікатор товару',
    //   aliases: [
    //     'Ідентифікатор товару',
    //     'Ідентифікатор_товару',
    //     'id',
    //     '_id'
    //   ],
    //   alias: null
    // }
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
  ctrl.options = [
    {
      title: "Действие относительно списка:",
      id: 1,
      type: "radio",
      value: "create",
      values: [
        {
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

//=====================================================================================
$scope.policies = [
  {
    drivers: [
      {
        gender: 'M'
      }, 
      {
        gender: 'F'
      }
    ]
  }, 
  {
    drivers: [
      {
        gender: 'M'
      }, 
      {
        gender: 'F'
      }
    ]
  }];
//=====================================================================================

  ctrl.editItem = editItem;
  ctrl.createItem = createItem;
  ctrl.viewItem = viewItem;
  ctrl.removeItem = removeItem;
  function onParsed(file) {
    file.fields = [];
    angular.copy(ctrl.goodFields, file.fields);
    setupAliases(file);
    file.imported = false;
    var index = ctrl.parsedFiles.objIndexOf("name", file.name);
    if (index === -1) {
      ctrl.tempFile.push(file);
      $scope.emptyField = false;
    } else {
      ctrl.parsedFiles[index] = file;
      $scope.emptyField = false;
    }
    $scope.$apply();
  }

  $scope.chosenFile = function (){
    ctrl.parsedFiles.push(ctrl.tempFile[ctrl.tempFile.length - 1]);
    angular.element("input[type='file']").val(null);
    $scope.emptyField = true;
  }
  
  function setupAliases(file) {
    for (var key = 0; key < file.fields.length; ++key) {
      file.fields[key].alias = find(file.headings, function(item) {
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
  function createFromFile(file) {
    console.log('create1', file )
    $reqImport.postSingleFileImport(file)
      .then(function(response) {
        angular.copy(response.data, ctrl.importResult);
        ctrl.parsedFiles = [];
      })
      .catch(function(err) {
        err && $log.warn(err);
        $rootScope.$broadcast("notification", {
          text: "NOTIFICATION.ERROR_WHILE_IMPORT_FROM_FILE",
          type: "danger"
        });
      });
  }
  function updateFromFile(file) {
    console.log('update1', file )
    $reqImport.putSingleFileImport(file)
      .then(function(response) {
        angular.copy(response.data, ctrl.importResult);
        ctrl.parsedFiles = [];
      })
      .catch(function(err) {
        err && $log.warn(err);
        $rootScope.$broadcast("notification", {
          text: "NOTIFICATION.ERROR_WHILE_IMPORT_FROM_FILE",
          type: "danger"
        });
      });
  }
  function createFromFiles() {
    console.log('create2' )

    $reqImport.postMultipleFilesImport(ctrl.parsedFiles)
      .then(function(response) {
        angular.copy(response.data, ctrl.importResult);
        ctrl.parsedFiles = [];
      })
      .catch(function(err) {
        err && $log.warn(err);
        $rootScope.$broadcast("notification", {
          text: "NOTIFICATION.ERROR_WHILE_IMPORT_FROM_FILE",
          type: "danger"
        });
      });
  }
  function updateFromFiles() {
    console.log('update2' )

    $reqImport.putMultipleFilesImport(ctrl.parsedFiles)
      .then(function(response) {
        angular.copy(response.data, ctrl.importResult);
        ctrl.parsedFiles = [];
      })
      .catch(function(err) {
        err && $log.warn(err);
        $rootScope.$broadcast("notification", {
          text: "NOTIFICATION.ERROR_WHILE_IMPORT_FROM_FILE",
          type: "danger"
        });
      });
  }
  function createItem(item) {
    console.log('create3', item )

    $editImported.setTempGood(item);
    var url = $state.href("addGoods", { name: $shop.$my().shopName }, { absolute: true });
    $window.open(url, "_blank");
  }
  function editItem(item) {
    // $editImported.setTempGood(item);
    var url = $state.href("updateGood",
      { name: $shop.$my().shopName, goodName: item.url },
      { absolute: true });
    $window.open(url, "_blank");
  }
  function viewItem(item) {
    // $editImported.setTempGood(item);
    var url = $state.href("viewGood",
      { name: $shop.$my().shopName, goodName: item.url },
      { absolute: true });
    $window.open(url, "_blank");
  }
  function removeItem(ctx) {
    goodsService.deleteGood(ctx.row.item.id)
      .then(function(response) {
        if (response.status === 200) {
          // $shop.$init().then(function () {
          //   $state.go('allGoods');
          // });
          ctrl.importResult.success.splice(ctx.$index, 1);
        }
      })
      .catch(function(err) {
        err && $log.warn(err);
      });
  }
}
module.exports = fileImportForm;