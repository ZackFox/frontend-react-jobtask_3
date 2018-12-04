import jwt from "jsonwebtoken";

const isExpiredToken = token => {
  const { exp } = jwt.decode(token);
  var dateNow = parseInt(Date.now() / 1000, 10);
  return exp > dateNow ? false : true;
};

export default isExpiredToken;
