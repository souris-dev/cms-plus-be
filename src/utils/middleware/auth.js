import { verifyToken } from '../authUtil.js';

/**
 * Checks the JWT token in Authorization header.
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 * @param {import('express').NextFunction} next 
 */
export const checkToken = async (req, res, next) => {
  if (req.headers.authorization === undefined || req.headers.authorization === null) {
    res.status(401);
    res.json({ error: 'Protected route. Needs JWT token for authorization in the Authorization header (as Bearer token).' });
    return;
  }

  const jwtToken = req.headers.authorization.split(' ')[1];
  
  try {
    const jwtData = await verifyToken(jwtToken);

    if (jwtData.username) {
      Object.defineProperty(res, 'username', {
        value: jwtData.username,
        writable: false
      });
    }
    else {
      Object.defineProperty(res, 'jwtData', {
        value: jwtData,
        writable: false
      });
    }
  } catch (err) {
    res.status(err.code || 401);
    res.json({ error: err.message || 'Failed to authorize.' });
    return;
  }

  next();
};
