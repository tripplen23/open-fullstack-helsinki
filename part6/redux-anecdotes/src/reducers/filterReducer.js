const initialState = "";

const filterReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_FILTER":
      return action.filterValue; // Update the filter state with the provided filterValue
    default:
      return state; // Return the current state for any other action types
  }
};

export default filterReducer;
