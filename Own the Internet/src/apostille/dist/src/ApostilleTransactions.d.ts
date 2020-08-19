import { Apostille } from './Apostille';
import { InnerTransaction } from 'symbol-sdk';
export declare class ApostilleTransactions {
    /**
     * Create base transactions for the Apostille
     * @param {Apostille} apostille - An Apostille
     * @return {InnerTransaction[]}
     */
    static create(apostille: Apostille): InnerTransaction[];
    /**
     * Create an AccountMetadataTransaction
     * @param {Apostille} apostille - An Apostille
     * @param {string} metadataKey - Metadata hex key
     * @param {string} oldVal - Old metadata value
     * @param {string} newVal - New metadata value
     * @return {InnerTransaction}
     */
    static metadata(apostille: Apostille, metadataKey: string, oldVal: string, newVal: string): InnerTransaction;
    /**
     * Assign ownership of a dedicated account
     * @param {Apostille} apostille - An Apostille
     * @return {InnerTransaction}
     */
    static ownership(apostille: Apostille): InnerTransaction;
    /**
     * Create a core transfer transaction
     * @param {Apostille} apostille - An Apostille
     * @return {InnerTransaction}
     */
    static core(apostille: Apostille): InnerTransaction;
    /**
     * Create an history transfer transaction
     * @param {Apostille} apostille - An Apostille
     * @return {InnerTransaction}
     */
    static history(apostille: Apostille): InnerTransaction;
}
