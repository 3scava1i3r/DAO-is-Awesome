import { Account, NetworkType } from 'symbol-sdk';
export declare class ApostilleAccount {
    /**
     * Generate an Apostille account for a file.
     * Will always generate the same account for a given file name and owner private key
     * @param {string} privateKey - Private key of owner
     * @param {string} filename - File name (with extension)
     * @param {NetworkType} network - Network type
     * @return {Account} - Apostille Account
     */
    static create(privateKey: string, filename: string, network: NetworkType): Account;
}
