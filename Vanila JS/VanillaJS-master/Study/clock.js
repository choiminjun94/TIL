const clockContainer = document.querySelector(".js-clock"),
  clockTitle = clockContainer.querySelector("h1");
// const clockContainer = document.querySeletor("js-clocl")
// clockTitle = clockContainer.querySelector("h1");
// 위에 코드와 아래의 코드는 찾은 역할을 한다.

function getTime() {
  const date = new Date();
  const minutes = date.getMinutes();
  const hours = date.getHours();
  const seconds = date.getSeconds();
  clockTitle.innerText = `${hours}:${minutes}:${seconds}`;
//     //innerText = 객체 안에 텍스트를 넣기 위한것
//     //그래서 뒤에는 문자열이 와야 한다.
clockTitle.innerText = `${hours < 10 ? `0${hours}` : hours}:${
  minutes < 10 ? `0${minutes}` : minutes
}:${seconds < 10 ? `0${seconds}` : seconds}`;
}

function init() {
  getTime();
  setInterval(getTime, 1000);
}

init();
