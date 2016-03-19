(function() {

	"use strict";

	angular
		.module('ngClassifieds')
		.controller('newClassifiedsCtrl', function ($scope,$state, $mdSidenav, $timeout, $mdDialog, classifiedsFactory) {
			
			var vm = this;
			vm.closeSidebar = closeSidebar;
			vm.saveClassified = saveClassified;

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

			function saveClassified(classified) {
				if (classified) {
					
					classified.contact = {
						name: "Tiffanie Johnson",
						phone: "(555) 555-5555",
						email: "tjohnson@gmail.com"
					}				
					$scope.$emit('newClassified', classified);
					vm.sidenavOpen = false; 
				}
			}


		});

})();