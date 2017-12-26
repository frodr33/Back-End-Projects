
/*
	Given a array of test scores, 
	return the average of all the 
	scores in the array. Return 0 
	if the array empty
*/
function average (arrScores) {
	var total = 0;
	arrScores.forEach(function(elem){
		total = elem + total;
	});
	return Math.round(total / arrScores.length);
}

var scores = [90, 98, 89, 100, 100, 86, 94];
console.log(average(scores)); // should return 94

var scores2 = [40, 65, 77, 82, 80, 54, 73, 63, 95, 49];
console.log(average(scores2)); // should return 68

