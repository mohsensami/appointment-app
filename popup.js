// Add a loading indicator to the popup
function showLoadingIndicator() {
  document.getElementById("content").textContent = "Loading...";
}

// Remove the loading indicator from the popup
function hideLoadingIndicator() {
  document.getElementById("content").textContent = "";
}

document.getElementById("posts").addEventListener("click", function () {
  showLoadingIndicator();
  fetch("https://jsonplaceholder.typicode.com/posts")
    .then((response) => response.json())
    .then((data) => {
      var titles = "";
      for (var i = 0; i < data.length; i++) {
        titles += "<h2>" + data[i].title + "</h2>";
      }
      document.getElementById("content").innerHTML = titles;
    });
  hideLoadingIndicator();
});

document.getElementById("comments").addEventListener("click", function () {
  showLoadingIndicator();
  fetch("https://jsonplaceholder.typicode.com/comments")
    .then((response) => response.json())
    .then((data) => {
      var titles = "";
      for (var i = 0; i < data.length; i++) {
        titles += "<h2>" + data[i].name + "</h2>";
      }
      document.getElementById("content").innerHTML = titles;
    });
  hideLoadingIndicator();
});

document.getElementById("localstorage").addEventListener("click", function () {
  var keys = Object.keys(localStorage);
  var items = "LocalStorage";
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    var value = localStorage.getItem(key);
    items += "<p><strong>" + key + ":</strong> " + value + "</p>";
  }
  document.getElementById("content").innerHTML = items;
});

document.getElementById("logs").addEventListener("click", function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      func: function () {
        var oldConsoleLog = console.log;
        console.log = function () {
          oldConsoleLog.apply(this, arguments);
          var args = Array.prototype.slice.call(arguments);
          chrome.runtime.sendMessage({ type: "log", message: args.join(" ") });
        };
      },
    });
  });
});

document.getElementById("screenshot").addEventListener("click", function () {
  chrome.tabs.captureVisibleTab(null, { format: "png" }, function (imageUrl) {
    // Display the screenshot in a new tab
    chrome.tabs.create({ url: imageUrl });
  });
});

document.getElementById("weather").addEventListener("click", function () {
  // const API_KEY = "ab3d8a663bf1ef42a7f37d1641a6982e"; // Replace with your own API key
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=tehran&appid=ab3d8a663bf1ef42a7f37d1641a6982e&units=metric&lang=en`
  )
    .then((response) => response.json())
    .then((data) => {
      // Display the current weather data in the popup
      const weather = data.weather[0].description;
      const temperature = data.main.temp;
      document.getElementById(
        "content"
      ).textContent = `Current weather: ${weather}, Temperature: ${temperature} °C`;
    });
});
