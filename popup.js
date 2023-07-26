// fetch("https://jsonplaceholder.typicode.com/posts")
//   .then((response) => response.json())
//   .then((data) => {
//     document.getElementById("content").innerHTML = JSON.stringify(data);
//   });

document.getElementById("posts").addEventListener("click", function () {
  fetch("https://jsonplaceholder.typicode.com/posts")
    .then((response) => response.json())
    .then((data) => {
      var titles = "";
      for (var i = 0; i < data.length; i++) {
        titles += "<h2>" + data[i].title + "</h2>";
      }
      document.getElementById("content").innerHTML = titles;
    });
});

document.getElementById("comments").addEventListener("click", function () {
  fetch("https://jsonplaceholder.typicode.com/comments")
    .then((response) => response.json())
    .then((data) => {
      var titles = "";
      for (var i = 0; i < data.length; i++) {
        titles += "<h2>" + data[i].name + "</h2>";
      }
      document.getElementById("content").innerHTML = titles;
    });
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
