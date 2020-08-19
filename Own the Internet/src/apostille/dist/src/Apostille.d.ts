import { ApostilleHash } from './ApostilleHash';
import { Account, InnerTransaction, Metadata, NetworkType, PublicAccount } from 'symbol-sdk';
export declare class Apostille {
    readonly account: Account;
    readonly history: Account;
    readonly owner: PublicAccount;
    readonly filename: string;
    readonly fileContent: string;
    readonly hash: ApostilleHash;
    readonly tags: string;
    readonly description: string;
    readonly url: string;
    transactions: InnerTransaction[];
    readonly network: NetworkType;
    constructor(account: Account, history: Account, owner: PublicAccount, filename: string, fileContent: string, hash: ApostilleHash, tags: string, description: string, url: string, transactions: InnerTransaction[], network: NetworkType);
    /**
     * Create an Apostille
     * @param {string} filename - Name of the file (with extension)
     * @param {string} fileContent - Content of the file (as Base64)
     * @param {string} tags - Tags for the file
     * @param {string} description - Description for the file
     * @param {string} url - Url for the file
     * @param {string} privateKey - Private key of owner
     * @param {NetworkType} network - Network type
     * @return {Apostille} - An Apostille
     */
    static create(filename: string, fileContent: string, tags: string, description: string, url: string, privateKey: string, network: NetworkType): Apostille;
    /**
     * Update an Apostille
     * @param {Metadata[]} metadata - Dedicated account's metadata
     * @return {boolean} - True if success, false otherwise
     */
    update(metadata: Metadata[]): boolean;
    /**
     * @private
     * Update Apostille transactions
     */
    private _update;
}
