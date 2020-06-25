import { createStore } from "redux"
//store는 나의 data를 넣는 곳이다. 나의 state
//state는 나의 application에서 바뀌는 data를 말한다  
// 여기서는 let count = 0; 이다.

const add = document.getElementById("add");
const minus = document.getElementById("minus");
const number = document.querySelector("span");

number.innerText = 0;

const ADD = "ADD";
const MINUS = "MINUS";
//String을 keep해주는 const를 만들어 주기

const countModifier = (count = 0, action) =>{
  switch (action.type) {
    case ADD:
      return count + 1;
    case MINUS:
      return count - 1;
    default:
      return count;
  }
}
// 여기가 유일하게 데이터를 수정 하는 곳이다.

const countStore = createStore(countModifier);

const onChange = () =>{
  //console.log(countStore.getSta te());
  //계발자 모드에서 보임
  number.innerText = countStore.getState();
  //화면에 보임
}
countStore.subscribe(onChange)
//subscribe는 우리에게 store 안에 있는 변화들을 알수 있게 해준다

const handleAdd = () => {
  countStore.dispatch({ type: ADD });
};

const handleMinus = () => {
  countStore.dispatch({ type: MINUS });
};
add.addEventListener("click", handleAdd);
minus.addEventListener("click", handleMinus);


// add. addEventListener("click", () => countStore.dispatch({type : "ADD"}))
// minus. addEventListener("click", () => countStore.dispatch({type : "MINUS"}))
// 위 아래 동일
