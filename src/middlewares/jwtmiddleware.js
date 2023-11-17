// middleware for authentication of admin. so that no random user cant manipulate the inventory

import dotenv from 'dotenv';
dotenv.config();

// impoet jsonwebtoken for authenticating the admin
import jwt from 'jsonwebtoken';

// middleware function to check the user is admin or not
const jwtAuth = (req, res, next) => {
  // 1. Read the token.
  const token = req.headers['authorization'];

  
  // 2. if no token, return the error.
  if (!token) {
    return res.status(401).send('Unauthorized');
  }
  // 3. check if token is valid.
  try {
    const payload = jwt.verify(
      token,
      process.env.SECRET
    );
    req.userID = payload.userID;
  } catch (err) {
    // 4. return error.
    console.log(err);
    return res.status(401).send('Unauthorized');
  }
  // 5. call next middleware
  next();
};

// export the middleware function
export default jwtAuth;