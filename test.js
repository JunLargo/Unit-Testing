//forEach testing

// function forEach(array, callback, optionalThisObject) {
// 	var forEachCallback = callback;

// 	if (optionalThisObject) {
// 		forEachCallback = callback.bind(optionalThisObject);
// 	}

// 	for (var i = 0; i < array.length; i++) {
// 		forEachCallback(array[i], i, array);
// 	}
// }

// tests({
// 	'It should run the callback function array.length times': function() {
// 		var numberOfTimesCallbackHasRun = 0;
// 		forEach([ 1, 2, 3 ], function() {
// 			numberOfTimesCallbackHasRun++;
// 		});
// 		eq(numberOfTimesCallbackHasRun, 3);
// 	},
// 	'It should pass the ith element as the first argument to the callback': function() {
// 		forEach([ 1 ], function(number) {
// 			eq(number, 1);
// 		});
// 	},
// 	'It should pass in the ith position as the second argument to the callbak': function() {
// 		forEach([ 1 ], function(number, index) {
// 			eq(index, 0);
// 		});
// 	},
// 	'It should pass the original array as the third argument to the callback': function() {
// 		var testArray = [ 1, 2, 3 ];
// 		forEach(testArray, function(number, index, originalArray) {
// 			eq(originalArray, testArray);
// 		});
// 	},
// 	'It should accept an optional this object': function() {
// 		forEach(
// 			[ 1 ],
// 			function() {
// 				eq(this.desccription, 'I should be accessible inside of the callback');
// 			},
// 			{ desccription: 'I should be accessible inside of the callback' }
// 		);
// 	}
// });

//filter testing

function filter(originalArray, callback, optionalThis) {
	var filterCallback = callback;

	if (optionalThis) {
		filterCallback = callback.bind(optionalThis);
	}

	var filteredArray = [];

	for (var i = 0; i < originalArray.length; i++) {
		if (filterCallback(originalArray[i], i, originalArray)) {
			filteredArray.push(originalArray[i]);
		}
	}
	return filteredArray;
}

tests({
	'It should run the callback function array.length times': function () {
		var numberOfTimesCallbackHasRun = 0;
		filter([1, 2, 3], function () {
			numberOfTimesCallbackHasRun++;
		});
		eq(numberOfTimesCallbackHasRun, 3);
	},
	'It should pass the ith element as the first argument to the callback': function () {
		filter([1], function (number) {
			eq(number, 1);
		});
	},
	'It should pass in the ith position as the second argument to the callbak': function () {
		filter([1], function (number, index) {
			eq(index, 0);
		});
	},
	'It should pass the original array as the third argument to the callback': function () {
		var testArray = [1, 2, 3];
		filter(testArray, function (number, index, originalArray) {
			eq(originalArray, testArray);
		});
	},
	'It should accept an optional this object': function () {
		filter([1], function () {
			eq(this.description, 'this is an optional this');
		}, { description: 'this is an optional this' }
		);
	},
	'It should return an array': function () {
		var filteredArray = filter([], function () { });
		eq(Array.isArray(filteredArray), true);
	},
	'It should return a new array, not the array being filtered': function () {
		var arrayBeingFiltered = [];
		var filteredArray = filter(arrayBeingFiltered, function () { });
		eq(filteredArray !== arrayBeingFiltered, true);
	},
	'It should return a new array that only has elements where callback returns true': function () {
		var filteredArray = filter([1, 2], function (number) {
			return number > 1;
		});
		eq(filteredArray.length, 1);
		eq(filteredArray[0], 2);
	}
});
