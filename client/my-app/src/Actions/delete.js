import axios from "axios";
import { DELETE } from "../Constants/post";

const postdeleted = (allposts) => {
  return {
    type: DELETE,
    payload: allposts,
  };
};

export const postDelete = (data) => {
  return (dispatch) => {
    console.log(data);
    axios
      .delete(
        `https://instax-backend.herokuapp.com/post/deletepost/${data._id}`
      )
      .then((response) => dispatch(postdeleted(response.data)))
      .catch((error) => console.log(error));
  };
};
