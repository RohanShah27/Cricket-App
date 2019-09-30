import { GET_HEADLINES, GET_SINGLE_HEADLINE } from "../actions/Types";
const initialState = {
  headlines: [],
  headline: [{}]
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_HEADLINES:
      return { ...state, headlines: action.payload };
    case GET_SINGLE_HEADLINE:
      return { ...state, headline: action.payload };
    default:
      return state;
  }
}
