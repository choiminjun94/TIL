import React from "react"
import { connect } from "react-redux"
import { createAction, handleActions } from "redux-actions"

const App = () => {
  const f1 = function () {
    const tiger = 10;
    const obj = {
      payload: tiger, // 위에 선언한 tiger
      etc: 20
    }
    
    f2(obj);
    f3(obj);
    f4(obj);
    f5(obj);
  }
  const f2 = function (action) {
    console.log(action.payload);
    console.log(action.etc);
  }
  const f3 = function ({ payload, etc }) // 전계 연산
  {
    console.log(payload);
    console.log(etc);
  }
  const f4 = function ({ payload, etc }) {
    console.log(payload);
  }
  const f5 = function ({ payload: tiger }) {
    console.log(tiger);
  }
  const f6 = function () {
    const tiger = {
      a: 10,
      b: 20,
    }
    const obj = {
      payload: tiger,
    }
    f7(obj)
    f8(obj)
  }
  const f7 = function (action) {
    console.log(action.payload.a, action.payload.b)
  }
  const f8 = function ({ payload: tiger }) {
    console.log(tiger.a, tiger.b)
  }
  return (
    <div>
      <button onClick={f1}>버튼1</button>
      <button onClick={f6}>버튼2</button>
      <button>버튼3</button>
    </div>
  )
}

// STEP1
const Com1 = (props) => {
  return (
    <div>
      <h1>{props.number}</h1>
      <div>
        <button
          onClick={() => {
            props.onIncrease({ a: 10, b: 20, c: 30 })
          }}
        >
          +1
        </button>
        <button
          onClick={() => {
            props.onDecrease({ a: 10, b: 20, c: 30 })
          }}
        >
          -1
        </button>
      </div>
    </div>
  )
}

// STEP2
const initialState = {
  number: 0,
}

// STEP3
const INCREASE = "INCREASE"
const DECREASE = "DECREASE"

export const increase = createAction(INCREASE)
export const decrease = createAction(DECREASE)

export const reduce = handleActions(
  {
    [INCREASE]: (state) => {
      const a = { x: 10, y: 20, z: 30 }
      const b = { ...a, t: "tiger" }
      return { number: state.number + b.y }
    },
    [DECREASE]: (state, { payload: input }) => ({ number: state.number - input.b }),
  },
  initialState,
)

const Com1Container = ({ number, increase, decrease }) => {
  return <Com1 number={number} increase={increase} decrease={decrease} />
}

const com1connect = connect(
  (state) => ({
    number: state.number,
  }),
  {
    increase: increase,
    onDecrease: decrease,
  },
)(Com1)

export default App