(function () { <!-- factory houses http requests -->
	"use strict";

	angular
		.module("ngClassifieds")
		.factory("classifiedsFactory", function ($http,$firebaseArray) {

			var ref = new Firebase('https://jdmclassifieds.firebaseio.com/');

			return {
				ref : $firebaseArray(ref)
			}
		});
})();