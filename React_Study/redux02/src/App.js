import React from "react"
const App = () => {
  return (
    <div>
      <Counter number={0} />
    </div>
  )
}
export default App
const Counter = ({ number, onIncrease, onDecrease }) => {
  return (
    <div>
      <h1>{number}</h1>
      <div>
        <button onClick={onIncrease}>+1</button>
        <button onClick={onDecrease}>-1</button>
      </div>
    </div>
  )
}
const initialState = {
  number: 0,
}
const INCREASE = "INCREASE"
const DECREASE = "DECREASE"
const increase = () => ({ type: INCREASE })
const decrease = () => ({ type: DECREASE })
export const counter = (state = initialState, action) => {
  console.log("reduce call")
  switch (action.type) {
    case INCREASE:
      return {
        number: state.number + 1,
      }
    case DECREASE:
      return {
        number: state.number - 1,
      }
    default:
      return false
  }
}