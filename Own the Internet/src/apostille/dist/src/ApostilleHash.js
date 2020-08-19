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
const ApostilleConstants = require("./ApostilleConstants");
const CryptoJS = require("crypto-js");
const symbol_sdk_1 = require("symbol-sdk");
class ApostilleHash {
    constructor(header, data, full) {
        this.header = header;
        this.data = data;
        this.full = full;
    }
    /**
     * Hash the file content and sign it
     * @param {string} data - File content (as Base64)
     * @param {string} privateKey - Private key of owner
     * @param {NetworkType} network - Network type
     * @return {ApostilleHash}
     */
    static create(data, privateKey, network) {
        const owner = symbol_sdk_1.Account.createFromPrivateKey(privateKey, network);
        const hash = owner.signData(ApostilleHash.hash(data));
        return new ApostilleHash(ApostilleConstants.header, hash, ApostilleConstants.header + hash);
    }
    /**
     * Hash the file content with SHA256
     * @param {string} data - File content (Base64)
     * @return {string} - SHA256 hash of the file content
     */
    static hash(data) {
        const rawContent = CryptoJS.enc.Base64.parse(data);
        return CryptoJS.SHA256(rawContent).toString(CryptoJS.enc.Hex);
    }
}
exports.ApostilleHash = ApostilleHash;
//# sourceMappingURL=ApostilleHash.js.map