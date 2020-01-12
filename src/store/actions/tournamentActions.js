import { actionTypes, apiCreator, actionCreator } from "../common";

export const getTournaments = () => dispatch => {
  return apiCreator(
    { method: "GET", endPoint: "/tournament" },
    actionTypes.GET_TOURNAMENTS,
    dispatch
  );
};

export const getTournamentMatches = body => dispatch => {
  return apiCreator(
    { method: "POST", endPoint: "/matchsSchedule", body: body },
    null,
    dispatch
  );
};
// export const signup = body => dispatch => {
//   return apiCreator(
//     { method: "POST", endPoint: "/vendor/register", body: body },
//     actionTypes.SIGNUP,
//     dispatch
//   );
// };

// export const setWareHouseAddress = (userId, body) => dispatch => {
//   return apiCreator(
//     { method: "POST", endPoint: `/vendor/update/${userId}`, body: body },
//     actionTypes.SET_WAREHOUSE_ADDRESS,
//     dispatch
//   );
// };

// export const forgotPassword = body => dispatch => {
//   return apiCreator(
//     { method: "POST", endPoint: "/vendor/verify", body: body },
//     null,
//     dispatch
//   );
// };

// export const sendCode = data => dispatch => {
//   return apiCreator(
//     {
//       method: "POST",
//       endPoint: `/vendor/sendCode/${data._id}`,
//       body: { email: data.email }
//     },
//     null,
//     dispatch
//   );
// };

// export const verifyCode = data => dispatch => {
//   return apiCreator(
//     {
//       method: "POST",
//       endPoint: `/vendor/verifycode/${data._id}`,
//       body: data.body
//     },
//     null,
//     dispatch
//   );
// };

// export const resetPassword = data => dispatch => {
//   return apiCreator(
//     {
//       method: "POST",
//       endPoint: `/vendor/passwordReset/${data._id}`,
//       body: data.body
//     },
//     null,
//     dispatch
//   );
// };

// export const logout = () => dispatch => {
//   dispatch(actionCreator(actionTypes.LOGOUT, null));
// };
