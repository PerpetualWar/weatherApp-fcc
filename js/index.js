$(document).ready(function() {

	(function getLocation() {
		$.getJSON("http://freegeoip.net/json/?callback=?", function(json) {
			//	var loc = [json.city, json.country_code];
			var loc = {
				"latitude": json.latitude,
				"longitude": json.longitude,
				"city": json.city,
				"countryCode": json.country_code
			};

			//for(var key in loc) loc[key] = loc[key].toString();
			$("#module").html(loc.city + " , " + loc.countryCode);

			getWeather();

			function getWeather() {
				$.getJSON("http://api.openweathermap.org/data/2.5/weather?lat=" + loc.latitude + "&lon=" + loc.longitude + "&appid=c40ee34a55101b12abc7855766f498fb", function(temperature) {

					var fahrenheit = Math.round(temperature.main.temp * (9 / 5) - 459.67) + "ºF";
					var celsius = Math.round(temperature.main.temp - 273.15) + "ºC";
					var weatherText = temperature.weather[0].main;

					$('.icon').html('<i class="wi wi-owm-' + temperature.weather[0].id + '"></i>');
					$("#weatherText").html(weatherText);
					$("#weather").html(celsius, $("#button").html('<i class="fa fa-thermometer-half"></i>' + '  ºF'));
					$("#altWeather").html(fahrenheit);

					$("#button").on("click", function() {
						$("#weather").html() === fahrenheit ? $("#weather").html(celsius,
							$("#button").html('<i class="fa fa-thermometer-half"></i> ' + '  ºF')
						) : $("#weather").html(fahrenheit,
							$("#button").html('<i class="fa fa-thermometer-half"></i> ' + '  ºC'));
						$("#altWeather").html() === fahrenheit ? $("#altWeather").html(celsius) : $("#altWeather").html(fahrenheit);
					});
				})
			}
		})
	})();
});