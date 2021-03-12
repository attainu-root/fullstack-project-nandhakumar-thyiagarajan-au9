const Fetching = () => {
  return {
    type: 'FETCHING',
  };
};

const Fetched = (data) => {
  return {
    type: 'FETCHED',
    payload: data,
  };
};

const Failure = (error) => {
  return {
    type: 'FAILURE',
    payload: error,
  };
};

const URL = () => {
  return (dispatch) => {
    dispatch(Fetching());
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((res) => res.json())
      .then((data) => dispatch(Fetched(data)))
      .catch((error) => dispatch(Failure(error)));
  };
};

export default URL;
