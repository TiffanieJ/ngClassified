(function () {

	"use strict";

	angular
		.module("ngClassifieds") //anything in below function is our ctrl code
		.controller("classifiedsCtrl", function ($scope, $state, $http, classifiedsFactory, $mdSidenav, $mdToast, $mdDialog) {
			
			var vm = this; //instead of scope

			vm.categories;
			vm.classified;
			vm.classifieds;
			vm.closeSidebar = closeSidebar;
			vm.deleteClassified = deleteClassified;
			vm.editing;
			vm.editClassified = editClassified;
			vm.openSidebar = openSidebar;
			vm.saveClassified = saveClassified;

			vm.classifieds = classifiedsFactory.ref;
			vm.classifieds.$loaded().then(function (classifieds) { //<-- loads categories for filter
				vm.categories = getCategories(classifieds);
			});
			
			// classifiedsFactory.getClassifieds().then(function (classifieds) {
			// 	vm.classifieds = classifieds.data;
			// 	vm.categories = getCategories(vm.classifieds);
			// });

			$scope.$on('newClassified', function(event, classified) {
				vm.classifieds.$add(classified);  //<-- $add adds to our firebase db
				showToast('Classifieds Saved!');
			})

			$scope.$on('editSave', function(event, message) {
				showToast(message);
			});

			function openSidebar () {
				$state.go('classifieds.new'); // <-- causes router to go to classifieds new state
			}

			function closeSidebar () {
				$mdSidenav('left').close();
			}

			function saveClassified (classified) { 
				if (classified) {
					classified.contact = contact;
					vm.classifieds.push(classified);  //<-- cretes new classified
					vm.classified = {}; //clears out input fields after save
					closeSidebar();
					showToast("Classified Saved!", 3000);
				}
			}

			function editClassified (classified) {
				// vm.editing = true;    //infoms view weather or not we are editing
				// openSidebar();
				// vm.classified = classified; // <-- .classified called in from our ng.model

				$state.go('classifieds.edit', {
					id:classified.$id
					
				});
			}


			function saveEdit (classified) {
				vm.editing = false;
				if (classified) {
					vm.classified = {};
					closeSidebar();
					showToast("Edit Saved!", 3000);
				}
			}


			function deleteClassified (event, classified) {
				var confirm = $mdDialog.confirm()
								.title('Are you sure you want to delete ' + classified.title + ' ?')
								.ok('Yes')
								.cancel('No')
								.targetEvent(event);
							
							
							$mdDialog.show(confirm).then(function() {
								vm.classifieds.$remove(classified);
								showToast('Classified deleted!', 3000);

								}, function () {

								})		
					}
	
			function showToast (message, delay) {
				$mdToast.show(
						$mdToast.simple()
							.content(message )
							.position('top right')
							.hideDelay(delay)	
				);
			}	

			function getCategories(classifieds)	{ // passing in classifieds array
				
				var categories = []; 
				angular.forEach(classifieds, function(item) { //itterating over classifieds array, looking at each clssified 
					angular.forEach(item.categories, function(category) { //itterating over each classified lokking at each item
						categories.push(category) //adding category item to categories array
					});
				});
				return _.uniq(categories); //returns only unique categories
			}	

	})

})();

