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
const ApostilleConstants_1 = require("./ApostilleConstants");
const CryptoJS = require("crypto-js");
const symbol_sdk_1 = require("symbol-sdk");
class ApostilleHistory {
    /**
     * Create an history account used for indexing Apostilles
     * @param {string} privateKey - Private key of owner
     * @param {NetworkType} network - Network type
     * @return {Account} - History Account
     */
    static create(privateKey, network) {
        const owner = symbol_sdk_1.Account.createFromPrivateKey(privateKey, network);
        const seed = "Apostille-history-of-" + owner.address.plain();
        const hash256 = CryptoJS.SHA256(seed).toString(CryptoJS.enc.Hex);
        const signedFilename = owner.signData(hash256);
        const historyAccountPrivateKey = signedFilename.substring(0, 64);
        return symbol_sdk_1.Account.createFromPrivateKey(historyAccountPrivateKey, network);
    }
    /**
     * Create a metadata transaction for recording history account address in owner's account metadata
     * @param {PublicAccount} owner - PublicAccount of owner
     * @param {PublicAccount} history - PublicAccount of history
     * @param {NetworkType} network - Network type
     * @return {InnerTransaction}
     */
    static metadataTransaction(owner, history, network) {
        const currentValueBytes = symbol_sdk_1.Convert.utf8ToUint8("");
        const newValueBytes = symbol_sdk_1.Convert.utf8ToUint8(history.address.plain());
        return symbol_sdk_1.AccountMetadataTransaction.create(symbol_sdk_1.Deadline.create(), owner.publicKey, symbol_sdk_1.UInt64.fromHex(ApostilleConstants_1.metadataKey.history), newValueBytes.length - currentValueBytes.length, symbol_sdk_1.Convert.decodeHex(symbol_sdk_1.Convert.xor(currentValueBytes, newValueBytes)), network).toAggregate(owner);
    }
}
exports.ApostilleHistory = ApostilleHistory;
//# sourceMappingURL=ApostilleHistory.js.map