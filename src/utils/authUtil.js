import { ServerError } from './errors.js';

const AUTH_SERVICE_PROTOCOL = process.env.AUTH_SERVICE_PROTOCOL;
const AUTH_SERVICE_HOST = process.env.AUTH_SERVICE_HOST;
const AUTH_SERVICE_PORT = process.env.AUTH_SERVICE_PORT;
const AUTH_SERVICE_URL 
  = `${AUTH_SERVICE_PROTOCOL || 'http'}://${AUTH_SERVICE_HOST || 'localhost'}:${AUTH_SERVICE_PORT || '8002'}`;

const VALIDATE_ROUTE = '/token/validate';

/**
 * Verifies a token using a fetch call to the auth service.
 * @param {string} token 
 * @returns contents of the JWT token.
 */
export const verifyToken = async (token) => {
  const jwtData = await fetch(AUTH_SERVICE_URL + VALIDATE_ROUTE, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`
    },
    body: {}
  }).then((response) => {
    if (response.status != 200) {
      throw new ServerError('Token authentication failed.', 401);
    }
    
    return response.json();
  });

  return jwtData;
};