import { Apostille } from "./Apostille";
import { Account, InnerTransaction, Metadata, MetadataEntry, Address } from "symbol-sdk";
export declare class ApostilleUtils {
    /**
     * Create a short date as yyyy-mm-dd
     * @param {Date} date
     * @return {string} - Date as yyyy-mm-dd
     */
    static toShortDate(date: Date): string;
    /**
     * Get the extension of a file
     * @param {string} filename - Name of the file
     * @return {string} - File extension
     */
    static getExtension(filename: string): string;
    /**
     * Remove the extension of a file
     * @param {string} filename - Name of the file
     * @return {string} - File name without extension
     */
    static removeExtension(filename: string): string;
    /**
     * Extract all signers required from an array of Apostilles
     * @param {Apostilles[]} apostilles - Apostille array
     * @return {Account[]} - An array of signers Accounts
     */
    static extractSigners(apostilles: Apostille[]): Account[];
    /**
     * Extract all transactions from an array of Apostilles
     * @param {Apostilles[]} apostilles - Apostille array
     * @return {InnerTransaction[]} - An array of inner transactions
     */
    static extractTransactions(apostilles: Apostille[]): InnerTransaction[];
    /**
     * Return the MetadataEntry corresponding to a given key from an array of Metadata
     * @param {Metadata[]} metadata - Metadata array
     * @param {string} key - Metadata key
     * @return {MetadataEntry} - MetadataEntry or undefined
     */
    static findMetadataByKey(metadata: Metadata[], key: string): MetadataEntry;
    /**
     * Check if two metadata values are identical
     * @param {string} firstValue - A value
     * @param {string} secondValue - A value
     * @return {boolean} - True if identical, false otherwise
     */
    static isIdentical(firstValue: string, secondValue: string): boolean;
    /**
     * Extract dedicated account from file name in Apostille format
     * @param {string} filename - File name in Apostille format (Ex: "MyProject - TBLJAVZXTDY3EXNVC5IMEYZN35OPHAQK5GOQXWPH - 2020-01-29.txt")
     * @return {Address} - Dedicated account or undefined
     */
    static extractDedicatedFromName(filename: string): Address;
    /**
     * Retrieve original file name from file name in Apostille format
     * @param {string} filename - File name in Apostille format (Ex: "MyProject - TBLJAVZXTDY3EXNVC5IMEYZN35OPHAQK5GOQXWPH - 2020-01-29.txt")
     * @return {string} - Original file name with extension
     */
    static getOriginalFilename(filename: string): string;
}
