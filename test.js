function forEach(array, callback, optionalThisObject) {
	var forEachCallback = callback;

	if (optionalThisObject) {
		forEachCallback = callback.bind(optionalThisObject);
	}

	for (var i = 0; i < array.length; i++) {
		forEachCallback(array[i], i, array);
	}
}

tests({
	'It should run the callback function array.length times': function() {
		var numberOfTimesCallbackHasRun = 0;
		forEach([ 1, 2, 3 ], function() {
			numberOfTimesCallbackHasRun++;
		});
		eq(numberOfTimesCallbackHasRun, 3);
	},
	'It should pass the ith element as the first argument to the callback': function() {
		forEach([ 1 ], function(number) {
			eq(number, 1);
		});
	},
	'It should pass in the ith position as the second argument to the callbak': function() {
		forEach([ 1 ], function(number, index) {
			eq(index, 0);
		});
	},
	'It should pass the original array as the third argument to the callback': function() {
		var testArray = [ 1, 2, 3 ];
		forEach(testArray, function(number, index, originalArray) {
			eq(originalArray, testArray);
		});
	},
	'It should accept an optional this object': function() {
		forEach(
			[ 1 ],
			function() {
				eq(this.desccription, 'I should be accessible inside of the callback');
			},
			{ desccription: 'I should be accessible inside of the callback' }
		);
	}
});
