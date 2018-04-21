$(document).ready(function () {

  //Remove intro 
  const init = function () {
    $("#title").fadeOut(1500);
    $("#appl").hide();
  } // End init()


  const getPosition = function (options) {
    return new Promise(function (resolve, reject) {
      navigator.geolocation.getCurrentPosition(resolve, reject, options);
    });
  }

  // Start app
  init();

  // Check for geolocation
  getPosition()
    .then((position) => {
      console.log(position.coords.longitude)
      console.log(position.coords.latitude)
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      getWeather(lat, lon);
    })
    .catch((err) => {
      console.error("error: ", err.message);
      alert("Error: " + err.message + " ... I bet you it's raining in London...");
      const lat = 51.5085;
      const lon = -0.1258;
      getWeather(lat, lon);
    });

  // Build URL with lat and long from geolocation (if geolocation not authorised : show weather in London)
  const getWeather = (lat, lon) => {
    const url = "https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=1e3c0da719c22b2208b57dc63fde1e61";
    //const laUrl = "https://fcc-weather-api.glitch.me/api/current?lat=34.0549&lon=-118.2445";


    // Fetch data from OpenWeather API  
    $.getJSON(url, function (data) {

      const weather = data.weather[0].main;
      const temp = data.main.temp;
      const city = data.name;
      const country = data.sys.country;
      const id = data.weather[0].id;

      // Create variables to convert temperature in Celsius and farenheit   
      const tempF = Math.round(temp * 9 / 5 - 459.67);
      const tempC = Math.round(temp - 273.15);


      // Output city, weather and temperature  
      $("#icon").html("<i class='wi wi-fw wi-owm-" + id + "'></i>");
      $("#city").html("The weather in " + city + ", " + country + ": ");
      $("#weather").html(weather);
      $("#temperature").html(tempF + "&deg F");

      // Show weather info     
      $("#switch").fadeIn(1700);
      $("#app").fadeIn(1700);

      // Change background images according to weather conditions      
      if (weather == "Clear") {
        // $("body").css('background-image', 'url("http://www.discoverlosangeles.com/sites/default/files/styles/rotator_image/public/media/Activities/Events-Calendar-Rotator-1020.jpg?itok=qYcAsrhA")');
        $("body").css('background-image', 'url("https://images.unsplash.com/photo-1502200893034-b7bca90610ef?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=c081e2fd522f3c6e53fdf4b47aeb0943&auto=format&fit=crop&w=1353&q=80")');
      } else if (weather == "Clouds" || weather == "Mist") {
        // $("body").css('background-image', 'url("http://www.welikela.com/wp-content/uploads/2015/07/cloudy-los-angeles-skyline.jpg")');
        $("body").css('background-image', 'url("https://images.unsplash.com/photo-1506409192306-b368ff0c21eb?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=9b2b034a37f4325c424345698dc3c117&auto=format&fit=crop&w=1050&q=80")');

      } else if (weather == "Rain") {
        // $("body").css('background-image', 'url("http://a.scpr.org/i/50e403181ec7e55433dd8c32699ba69a/78937-full.jpg")');
        $("body").css('background-image', 'url("https://images.unsplash.com/photo-1433863448220-78aaa064ff47?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=723ac0c6a3eb82eb16190fea1ad22755&auto=format&fit=crop&w=1189&q=80")');
        $("#icon").css("color", "black");
        $("#data").css("font-weight", "bold");
      };

      //Switch to Celsius or Farenheit       
      let switchTemp = false;

      $("#switch").click(function () {
        if (switchTemp === false) {
          $("#temperature").html(tempC + "&deg C");
          switchTemp = true;
        } else {
          $("#temperature").html(tempF + "&deg F");
          switchTemp = false;
        };
      }); //End switchTemp  
    }); // End JSON call 
  } // End getWeather()   
}); // End document.ready