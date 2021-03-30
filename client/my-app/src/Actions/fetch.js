import axios from "axios";
import { FETCH } from "../Constants/post";

const fetchpost = (posts) => {
  return {
    type: FETCH,
    payload: posts,
  };
};

const fetchposts = () => {
  return (dispatch) => {
    axios
      .get("https://instax-backend.herokuapp.com/post")
      .then((response) => dispatch(fetchpost(response.data)))
      .catch((error) => {
        throw error;
      });
  };
};
export default fetchposts;
