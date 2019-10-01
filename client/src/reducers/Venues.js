import { GET_VENUE_BYCOUNTRY } from "../actions/Types";

const initialState = {
  venueByCountry: []
};
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_VENUE_BYCOUNTRY:
      return {
        ...state,
        venueByCountry: action.payload
      };
    default:
      return state;
  }
}
