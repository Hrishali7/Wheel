// export default function wheelReducer(state = initialState, action) {
//   switch (action.type) {
//     case SPIN_WHEEL:
//       return {
//         ...state,
//         isSpinning: true,
//         winningNumber: action.payload,
//       };
//     case STOP_WHEEL:
//       return {
//         ...state,
//         isSpinning: false,
//         winningNumber: null,
//       };
//     default:
//       return state;
//   }
// }
const SPIN_WHEEL = "SPIN_WHEEL";
const STOP_WHEEL = "STOP_WHEEL";


const initialState = {
  isSpinning: false,
  winningNumber: null,
};


export default function wheelReducer(state = initialState, action) {
  switch (action.type) {
    case SPIN_WHEEL:
      return {
        ...state,
        isSpinning: true,
        winningNumber: action.payload,
      };
    case STOP_WHEEL:
      return {
        ...state,
        isSpinning: false,
        winningNumber: null,
      };
    default:
      return state;
  }
}

export const spinWheel = (number) => ({
  type: SPIN_WHEEL,
  payload: number,
});

export const stopWheel = () => ({
  type: STOP_WHEEL,
});