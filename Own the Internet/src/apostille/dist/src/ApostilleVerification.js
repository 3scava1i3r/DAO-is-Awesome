"use strict";
/*
 * Copyright 2020 SPHAERA FINTECH SASU
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const symbol_sdk_1 = require("symbol-sdk");
const ApostilleMetadata_1 = require("./ApostilleMetadata");
const ApostilleUtils_1 = require("./ApostilleUtils");
const ApostilleVerificationResult_1 = require("./ApostilleVerificationResult");
const ApostilleHash_1 = require("./ApostilleHash");
class ApostilleVerification {
    /**
     * Verify an Apostille
     * @param {string} filename - Name of the file in Apostille format (Ex: "MyProject - TBLJAVZXTDY3EXNVC5IMEYZN35OPHAQK5GOQXWPH - 2020-01-29.txt")
     * @param {string} data - File content (as Base64)
     * @param {Metadata[]} metadata - Dedicated account's metadata
     * @return {ApostilleVerificationResult}
     */
    static verify(filename, data, metadata) {
        const m = ApostilleMetadata_1.ApostilleMetadata.create(metadata);
        const dedicated = ApostilleUtils_1.ApostilleUtils.extractDedicatedFromName(filename);
        if (!dedicated)
            return ApostilleVerificationResult_1.ApostilleVerificationResult.create(1, false);
        if (!m.name || !m.hash)
            return ApostilleVerificationResult_1.ApostilleVerificationResult.create(2, false);
        if (m.name.value !== ApostilleUtils_1.ApostilleUtils.getOriginalFilename(filename))
            return ApostilleVerificationResult_1.ApostilleVerificationResult.create(3, false, m);
        if (!ApostilleVerification.verifyHash(m.name.senderPublicKey, data, m.hash.value, dedicated.networkType))
            return ApostilleVerificationResult_1.ApostilleVerificationResult.create(4, false, m);
        return ApostilleVerificationResult_1.ApostilleVerificationResult.create(5, true, m);
    }
    /**
     * Verify an Apostille hash signature
     * @param {string} publicKey - Public key of owner
     * @param {string} data - File content (as Base64)
     * @param {string} hash - Apostille hash
     * @param {NetworkType} network - Network type
     * @return {boolean} - True if hash signature is valid, false otherwise
     */
    static verifyHash(publicKey, data, hash, network) {
        const owner = symbol_sdk_1.PublicAccount.createFromPublicKey(publicKey, network);
        const sha256 = ApostilleHash_1.ApostilleHash.hash(data);
        return owner.verifySignature(sha256, hash.substring(10));
    }
    ;
}
exports.ApostilleVerification = ApostilleVerification;
//# sourceMappingURL=ApostilleVerification.js.map