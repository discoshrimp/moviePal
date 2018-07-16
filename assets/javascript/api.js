var searchTerm = "";
//-------------Global Objects to be assigned values in function------------------//
var omdbResponse = {
	"title": [],
	"year": [],
	"rated": [],
	"released": [],
	"runtime": [],
	"actors": [],
	"awards": [],
	"boxOffice": [],
	"country": [],
	"director": [],
	"genre": [],
	"language": [],
	"metascore": [],
	"plot": [],
	"poster": [],
	"production": [],
	"writer": [],
	"imdbId:": [],
	"imdbRating": [],
	"imdbVotes": [],
	"metacritic": [],
	"rottom": [],
}

var movieDBdata = {
	"voteAvg": 0,
	"voters": 0,
	"revenue": 0,
	"budget": 0,
}
$(document).ready(function () {
	function clearForm() {
		$("#searchBox").val("")
	}
	$("#searchButton").on("click", function (event) {

//-------------------------API CALLS--------------------------//	
		searchTerm = $("#searchBox").val().trim();

		var omdbData = "http://www.omdbapi.com/?t=" + searchTerm + "&apikey=3efbbefc";

		event.preventDefault();
		console.log("click success!");
		console.log(searchTerm);

		$.ajax({
			url: omdbData,
			method: "GET"
		}).then(function (omdbDataResponse) {
			console.log(omdbDataResponse);
			//assign omdbDataResponse to omdbResponse for global use;
			omdbResponse.title = omdbDataResponse.Title;
			omdbResponse.year = omdbDataResponse.Year;
			omdbResponse.rated = omdbDataResponse.Rated;
			omdbResponse.released = omdbDataResponse.Released;
			omdbResponse.runtime = omdbDataResponse.Runtime;
			omdbResponse.actors = omdbDataResponse.Actors;
			omdbResponse.awards = omdbDataResponse.Awards;
			omdbResponse.boxOffice = omdbDataResponse.BoxOffice;
			omdbResponse.country = omdbDataResponse.Country;
			omdbResponse.director = omdbDataResponse.Director;
			omdbResponse.genre = omdbDataResponse.Genre;
			omdbResponse.language = omdbDataResponse.Language;
			omdbResponse.metascore = omdbDataResponse.Metascore;
			omdbResponse.plot = omdbDataResponse.Plot;
			omdbResponse.poster = omdbDataResponse.Poster;
			omdbResponse.production = omdbDataResponse.Production;
			omdbResponse.writer = omdbDataResponse.Writer;
			omdbResponse.imdbId = omdbDataResponse.imdbID;
			omdbResponse.imdbRating = omdbDataResponse.imdbRating;
			omdbResponse.imdbVotes = omdbDataResponse.imdbVotes;
			omdbResponse.metacritic = omdbDataResponse.Ratings[2].Value;
			omdbResponse.rottom = omdbDataResponse.Ratings[1].Value;

			//movieDB
			var movieDB = "https://api.themoviedb.org/3/movie/" + omdbResponse.imdbId + "?api_key=15f49e312d668cfea4632253c8087323&language=en-US";
			$.ajax({
				url: movieDB,
				method: "GET"
			}).then(function (movieDBresponse) {
				console.log(movieDBresponse);
				//assign need moviedb responses to global movieDBdata objects
				movieDBdata.voters = movieDBresponse.vote_count;
				movieDBdata.voteAvg = movieDBresponse.vote_average;
				movieDBdata.budget = movieDBresponse.budget;
				movieDBdata.revenue = movieDBresponse.revenue;

				//------------------DATA TO HTML--------------------------//
				// adding dynamic insertion of titles
				$("#titleScore").text("MoviePal Score:");
				$("#titleDetails").text("Movie Details:");
				$("#titleBreakdown").text("Ratings Breakdown:");
				$("#questionMP").text("What is a 'MoviePal Score'?");
				$("#explainMP").text("The MoviePal score comes from a SUPER SECRET algorithm which includes ratings & reviews from RottenTomatoes, MetaCritic, IMDB, and general moviegoers.");
				$("#threatMP").text("We would explain more, but your head may explode, and we don't want to be held liable.");
				// End New Stuff

				
				$("#posterBoy").html("<img src='" + omdbResponse.poster + "'/>");
				$("#mpaaRating").html("Rated: " + omdbResponse.rated);
				$("#budget").html("Budget: $" + parseInt(movieDBdata.budget/1000000)+"M");
				$("#revenue").html("Revenue: $" + parseInt(movieDBdata.revenue/1000000)+"M");
				$("#rtScore").html("Rotten Tomatoes: " + parseInt(omdbResponse.rottom));
				$("#imdbScore").html("IMDB: " + omdbResponse.imdbRating);
				$("#mcScore").html("MetaCritic: " + omdbResponse.metacritic);
				console.log(movieDBdata);
				console.log(omdbResponse);


//-------------------------------Slider Code-------------------------------------------//	
				var imdb = parseInt(omdbResponse.imdbRating*10);
				var mdb = parseInt(movieDBdata.voteAvg*10);
				var rt = parseInt(omdbResponse.rottom);
				var meta = parseInt(omdbResponse.metacritic);
				console.log(imdb);
				console.log(mdb);
				console.log(rt);
				console.log(meta);
				var criticScore = (rt * 0.4) + (meta * 0.6);
				var userScore = (mdb * 0.65) + (imdb * 0.35);
				console.log(criticScore);
				console.log(userScore);

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

				$("#Score").html("Critic Score: " + criticScore + "<br> Viewer Score: " + userScore);

			});
		});
		clearForm()
	})
})
