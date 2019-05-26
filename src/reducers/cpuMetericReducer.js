const initialState = {
  data: {
      data: {},
      options: {}
  }
}

export default function(state = initialState, action) {
  switch (action.type) {
    case 'FETCH_DATA':
      return {
        ...state,
        data: action.payload
      }
    default:
      return state;
  }
}
