
import { actionCreator } from "../common";
import axios from "axios";
const serverURL = "https://matjars-server.herokuapp.com";

const optionsCretor = props => {
  return {
    method: props.method,
    url: `${serverURL}${props.endPoint}`,
    data: props.body || {}
    // params: { foo: 'bar' },
    // headers: {}
  };
};

export const apiCreator = async (props, type, dispatch, state) => {
  return new Promise((resolve, reject) => {
    axios(optionsCretor(props))
      .then(response => {
        const { result } = response.data;
        if (type) {
          dispatch(actionCreator(type, { result: result, state: state }));
        }
        resolve(result);
      })
      .catch(error => reject(error));
  });
};