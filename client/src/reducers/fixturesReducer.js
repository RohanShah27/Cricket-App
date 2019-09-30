import { GET_FIXTURES } from "../actions/Types";
const initialState = {
  fixtures: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_FIXTURES:
      return { ...state, fixtures: action.payload };
    default:
      return state;
  }
}
