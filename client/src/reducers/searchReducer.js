import { GET_SEARCH } from "../actions/Types";
const initialState = {
  search_result: []
};
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_SEARCH:
      return { ...state, search_result: action.payload };
    default:
      return state;
  }
}
