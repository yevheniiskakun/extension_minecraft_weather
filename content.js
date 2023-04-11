let image_url;
let bare_url;
let description_text = "the new day";

let lon;
let lat;
let temperature = document.querySelector(".temp");
let loc = document.querySelector(".location");

let celsius_temp;
const kelvin = 273;

var day_hour = 4;
var night_hour = 23;

quote_list = ["What you spend years building may be destroyed overnight. Build anyway", "This isn't about the past! It's about the future!", "If at first you don't succeed... succeed later than originally planned.", "Never dig straight down", "Keep calm and play Minecraft", "With great power comes great responsibility", "12345 is a bad password!", "Awesome game design right there!", "Don't look directly at the bugs!", "Lennart lennart = new Lennart();", "Made in Sweden!", "Stay home and play video games!", "Who lives in a pineapple under the sea?", "Be brave like Ukraine", "We live every day we only die once", "Veni, Vidi, Vici!", "The purpose of our lives is to be happy", "My mama always said, life is like a box of chocolates. You never know what you are gonna get", "There are no mistakes, only opportunities", "I would wish you good luck, but luck won't carry you through the Nether.", "Education is the movement from darkness to light."];

//----------
let typingTimer;                //timer identifier
let doneTypingInterval = 2000;  //time in ms (2 seconds)
let myInput = document.getElementById('search_input');

//on keyup, start the countdown. After it we will start to search given string in Google
myInput.addEventListener('keyup', () => {
    clearTimeout(typingTimer);
    if (myInput.value) {
        document.getElementById('search_spinner').style.opacity = "1";
        typingTimer = setTimeout(doneTyping, doneTypingInterval);
    }
    else{
      document.getElementById('search_spinner').style.opacity = "0";
    }
    
});

//check if user is "finished typing," do something
function doneTyping () {
  var searched_text = document.getElementById("search_input").value;
  console.log(searched_text);
  document.getElementById("search_input").innerHTML = "";
  window.location.href = "https://www.google.com/search?q=" + searched_text;
}

//---------- Generate random int in given range
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getFormattedTime(unix_time, timezone){
  // multiplied by 1000 so that the argument is in milliseconds, not seconds.
  var date = new Date(unix_time * 1000);
  // Hours part from the timestamp
  var hours = date.getHours();
  // timezone is shift in seconds from UTC
  hours = hours + timezone / 3600
  // Minutes part from the timestamp
  var minutes = "0" + date.getMinutes();
  // Will display time in 10:30:23 format
  var formattedTime = hours;
  //console.log("Formatted time", formattedTime);
  return formattedTime;
            
}

if(window.location.href){
  window.addEventListener("load", () => {
    if (navigator.geolocation) {
      // Get current user possition to determine city where he located in
      navigator.geolocation.getCurrentPosition((position) => {
        lon = position.coords.longitude;
        lat = position.coords.latitude;
    
        // API URL
        const base =
  `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&` +
  `lon=${lon}&appid=7d214574a044cb73159d7627127950b9`;
        
        
        // Calling the API
        fetch(base)
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            // Get temperature in celsius to show it on the page
            celsius_temp = Math.floor(data.main.temp - kelvin) + '';
            document.getElementById("temperature").innerHTML = celsius_temp;
            

            let weather_description = data.weather[0].description;

            var time_sunrise = getFormattedTime(data.sys.sunrise, data.timezone);
            var time_sunset = getFormattedTime(data.sys.sunset, data.timezone);
            
            var hour_now = new Date().toLocaleTimeString([], { hour: '2-digit'});


            function create_url(random_int){
              if(celsius_temp > 29){
                bare_url = 'Nether/' + random_int + '.png';
                image_url = "url('Nether/" + random_int + ".png')"
                description_text = 'hight temperature';
              }else if(time_sunrise - hour_now == 1 || time_sunrise - hour_now == 0 || hour_now - time_sunrise == 0){
                bare_url = 'Sunrise/' + random_int + '.png';
                image_url = "url('Sunrise/" + random_int + ".png')";
                description_text = "sunrise";
              }else if(time_sunset - hour_now == 1 || time_sunset - hour_now == 0 || hour_now - time_sunset == 0){
                bare_url = 'Sunset/' + random_int + '.png';
                image_url = "url('Sunset/" + random_int + ".png')";
                description_text = "sunset";
              }else if(weather_description.includes("thunderstorm") == true){
                bare_url = 'Thunderstorm/' + random_int + '.png';
                image_url = "url('Thunderstorm/" + random_int + ".png')";
                description_text = "thunderstorm";
              }else if(weather_description.includes("mist") == true){
                bare_url = 'Mist/' + random_int + '.png';
                image_url = "url('Mist/" + random_int + ".png')";
                description_text = 'mist';
              }else if(weather_description.includes("mist") == true){
                bare_url = 'Mist/' + random_int + '.png';
                image_url = "url('Mist/" + random_int + ".png')";
                description_text = 'mist';
              }else{
                if(weather_description.includes("clouds") == true){
                  if(hour_now > night_hour || hour_now < day_hour){
                    bare_url = 'CloudsNight/' + random_int + '.png';
                    image_url = "url('CloudsNight/" + random_int + ".png')"
                  }
                  else{
                    bare_url = 'CloudsDay/' + random_int + '.png';
                    image_url = "url('CloudsDay/" + random_int + ".png')"
                  }
                  description_text = 'clouds';
                }else if(weather_description.includes("snow") == true){
                  if(hour_now > night_hour || hour_now < day_hour){
                    bare_url = 'SnowNight/' + random_int + '.png';
                    image_url = "url('SnowNight/" + random_int + ".png')";
                  }else{
                    bare_url = 'SnowDay/' + random_int + '.png';
                    image_url = "url('SnowDay/" + random_int + ".png')";
                  }
                  description_text = 'snow';
                }else if(weather_description.includes("rain") == true){
                  if(hour_now > night_hour || hour_now < day_hour){
                    bare_url = 'RainNight/' + random_int + '.png';
                    image_url = "url('RainNight/" + random_int + ".png')";
                  }else{
                    bare_url = 'RainDay/' + random_int + '.png';
                    image_url = "url('RainDay/" + random_int + ".png')";
                  }
                  description_text = 'rain';
                }else if(weather_description.includes("clear") == true){
                  if(hour_now > night_hour || hour_now < day_hour){
                    bare_url = 'ClearNight/' + random_int + '.png';
                    image_url = "url('ClearNight/" + random_int + ".png')"
                  }else{
                    bare_url = 'ClearDay/' + random_int + '.png';
                    image_url = "url('ClearDay/" + random_int + ".png')"
                  }
                  description_text = 'clear sky';
                }
                else{
                  bare_url = 'Mist/' + random_int + '.png';
                  image_url = "url('Mist/" + random_int + ".png')";
                  description_text = 'the new day';
                }
              }
              
              document.getElementById("summary").innerHTML = description_text;

              quote_list_len = quote_list.length
              let quote_random_int = getRandomInt(0, quote_list_len - 1);
              if(quote_list[quote_random_int] == undefined){
                document.getElementById("quote").innerHTML = quote_list[1];
              }else{
                document.getElementById("quote").innerHTML = quote_list[quote_random_int];
              }
            }

            let random_int = getRandomInt(0, 30);
            create_url(random_int);

            // Check if image for background exist
            fetch(bare_url, { method: 'HEAD' })
            .then(res => {
                if (res.ok) {
                  document.body.style.backgroundImage = image_url; // if exist show it
                } else {
                    console.log(bare_url + ' Image does not exist.');
                }
            }).catch((err) => {                                    // if not   
              random_int = getRandomInt(0, 7);                     // search for another im smaller range
              create_url(random_int);
              document.body.style.backgroundImage = image_url;
            });
            // -------------------------------------
            
            // Set background properties to make its more responsive
            document.body.style.backgroundRepeat = "no-repeat";
            document.body.style.backgroundSize = "cover";
            document.body.style.backgroundPosition = "center";
          });
      });
    }
  });
}
