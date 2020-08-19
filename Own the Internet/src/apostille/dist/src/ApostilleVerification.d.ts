import { NetworkType, Metadata } from 'symbol-sdk';
import { ApostilleVerificationResult } from './ApostilleVerificationResult';
export declare class ApostilleVerification {
    /**
     * Verify an Apostille
     * @param {string} filename - Name of the file in Apostille format (Ex: "MyProject - TBLJAVZXTDY3EXNVC5IMEYZN35OPHAQK5GOQXWPH - 2020-01-29.txt")
     * @param {string} data - File content (as Base64)
     * @param {Metadata[]} metadata - Dedicated account's metadata
     * @return {ApostilleVerificationResult}
     */
    static verify(filename: string, data: string, metadata: Metadata[]): ApostilleVerificationResult;
    /**
     * Verify an Apostille hash signature
     * @param {string} publicKey - Public key of owner
     * @param {string} data - File content (as Base64)
     * @param {string} hash - Apostille hash
     * @param {NetworkType} network - Network type
     * @return {boolean} - True if hash signature is valid, false otherwise
     */
    static verifyHash(publicKey: string, data: string, hash: string, network: NetworkType): boolean;
}
