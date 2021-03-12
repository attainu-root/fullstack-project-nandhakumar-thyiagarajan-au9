const data = {
  sucess: false,
  response: [],
  error: false,
};

const Login = (state = data, action) => {
  switch (action.type) {
    case 'FETCHING':
      return {
        ...state,
        sucess: true,
      };

    case 'FETCHED':
      return {
        ...state,
        sucess: false,
        response: action.payload,
      };

    case 'FAILURE':
      return {
        ...state,
        sucess: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default Login;
