function imagePath(i,j) {
  return "img/texture/" + i + "/" + j + ".jpg";
}

angular.module('app.controllers', [])

.controller('timeVaryCtrl', function($scope, $ionicModal, $ionicPopup) {
  $ionicModal.fromTemplateUrl('templates/choosePhoto.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  function setBlend(dt) {
    if (isNaN(dt)) return;

    var n = $scope.images.length-1;
    $scope.time = dt.toFixed(2);
    var x = (dt + 1.0) / 2.0;
    var b = Math.floor(n*x) + 1;
    for (var i = 0; i < n; i++) {
      if (i < b) {
        $scope.images[i].opacity = 1;
      } else if (i == b) {
        $scope.images[i].opacity = n*x - Math.floor(n*x);
      } else {
        $scope.images[i].opacity = 0;
      }
    }
  }

  $scope.$watch('vm.timeSlider', function (newValue) {
        var x = parseFloat(newValue);
        setBlend(x);

  });
  $scope.time = "0";
  $scope.images = [];

  $scope.setTexture = function(index){
    var imgs = [];
    for (var i = 0; i < 7; i++) {
      var img = {};
      img.src = imagePath(index, i);
      img.opacity = 1.0;
      imgs.push(img);
    }
    $scope.images = imgs;
    console.log($scope.images);
    document.getElementById("timeSlider").value = "0";
    setBlend(0.0);
  };

  $scope.saveFile = function() {
   $ionicPopup.alert({
     title: 'Image Saved',
     template: 'This feature is not ready yet!'
   });
 };

})

.controller('choosePhotoCtrl', function($scope, $ionicPopup) {
  $scope.loadTextures = function() {
    var textures = [];
    for (var i = 0; i < 12; i++) {
      textures.push(imagePath(i,3));
    }
    $scope.textures = textures;
  };

  $scope.dismissModal = function() {
    $scope.modal.hide();
  };

  $scope.chooseTexture = function(index) {
    if (index === 0) {
      $ionicPopup.alert({
        title: 'Choose Photo',
        template: 'This feature is not ready yet!'
      });
    } else {
      $scope.dismissModal();
      $scope.setTexture(index);
    }
  };
});
