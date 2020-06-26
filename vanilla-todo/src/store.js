import { createStore } from "redux";

const ADD = "ADD";
const DELETE = "DELETE";

export const addToDo = text => {
  return {
    type: ADD,
    text
  };
};

export const deleteToDo = id => {
  return {
    type: DELETE,
    id
  };
};

const reducer = (state = [], action) => {
  switch (action.type) {
    case ADD:
      return [{ text: action.text, id: Date.now() }, ...state];
    case DELETE:
      return state.filter(toDo => toDo !== action.id);
    default:
      return state;
  }
};

const store = createStore(reducer);
//이부분을 변화를 주고 싶을때 react-redux가 필요 하다.

export default store;