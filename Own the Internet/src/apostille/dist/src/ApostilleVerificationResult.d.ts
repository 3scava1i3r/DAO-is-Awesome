import { ApostilleMetadata } from './ApostilleMetadata';
export declare class ApostilleVerificationResult {
    readonly code: number;
    readonly result: boolean;
    readonly message: string;
    readonly metadata: ApostilleMetadata;
    constructor(code: number, result: boolean, message: string, metadata: ApostilleMetadata);
    /**
     * Create an object containing the Apostille verification result
     * @param {number} code - Result code
     * @param {boolean} result - Verification result
     * @param {ApostilleMetadata} metadata - Apostille metadata (optional)
     * @return {ApostilleVerificationResult}
     */
    static create(code: number, result: boolean, metadata?: ApostilleMetadata): ApostilleVerificationResult;
}
