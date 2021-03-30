import { CREATE, FETCH, UPDATED, DELETE } from "../Constants/post";

const POSTS = [];

const postReducer = (state = POSTS, action) => {
  switch (action.type) {
    case FETCH:
      return (state = action.payload);
    case CREATE:
      return (state = action.payload);
    case UPDATED:
      return (state = action.payload);
    case DELETE:
      return (state = action.payload);
    default:
      return state;
  }
};

export default postReducer;
