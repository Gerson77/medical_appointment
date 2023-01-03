
export interface IPasswordCrypto {
    hash(passowrd: string): Promise<string>
}