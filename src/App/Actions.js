export const spinWheel = (number) => ({
  type: SPIN_WHEEL,
  payload: number,
});

export const stopWheel = () => ({
  type: STOP_WHEEL,
});


const initialState = {
  isSpinning: false,
  winningNumber: null,
};
