export function loadTweets(callback) {
  const xhr = new XMLHttpRequest();
  const method = "GET";
  const url = "http://localhost:8000/api/tweets/";
  const responseType = "json";
  xhr.responseType = responseType;
  xhr.open(method, url);
  xhr.onload = function () {
    callback(xhr.response, xhr.status);
  };
  xhr.onerror = function (e) {
    console.log(e);
    callback({ message: "The request was on error" }, 400);
  };
  xhr.send();
}
