$(document).ready(function() {

  // Variables
  var lon;
  var lat;
  var init;


  //Remove intro
  init = function() {
    $("#title").fadeOut(1500);
    $("#data").hide();
    $("#switch").hide();
    $("#icon").hide();
  } // End init()

  // Function to display weather info
  var displayTheWeather = function() {

    // Get geolocation
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position, errorCallback) {

        lon = position.coords.longitude;
        lat = position.coords.latitude;

        // Using "https://cors-anywhere.herokuapp.com" to work around issue with codepen and chrome (enables cross-origin requests to anywhere) //
        var url = "https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=1e3c0da719c22b2208b57dc63fde1e61";

        //GetJSON call
        $.getJSON(url, function(data) {

          // Create JSON variables
          var weather = data.weather[0].main;
          var temp = data.main.temp;
          var city = data.name;
          var country = data.sys.country;
          var id = data.weather[0].id;

          // Create variables to convert temperature in Celsius and farenheit
          var tempF = Math.round(temp * 9 / 5 - 459.67);
          var tempC = Math.round(temp - 273.15);


          //Output city, weather and temperature
          $("#icon").html("<i class='wi wi-fw wi-owm-" + id + "'></i>");

          $("#city").html("The weather in " + city + ", " + country + ": ");

          $("#weather").html(weather);

          $("#temperature").html(tempF + "&deg F");


          //Show weather info after intro fadeOut
          $("#icon").show(1700);
          $("#data").show(1700);
          $("#switch").show(1700);


          //Change background images according to weather conditions
          if (weather == "Clear") {
            $("body").css('background-image', 'url("http://www.discoverlosangeles.com/sites/default/files/styles/rotator_image/public/media/Activities/Events-Calendar-Rotator-1020.jpg?itok=qYcAsrhA")');
          } else if (weather == "Clouds" || weather == "Mist") {
            $("body").css('background-image', 'url("http://www.welikela.com/wp-content/uploads/2015/07/cloudy-los-angeles-skyline.jpg")');
          } else if (weather == "Rain") {
            $("body").css('background-image', 'url("http://a.scpr.org/i/50e403181ec7e55433dd8c32699ba69a/78937-full.jpg")');
            $("#icon").css("color", "black");
            $("#data").css("font-weight", "bold");
          };


          //Switch to Celsius or Farenheit
          var switchTemp = false;

          $("#switch").click(function() {
            if (switchTemp === false) {
              $("#temperature").html(tempC + "&deg C");
              switchTemp = true;
            } else {
              $("#temperature").html(tempF + "&deg F");
              switchTemp = false;
            };
          }); //End switchTemp


        }); // End JSON call
      }); // End function Geolocation
    } // End if Geolocation statement
    function errorCallback(error) {
      if (error.code == error.PERMISSION_DENIED) {
        console.log(error);
      }
    }
  }; // End function displayTheWeather

  // DO init() then displayWeather
  init();
  displayTheWeather();
  console.log("Hello");

});
