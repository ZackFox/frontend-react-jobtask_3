import jwt from "jsonwebtoken";

const getDecodedUser = (authToken, accessToken) => {
  const { id } = jwt.decode(accessToken);
  const { name, given_name, email, picture } = jwt.decode(authToken);
  return { id, name, given_name, email, picture };
};

export default getDecodedUser;
