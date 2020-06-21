// //step2
// const initialState = {
//     number: 0,
//   };
//   //step 3
//   const INCREASE = "com1/INCREASE";
//   const DECREASE = "com1/DECREASE";
//   export const increase = () => ({ type: INCREASE });
//   export const decrease = () => ({ type: DECREASE });
//   export default function com1(state = initialState, action) {
//     //state = initialState 한번만 실행. action = 이벤트
//     console.log("reducer call");
//     switch (action.type) {
//       case INCREASE:
//         return {
//           number: state.number + 1, //return되면 stateToProps로 넘어간다. 아직 store의 number가 갱신된게 아니다.
//         };
//       case DECREASE:
//         return {
//           number: state.number - 1,
//         };
//       default:
//         console.log("default reducer");
//         return state;
//     }
//   }

 //step2
const initialState = {
  number: 0,
};
//step 3
const INCREASE = "com1/INCREASE";
const DECREASE = "com1/DECREASE";
export const increase = () => ({ type: INCREASE });
export const decrease = () => ({ type: DECREASE });
export default function com1(state = initialState, action) {
  //state = initialState 한번만 실행. action = 이벤트
  console.log("reducer call");
  switch (action.type) {
    case INCREASE:
      return {
        number: state.number + 1, //return되면 stateToProps로 넘어간다. 아직 store의 number가 갱신된게 아니다.
      };
    case DECREASE:
      return {
        number: state.number - 1,
      };
    default:
      console.log("default reducer");
      return state;
  }
}