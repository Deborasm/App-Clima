let weather = {
    "apiKey": "82fa1a8e4dc45a47d6bc36b1e91bf434",
    fetchWeather: function (city) 
    {
        const url = "https://api.openweathermap.org/data/2.5/weather?q=" +
                     city +
                     "&units=metric&lang=pt_br&appid=" +
                     this.apiKey;

        fetch(url)
        .then((response) => {
          if (!response.ok) {
            alert("Cidade não encontrada.");
            throw new Error("Cidade não encontrada.");
          }
          return response.json();
        })
        .then((data) => {
            this.displayWeather(data);
        })
    },

    displayWeather: function(data)
    {
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        const { country } = data.sys;
      

        document.querySelector(".city").innerHTML = name + " - " + country;
        document.querySelector(".icon").src = "./img/"+ icon + ".png"
        document.querySelector(".description").innerHTML = description;
        let temperatura = parseFloat(temp).toFixed();
        document.querySelector(".temp").innerHTML = temperatura.toString() + "°C";
        document.querySelector(".humidity").innerHTML = humidity + "%";
        document.querySelector(".wind").innerHTML = speed + " km/h";
    
        document.querySelector(".weather").classList.remove("loading");
    
        document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + name + "')"
    },

    search: function () {
      this.fetchWeather(document.querySelector(".search-bar").value);
    },
};

document.querySelector(".search button").addEventListener("click", function () {
    weather.search();
});

document
  .querySelector(".search-bar")
  .addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      weather.search();
    }
  });

weather.fetchWeather("Florianópolis");