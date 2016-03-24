(function() {
	"use strict";

	angular
		.module("ngClassifieds")
		.directive("classifiedCard", function() {
			return	{						// directive return obj
				templateUrl: "components/classifieds/card/classified-card.tpl.html",
				scope: {
					classifieds: "=classifieds",
					classifiedsFilter: "=",
					category: "="
				},
				controller: classifiedCardController,
				controllerAs: "vm"
			}	
			
			function classifiedCardController($state,$scope,$mdDialog) {

				var vm = this;
				vm.editClassified = editClassified;
				vm.deleteClassified = deleteClassified;	

				function editClassified (classified) {
				// vm.editing = true;    //infoms view weather or not we are editing
				// openSidebar();
				// vm.classified = classified; // <-- .classified called in from our ng.model

				$state.go('classifieds.edit', {
					id:classified.$id
					
				});
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

									});		
						}


				function showToast (message, delay) {
					$mdToast.show(
							$mdToast.simple()
								.content(message )
								.position('top right')
								.hideDelay(delay)	
					);
				}		

			}								
		});
})();