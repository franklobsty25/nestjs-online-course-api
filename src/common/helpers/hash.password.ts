import * as bcrypt from 'bcrypt';
import { HASH_LENGTH_KEY } from '../constants/hash.constant';

export async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, HASH_LENGTH_KEY);
}

export async function hasVerifyPassword(
  password: string,
  hashed: string,
): Promise<boolean> {
  return await bcrypt.compare(password, hashed);
}
