

var App = angular.module('drag-and-drop', [ 'ngDragDrop' ]);
App.directive('ngRightClick', function($parse) {
    return function(scope, element, attrs) {
	var fn = $parse(attrs.ngRightClick);
	element.bind('contextmenu', function(event) {
	    scope.$apply(function() {
		event.preventDefault();
		fn(scope, {
		    $event : event
		});
	    });
	});
    };
});
App.controller('oneCtrl', function($scope, $timeout) {
    $scope.images = [ {
	'thumb' : '1.png'
    } ]
    $scope.list1 = [];
    $scope.counter = 1;
    $scope.totalItems = 0;
    $scope.totalPrice = 0+'$';
    $scope.list2 = [ {
	'title' : 'Cola',
	'drag' : true,
	'localcount' : 1,
	'price':10
    }, {
	'title' : 'Rakija',
	'drag' : true,
	'localcount' : 1,
	'price':20
	
    }, {
	'title' : 'Pivo',
	'drag' : true,
	'localcount' : 1,
	'price':30
    }, {
	'title' : 'Cola',
	'drag' : true,
	'localcount' : 1,
	'price':40
    }, {
	'title' : 'Rakija',
	'drag' : true,
	'localcount' : 1,
	'price':50
    }, {
	'title' : 'Pivo',
	'drag' : true,
	'localcount' : 1,
	'price':60
    }, {
	'title' : 'Caj',
	'drag' : true,
	'localcount' : 1,
	'price':70
    } ];
  
    $scope.startCallback = function(event, ui, title) {
	// console.log('You started draggin: ' + title.title);
	$scope.draggedTitle = title.title;
    };

    $scope.stopCallback = function(event, ui) {
	// console.log('Why did you stop draggin me?');
    };

    $scope.dragCallback = function(event, ui) {
	// console.log('hey, look I`m flying');
    };

    $scope.dropCallback = function(event, ui) {

	// console.log('Number products:' + counterCopy );

	calculateTotals();
    };

    $scope.overCallback = function(event, ui) {
	// console.log('Look, I`m over you');
    };

    $scope.outCallback = function(event, ui) {
	// console.log('I`m not, hehe');
    };

    var calculateTotals = function() {
	var totalItems = 0;
	var totalPrice = 0;
	for (var i = 0, len = $scope.list1.length; i < len; i++) {
	    if($scope.list1[i].localcount>0)
		{
	    $scope.list1[i].drag=false;
		}
	    else
		{
		  $scope.list1[i].drag=true;
		}
	    totalItems = totalItems + $scope.list1[i].localcount;
	    totalPrice = totalPrice + $scope.list1[i].localcount*$scope.list1[i].price;
	    $scope.totalItems = totalItems;
	    $scope.totalPrice = totalPrice+'$';
	    // debugger;
	}
	// $scope.bill.total = total;
	// $scope.bill.discount = total > 100 ? 10 : 0;
	// $scope.bill.subtotal = total - $scope.bill.discount;
    };

    $scope.$watch('list1', calculateTotals, true);
});

