import { IPasswordCrypto } from "./password.crypto";
import bcrypt from 'bcryptjs'


export class PasswordBcrypt implements IPasswordCrypto {
    hash(passowrd: string): Promise<string> {
        return bcrypt.hash(passowrd, 10)
    }
    
    async compare(passowrd: string, passwordHash: string): Promise<boolean> {
        return await bcrypt.compare(passowrd, passwordHash);
    }
}