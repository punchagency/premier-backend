const jwt = require('jsonwebtoken');

export const signJWT = (payload: any) => {
  const secret =  new TextEncoder().encode(process.env.JWT_SECRET)
  return jwt.sign(payload, secret, { expiresIn: '1h' });
};