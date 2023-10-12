$('document').ready(function(){
    
  function weatherBalloon( zipCode ) {
    $('#location').html('<img class="spinner" src="spinner.gif"> Loading...');
    var key = 'f0681a625ecda68fb91a80f8863ac797';
    fetch('https://api.openweathermap.org/data/2.5/forecast?zip=' + zipCode + ',us' + '&appid=' + key + '&units=imperial')  
    .then(function(resp) { return resp.json() }) // Convert data to json
    .then(function(data) {
     console.log(data);
     convertToEST(data);
     drawWeather(data);
    })
    .catch(function() {
      // catch any errors
    });
  }
      
  $("#searchWeather").one( "focus", function() {
      getLocation();
  });
  
  $("#searchWeather").focusout(function() {
      $('#location').css("opacity", "1");
      $('.overview').css("opacity", "1");
  });
      
  $("#searchWeather").click(function() {
      $('#location').css("opacity", "0.3");
      $('.overview').css("opacity", "0.3");
      $('#searchWeather').val('');
  });
                                
  function getLocation(){
      if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(getPosition, showError);
        } else { 
          $('#user-message').html('Error: Geolocation is not supported by this browser.');
        } 
  }
  
  function showError(error) {
    switch(error.code) {
      case error.PERMISSION_DENIED:
        $('#user-message').html("Hmm, it looks like you denied our request for your geolocation. Please enter your zip code manually.")
        break;
      case error.POSITION_UNAVAILABLE:
        $('#user-message').html("Error: Location information unavailable. Please type your zipcode manually.")
        break;
      case error.TIMEOUT:
        $('#user-message').html("Error: Timeout. Please type your zipcode manually.")
        break;
      case error.UNKNOWN_ERROR:
        $('#user-message').html("An unknown error occurred.")
        break;
    }
  }
      
  function getPosition(position) {
      $('#location').css("opacity", "1");
      $('#location').html('<img class="spinner" src="spinner.gif"> Loading...');
      var key = 'f0681a625ecda68fb91a80f8863ac797';
      fetch('https://api.openweathermap.org/data/2.5/forecast?lat=' + position.coords.latitude + '&lon=' + position.coords.longitude  + '&appid=' + key + '&units=imperial')
      .then(function(resp){ return resp.json()})
      .then(function(data) {
          console.log(data);
          convertToEST(data);
          drawWeather(data);
         })
         .catch(function() {
           // catch any errors
         });
       
      console.log({Latitude: position.coords.latitude, Longitude: position.coords.longitude});
    }
    
  function convertToEST (d) {
      for ( i = 0; i < d.list.length; i++ ) {
          var estTime = moment(d.list[i].dt_txt).subtract(3,'hours').format("YYYY-MM-DD HH:mm:ss")
          d.list[i].dt_txt = estTime;
      }
  }
  
  function findMostCommon(array) {
      var map = array.map(function(a) {
          return array.filter(function(b) {
              return a === b;
          }).length;
      });
  
      return array[map.indexOf(Math.max.apply(null, map))];
  }    
  
  function drawWeather( d ) {
      $('#location').css("opacity", "1");
      $('.overview').css("opacity", "1");
      $('.container').remove();
      $('#location').html('5-Day Forecast for ' + d.city.name + ', United States of America'); 
  
  function setWeatherClass (i) {
      if ( i == 800 ) {
          return 'weather-' + i.toString();
      }
      else {
          return 'weather-' + i.toString().charAt(0);
      }
  }
      
  var dayCheck = d.list[0].dt_txt.indexOf(moment().format("YYYY-MM-DD"));
  var currentDay;
  
      if (dayCheck > -1) { 
          currentDay = 0 
      }
      
      else { 
          currentDay = 1; 
      }
      
  for ( a = currentDay; a < currentDay + 5; a++ ) {
  
      $('.overview').append (
          '<div class="container container-' + a + '">'
          + '<div class="date-container">' 
          + '<h2 class="date date-' + a + '">' + moment().add(a,'days').format("ddd") + '</h2>'
          + '<div class="day day-' + a + '">' + moment().add(a,'days').format("MMMM D") + '</div>'
          + '</div>'
          + '</div>');
      $('.date-0').html("Today");
      
      var maxTempArray = [];
      var minTempArray = [];
      var iconArray = [];
      var descArray = [];
      var humidArray = [];
      var windArray = [];
      
      for ( i = 0; i < d.list.length; i++ ) {
          var timeCheck = d.list[i].dt_txt.indexOf(moment().add(a,'days').format("YYYY-MM-DD"));
          if (timeCheck > - 1) {
              maxTempArray.push(d.list[i].main.temp_max);
              minTempArray.push(d.list[i].main.temp_min);
              iconArray.push(d.list[i].weather[0].id);
              descArray.push(d.list[i].weather[0].description);
              humidArray.push(d.list[i].main.humidity);            
              windArray.push(d.list[i].wind.speed);
          }
      }
        
              $(".container-" + a).append(
                  '<div class="three">'
                  + '<div class="weather-icon">' + '<i class="wi wi-owm-' + findMostCommon(iconArray) + '"></i></div>'
                  + '<div class="weather-desc">' + findMostCommon(descArray) + '</div>'
                  + '<div class="temp">'
                      + '<div class="temp-max">' 
                          + Math.round(Math.max.apply(Math, maxTempArray)) + '&deg;' 
                              + '<div class="temp-desc desc-1">High</div>' 
                          + '</div>'
                      + '<div class="temp-and">&mdash;</div>'
                      + '<div class="temp-min">' 
                          + Math.round(Math.min.apply(Math, minTempArray)) + '&deg;' 
                              + '<div class="temp-desc desc-2">Low</div>' 
                      + '</div>'
                  + '</div>' 
                  + '<br />' + 'Humidity: ' + findMostCommon(humidArray) + '%' 
                  + '<br />' + 'Wind Speed: ' + Math.round(findMostCommon(windArray)) + 'mph'
                  + '</div>'
                  + '</div>');
              var topTest = setWeatherClass(findMostCommon(iconArray));
              $(".container-" + a).addClass(topTest);
      }
      
  } 
  
  weatherBalloon ( 90001 ); //default location shown    
  
      
  $("#searchform").submit(function(e) {
      $('#user-message').remove();
      e.preventDefault();
      var loc = $('#searchWeather').val();
      if(isNaN(loc) || (loc.length != 5)){
          alert("Please enter a valid zipcode")
      } else {
      weatherBalloon($('#searchWeather').val());
      }
  });