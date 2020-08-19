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
const CryptoJS = require("crypto-js");
const symbol_sdk_1 = require("symbol-sdk");
class ApostilleAccount {
    /**
     * Generate an Apostille account for a file.
     * Will always generate the same account for a given file name and owner private key
     * @param {string} privateKey - Private key of owner
     * @param {string} filename - File name (with extension)
     * @param {NetworkType} network - Network type
     * @return {Account} - Apostille Account
     */
    static create(privateKey, filename, network) {
        const owner = symbol_sdk_1.Account.createFromPrivateKey(privateKey, network);
        const hash256 = CryptoJS.SHA256(filename).toString(CryptoJS.enc.Hex);
        const signedFilename = owner.signData(hash256);
        const dedicatedAccountPrivateKey = signedFilename.substring(0, 64);
        return symbol_sdk_1.Account.createFromPrivateKey(dedicatedAccountPrivateKey, network);
    }
}
exports.ApostilleAccount = ApostilleAccount;
//# sourceMappingURL=ApostilleAccount.js.map