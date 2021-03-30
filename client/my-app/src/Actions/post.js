import { CREATE } from "../Constants/post";
import axios from "axios";
const Createpost = (posts) => {
  return {
    type: CREATE,
    payload: posts,
  };
};

export const postApi = (form_data) => {
  return function (dispatch) {
    axios
      .post("https://instax-backend.herokuapp.com/post", form_data, {
        withCredentials: true,
      })
      .then((response) => {
        dispatch(Createpost(response.data));
      })
      .catch((error) => console.log(error));
  };
};
