var searchTerm = "";
$(document).ready(function () {
	$("#searchButton").on("click", function (event) {
		searchTerm = $("#searchBox").val().trim();

		var omdbData = "http://www.omdbapi.com/?t=" + searchTerm + "&apikey=3efbbefc";

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
			"metacritic":[],
			"rottom":[],
		}

		var movieDBdata = {
			"voteAvg": 0,
			"voters": 0,
			"revenue":0,
			"budget":0,
		}
		event.preventDefault();
		console.log("click success!");
		console.log(searchTerm);


		$.ajax({
			url: omdbData,
			method: "GET"
		}).then(function (omdbDataResponse) {
			console.log(omdbDataResponse);
			//return omdbResponse;
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
			omdbResponse.metacritic = omdbDataResponse.Metascore;
			omdbResponse.rottom = omdbDataResponse.Ratings[1].Value;

			//movieDB ajax
			var movieDB = "https://api.themoviedb.org/3/movie/" + omdbResponse.imdbId + "?api_key=15f49e312d668cfea4632253c8087323&language=en-US";
			$.ajax({
				url: movieDB,
				method: "GET"
			}).then(function (movieDBresponse) {
				console.log(movieDBresponse);
				movieDBdata.voters = movieDBresponse.vote_count;
				movieDBdata.voteAvg = movieDBresponse.vote_average;
				movieDBdata.budget = movieDBresponse.budget;
				movieDBdata.revenue = movieDBresponse.revenue;
			$("#posterBoy").html("<img src='" + omdbResponse.poster + "'/>");
			//$("#trueRating").html("Our Rating: "+Placeholder);
			$("#rating").html("Rated: " +omdbResponse.rated);
			$("#budget").html("Budget: " +movieDBdata.budget);
			$("#revenue").html("Revenue: " +movieDBdata.revenue);
			$("#rtScore").html("Rotten Tomatoes: "+parseInt(omdbResponse.rottom));
			$("#imdbScore").html("IMDB: "+omdbResponse.imdbRating);
			$("mcScore").html("MetaCritic: "+omdbResponse.metacritic);
			console.log(movieDBdata);
			console.log(omdbResponse);
			})
		});
	})
})
