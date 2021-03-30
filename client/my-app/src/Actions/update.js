// import axios from "axios";
import axios from "axios";
import { UPDATE, CLEAR, UPDATED } from "../Constants/post";

export const updateAction = (postData) => {
  return {
    type: UPDATE,
    payload: postData,
  };
};
export const clearUpdate = () => {
  return {
    type: CLEAR,
  };
};

export const finalUpdate = (updatedpost) => {
  return {
    type: UPDATED,
    payload: updatedpost,
  };
};

export const updated = (updatedData) => {
  return (dispatch) => {
    axios
      .patch("http://localhost:8900/post/updated", updatedData)
      .then((response) => dispatch(finalUpdate(response.data)))
      .catch((error) => console.log(error));
  };
};
