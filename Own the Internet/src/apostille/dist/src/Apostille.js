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
const ApostilleAccount_1 = require("./ApostilleAccount");
const ApostilleHash_1 = require("./ApostilleHash");
const ApostilleHistory_1 = require("./ApostilleHistory");
const ApostilleMetadata_1 = require("./ApostilleMetadata");
const ApostilleTransactions_1 = require("./ApostilleTransactions");
const ApostilleUtils_1 = require("./ApostilleUtils");
const symbol_sdk_1 = require("symbol-sdk");
class Apostille {
    constructor(account, history, owner, filename, fileContent, hash, tags, description, url, transactions, network) {
        this.account = account;
        this.history = history;
        this.owner = owner;
        this.filename = filename;
        this.fileContent = fileContent;
        this.hash = hash;
        this.tags = tags;
        this.description = description;
        this.url = url;
        this.transactions = transactions;
        this.network = network;
        this.transactions = ApostilleTransactions_1.ApostilleTransactions.create(this);
    }
    /**
     * Create an Apostille
     * @param {string} filename - Name of the file (with extension)
     * @param {string} fileContent - Content of the file (as Base64)
     * @param {string} tags - Tags for the file
     * @param {string} description - Description for the file
     * @param {string} url - Url for the file
     * @param {string} privateKey - Private key of owner
     * @param {NetworkType} network - Network type
     * @return {Apostille} - An Apostille
     */
    static create(filename, fileContent, tags, description, url, privateKey, network) {
        const owner = symbol_sdk_1.Account.createFromPrivateKey(privateKey, network);
        const dedicated = ApostilleAccount_1.ApostilleAccount.create(privateKey, filename, network);
        const apostilleHash = ApostilleHash_1.ApostilleHash.create(fileContent, privateKey, network);
        const history = ApostilleHistory_1.ApostilleHistory.create(privateKey, network);
        return new Apostille(dedicated, history, owner.publicAccount, filename, fileContent, apostilleHash, tags, description, url, [], network);
    }
    /**
     * Update an Apostille
     * @param {Metadata[]} metadata - Dedicated account's metadata
     * @return {boolean} - True if success, false otherwise
     */
    update(metadata) {
        const m = ApostilleMetadata_1.ApostilleMetadata.create(metadata);
        if (m.name) {
            const core = ApostilleTransactions_1.ApostilleTransactions.core(this);
            this.transactions = [core];
            this._update(m.hash, this.hash.full);
            this._update(m.tags, this.tags);
            this._update(m.description, this.description);
            this._update(m.url, this.url);
            return true;
        }
        return false;
    }
    /**
     * @private
     * Update Apostille transactions
     */
    _update(metadata, newVal) {
        const currentVal = metadata ? metadata.value : "";
        if (newVal && !ApostilleUtils_1.ApostilleUtils.isIdentical(currentVal, newVal)) {
            const tx = ApostilleTransactions_1.ApostilleTransactions.metadata(this, metadata.scopedMetadataKey.toHex(), metadata.value, newVal);
            this.transactions.push(tx);
        }
    }
}
exports.Apostille = Apostille;
//# sourceMappingURL=Apostille.js.map