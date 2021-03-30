import { UPDATE, CLEAR } from "../Constants/post";

const updatePost = [];
const updateReducer = (state = updatePost, action) => {
  switch (action.type) {
    case UPDATE:
      return (state = action.payload);
    case CLEAR:
      return (state = []);
    default:
      return state;
  }
};

export default updateReducer;
