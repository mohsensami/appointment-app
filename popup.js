fetch("https://jsonplaceholder.typicode.com/posts")
  .then((response) => response.json())
  .then((data) => {
    document.getElementById("content").innerHTML = JSON.stringify(data);
  });
