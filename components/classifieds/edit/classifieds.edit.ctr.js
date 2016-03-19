(function() {

	"use strict";

	angular
		.module('ngClassifieds')
		.controller('editClassifiedsCtrl', function ($scope,$state, $mdSidenav, $timeout, $mdDialog, classifiedsFactory) {
			
			var vm = this;
			vm.closeSidebar = closeSidebar;
			vm.saveEdit = saveEdit;
			vm.classified = $state.params.classified;

			$timeout(function() {
				$mdSidenav("left").open(); //<-- timeout solves event loop issue
			});		

			/*$scope.$watch('vm.valuetochange', function(value) {
				if(value===2) {
					console.log('value changed to 2');
				}
			});
			vm.valuetochange = 1;
			$timeout(function() {
				vm.valuetochange = 2;
			} 2000);	*/

			$scope.$watch('vm.sidenavOpen', function(sidenav) { //<--watches for sidebar events to open and close,change states

				if(sidenav === false) {
					$mdSidenav('left')
						.close()
						.then(function() {
							$state.go('classifieds');
						});
				}
			});

			function closeSidebar () {
				vm.sidenavOpen = false;
			}

			function saveEdit() {
				$scope.$emit('editSaved', 'Edit Saved');		
				vm.sidenavOpen = false;	
			

		}

	});

})();