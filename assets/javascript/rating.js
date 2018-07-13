$(document).ready(function () {


	//Dan's Rating Code
	//mdb --> 80 --> (user)
	//imdb --> 4.6/10 --> 46 (user)
	//rt --> 15% --> 15 (critic)
	//meta --> 28/100 --> 28 (critic)
	/*var imdb = str.split("/");
	
	imdb = imdb[0] * 10;
	
	var rt = str.split("%");
	
	rt = rt[0];
	
	var meta = str.split("/");
	
	meta = meta[0];
	
	userReview = (mdb * 0.65) + (imdb * 0.35)
	
	critReview = (rt * 0.4) + (imdb * 0.6)
	*/
	
	var userScore = 71;
	
	var criticScore = 82;
	
	var minScore = Math.min(userScore, criticScore);
	
	var midScore = Math.ceil(Math.abs(userScore - criticScore));
	
	var eachNotch = (midScore / 499);
	
	var initScore = Math.ceil(minScore + (midScore / 2));
	
	var slider = document.getElementById("myRange");
	
	var output = document.getElementById("rating");
	//output.innerHTML = slider.value;
	output.innerHTML = initScore;

	slider.oninput = function () {
		//output.innerHTML = this.value;
		output.innerHTML = (minScore + ((this.value - 1) * eachNotch)).toFixed(1);
	}
})