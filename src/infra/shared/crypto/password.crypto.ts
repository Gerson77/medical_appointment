
export interface IPasswordCrypto {
    hash(passowrd: string): Promise<string>
    compare(passowrd: string, passwordHash: string): Promise<boolean>
}