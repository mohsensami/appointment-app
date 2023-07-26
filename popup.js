// fetch("https://jsonplaceholder.typicode.com/posts")
//   .then((response) => response.json())
//   .then((data) => {
//     document.getElementById("content").innerHTML = JSON.stringify(data);
//   });

document.getElementById("posts").addEventListener("click", function () {
  fetch("https://jsonplaceholder.typicode.com/posts")
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("content").innerHTML = JSON.stringify(data);
    });
});

document.getElementById("comments").addEventListener("click", function () {
  fetch("https://jsonplaceholder.typicode.com/comments")
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("content").innerHTML = JSON.stringify(data);
    });
});
