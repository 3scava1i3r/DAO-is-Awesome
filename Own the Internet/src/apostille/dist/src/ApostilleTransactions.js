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
const symbol_sdk_1 = require("symbol-sdk");
class ApostilleTransactions {
    /**
     * Create base transactions for the Apostille
     * @param {Apostille} apostille - An Apostille
     * @return {InnerTransaction[]}
     */
    static create(apostille) {
        const core = ApostilleTransactions.core(apostille);
        const name = ApostilleTransactions.metadata(apostille, ApostilleConstants.metadataKey.name, "", apostille.filename);
        const hash = ApostilleTransactions.metadata(apostille, ApostilleConstants.metadataKey.hash, "", apostille.hash.full);
        const history = ApostilleTransactions.history(apostille);
        let txes = [core, name, hash, history];
        if (apostille.tags.length)
            txes.push(ApostilleTransactions.metadata(apostille, ApostilleConstants.metadataKey.tags, "", apostille.tags));
        if (apostille.description.length)
            txes.push(ApostilleTransactions.metadata(apostille, ApostilleConstants.metadataKey.description, "", apostille.description));
        if (apostille.url.length)
            txes.push(ApostilleTransactions.metadata(apostille, ApostilleConstants.metadataKey.tags, "", apostille.tags));
        return txes;
    }
    /**
     * Create an AccountMetadataTransaction
     * @param {Apostille} apostille - An Apostille
     * @param {string} metadataKey - Metadata hex key
     * @param {string} oldVal - Old metadata value
     * @param {string} newVal - New metadata value
     * @return {InnerTransaction}
     */
    static metadata(apostille, metadataKey, oldVal, newVal) {
        const currentValueBytes = symbol_sdk_1.Convert.utf8ToUint8(oldVal);
        const newValueBytes = symbol_sdk_1.Convert.utf8ToUint8(newVal);
        return symbol_sdk_1.AccountMetadataTransaction.create(symbol_sdk_1.Deadline.create(), apostille.account.publicKey, symbol_sdk_1.UInt64.fromHex(metadataKey), newValueBytes.length - currentValueBytes.length, symbol_sdk_1.Convert.decodeHex(symbol_sdk_1.Convert.xor(currentValueBytes, newValueBytes)), apostille.network).toAggregate(apostille.owner);
    }
    /**
     * Assign ownership of a dedicated account
     * @param {Apostille} apostille - An Apostille
     * @return {InnerTransaction}
     */
    static ownership(apostille) {
        return symbol_sdk_1.MultisigAccountModificationTransaction.create(symbol_sdk_1.Deadline.create(), 1, 1, [apostille.owner], [], apostille.network).toAggregate(apostille.account.publicAccount);
    }
    /**
     * Create a core transfer transaction
     * @param {Apostille} apostille - An Apostille
     * @return {InnerTransaction}
     */
    static core(apostille) {
        return symbol_sdk_1.TransferTransaction.create(symbol_sdk_1.Deadline.create(), apostille.account.address, [ApostilleConstants.publicNetwork ? symbol_sdk_1.NetworkCurrencyPublic.createRelative(10) : symbol_sdk_1.NetworkCurrencyLocal.createRelative(10)], symbol_sdk_1.PlainMessage.create(apostille.hash.full), apostille.network).toAggregate(apostille.owner);
    }
    /**
     * Create an history transfer transaction
     * @param {Apostille} apostille - An Apostille
     * @return {InnerTransaction}
     */
    static history(apostille) {
        return symbol_sdk_1.TransferTransaction.create(symbol_sdk_1.Deadline.create(), apostille.history.address, [ApostilleConstants.publicNetwork ? symbol_sdk_1.NetworkCurrencyPublic.createRelative(10) : symbol_sdk_1.NetworkCurrencyLocal.createRelative(10)], symbol_sdk_1.PlainMessage.create(JSON.stringify({ "filename": apostille.filename, "account": apostille.account.address.plain() })), apostille.network).toAggregate(apostille.owner);
    }
}
exports.ApostilleTransactions = ApostilleTransactions;
//# sourceMappingURL=ApostilleTransactions.js.map