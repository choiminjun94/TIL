// import React from "react"
// import { connect } from "react-redux"
// import { decrease, increase } from "../modules/com2";

// //step 1
// const Com2 = ({ number, onInc, onDec }) => {
//     return (
//       <div>
//         <h1>{number}</h1>
//         <button onClick={onInc}>+1</button>
//         <button onClick={onDec}>-1</button>
//       </div>
//     );
//   };
 

//   //step 5
//   const StateToProps = state => {
//     console.log("StateToProps call");
//     console.log(state.number);
//     return {
//       number: state.com2.number, //여기서 store의 number가 갱신된다.
//     };
//   };
//   //step 6
//   const DispatchToProps = dispatch => ({
//     onInc: () => {
//       //앞으로 onIncrease라는 이벤트가 발생을 하면
//       console.log("increase");
//       dispatch(increase()); // "INCREASE" 라는 글자를 들고 reducer로 가라.
//     },
//     onDec: () => {
//       console.log("decrease");
//       dispatch(decrease());
//     },
//   });
//   //step 7
//    export default connect(StateToProps, DispatchToProps)(Com2);
// //   export default App;
import React from "react"
import { connect } from "react-redux"
import { decrease, increase } from "../modules/com2";

//step 1
const Com2 = ({ number, onInc, onDec }) => {
    return (
      <div>
        <h1>{number}</h1>
        <button onClick={onInc}>+1</button>
        <button onClick={onDec}>-1</button>
      </div>
    );
  };
 

  //step 5
  const StateToProps = state => {
    console.log("StateToProps call");
    console.log(state.number);
    return {
      number: state.com2.number, //여기서 store의 number가 갱신된다.
    };
  };
  //step 6
  const DispatchToProps = dispatch => ({
    onInc: () => {
      //앞으로 onIncrease라는 이벤트가 발생을 하면
      console.log("increase");
      dispatch(increase()); // "INCREASE" 라는 글자를 들고 reducer로 가라.
    },
    onDec: () => {
      console.log("decrease");
      dispatch(decrease());
    },
  });
  //step 7
   export default connect(StateToProps, DispatchToProps)(Com2);