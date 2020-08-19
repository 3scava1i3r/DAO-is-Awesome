import { NetworkType } from 'symbol-sdk';
export declare class ApostilleHash {
    readonly header: string;
    readonly data: string;
    readonly full: string;
    constructor(header: string, data: string, full: string);
    /**
     * Hash the file content and sign it
     * @param {string} data - File content (as Base64)
     * @param {string} privateKey - Private key of owner
     * @param {NetworkType} network - Network type
     * @return {ApostilleHash}
     */
    static create(data: string, privateKey: string, network: NetworkType): ApostilleHash;
    /**
     * Hash the file content with SHA256
     * @param {string} data - File content (Base64)
     * @return {string} - SHA256 hash of the file content
     */
    static hash(data: string): string;
}
