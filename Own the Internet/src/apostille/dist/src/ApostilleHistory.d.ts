import { Account, NetworkType, PublicAccount, InnerTransaction } from 'symbol-sdk';
export declare class ApostilleHistory {
    /**
     * Create an history account used for indexing Apostilles
     * @param {string} privateKey - Private key of owner
     * @param {NetworkType} network - Network type
     * @return {Account} - History Account
     */
    static create(privateKey: string, network: NetworkType): Account;
    /**
     * Create a metadata transaction for recording history account address in owner's account metadata
     * @param {PublicAccount} owner - PublicAccount of owner
     * @param {PublicAccount} history - PublicAccount of history
     * @param {NetworkType} network - Network type
     * @return {InnerTransaction}
     */
    static metadataTransaction(owner: PublicAccount, history: PublicAccount, network: NetworkType): InnerTransaction;
}
