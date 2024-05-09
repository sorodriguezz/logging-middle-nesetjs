import { decode } from 'jsonwebtoken';

export function decodeJwt(token: string): any | null {
  try {
    const decoded = decode(token);
    console.log(decoded);
    return decoded;
  } catch (error) {
    console.error('Error decodificando el token:', error);
    return null;
  }
}
