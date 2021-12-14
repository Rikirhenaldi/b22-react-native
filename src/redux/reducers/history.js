const initialState = {
  listhistory: '',
  detailhistory: '',
  sccMsg: '',
  data:[],
};

const history = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_HISTORY': {
      return {
        ...state,
        listhistory: action.payload,
      };
    }
    case 'GET_DETAIL_HISTORY': {
      return {
        ...state,
        detailhistory: action.payload,
      };
    }
    case 'DELETE_HISTORY': {
      return {
        ...state,
        sccMsg: action.payload,
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};

export default history;
