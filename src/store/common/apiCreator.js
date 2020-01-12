import { actionCreator } from "../common";
import axios from "axios";
const serverURL = "http://demo.ciitlhr.hosting.acm.org/public/api";

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
    console.log(optionsCretor(props));
    axios(optionsCretor(props))
      .then(response => {
        console.log("apiCreator response", response);
        const { success, data } = response;
        if (type) {
          dispatch(actionCreator(type, { result: data, state: state }));
        }
        resolve(data);
      })
      .catch(error => {
        reject(error);
      });
  });
};
