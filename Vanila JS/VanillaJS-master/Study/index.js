const form = document.querySelector(".js-form"),
  input = form.querySelector("input"),
  greeting = document.querySelector(".js-greetings");

//2개의 플레이어를 선택하기
// 방법 1. querySelector. 원하는 Selector는 다 가져온다. class와 css방식으로 
// 방법 2. getElementID 태그로 엘리먼트르 가져오는것  -  이건 input, body, html, div, section

//여기서는 local storage를 사용한다. - 작은 정보를 유저의 컴퓨터에 저장하는 방식

const USER_LS = "currentUser",
  SHOWING_CN = "showing";
  
function saveName(text){
    localStorage.setItem(USER_LS, text);
}

function handleSubmit(event){
    event.preventDefault(); 
    // event의 기본동작(기본값)을 막는 코드 -> text창에 입력한게 사라지지 않음
    const currentValue = input.value;
    paintGreeting(currentValue);
    // 아래의 paintGreeting과 같은 기능을 가지게 하기
    saveName(currentValue);
}

function askForName(){
    form.classList.add(SHOWING_CN);
    form.addEventListener("submit", handleSubmit);
    // submit을 할려면 이것을 처리할게 필요하다. - 위에 function handleSubmit 생성
    //submit 뒤에 handSubmit 추가
}

function paintGreeting(text) {
  form.classList.remove(SHOWING_CN);
  //만약에 텍스트를 색칠할려면 폼을 숨겨야 한다. 
  greeting.classList.add(SHOWING_CN);
  greeting.innerText = `Hello ${text}`;
}

function loadName() {
  const currentUser = localStorage.getItem(USER_LS);
    //1. currentUser가 로컬스토리지에 있다면 else로 없다면 if로
    //나한테 주는 값
   if (currentUser === null) {
    // she is not
    askForName();
  } else {
    paintGreeting(currentUser);
  }
}
function init(){
    loadName();
}
init()