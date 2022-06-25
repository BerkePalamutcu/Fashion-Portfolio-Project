export const dataInitialState = {
  itemData: {},
};

export const dataReducer = (state = dataInitialState, action = {}) => {
  const { type, payload } = action;
  switch (type) {
    case 'set_item_data':
      return { ...state, itemData: payload };
    default:
      return state;
  }
};
