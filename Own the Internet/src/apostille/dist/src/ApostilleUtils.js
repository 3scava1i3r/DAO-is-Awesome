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
class ApostilleUtils {
    /**
     * Create a short date as yyyy-mm-dd
     * @param {Date} date
     * @return {string} - Date as yyyy-mm-dd
     */
    static toShortDate(date) {
        let dd = date.getDate();
        let mm = date.getMonth() + 1;
        let yyyy = date.getFullYear();
        if (dd < 10)
            dd = '0' + dd;
        if (mm < 10)
            mm = '0' + mm;
        return yyyy + '-' + mm + '-' + dd;
    }
    /**
     * Get the extension of a file
     * @param {string} filename - Name of the file
     * @return {string} - File extension
     */
    static getExtension(filename) {
        return "." + filename.split('.').slice(1).pop() || "";
    }
    /**
     * Remove the extension of a file
     * @param {string} filename - Name of the file
     * @return {string} - File name without extension
     */
    static removeExtension(filename) {
        return filename.replace(/\.[^/.]+$/, "");
    }
    ;
    /**
     * Extract all signers required from an array of Apostilles
     * @param {Apostilles[]} apostilles - Apostille array
     * @return {Account[]} - An array of signers Accounts
     */
    static extractSigners(apostilles) {
        let signers = [];
        for (let i = 0; i < apostilles.length; i++) {
            if (!signers.find(signer => signer.publicKey === apostilles[i].account.publicKey)) {
                const account = symbol_sdk_1.Account.createFromPrivateKey(apostilles[i].account.privateKey, apostilles[i].network);
                signers.push(account);
            }
        }
        return signers;
    }
    /**
     * Extract all transactions from an array of Apostilles
     * @param {Apostilles[]} apostilles - Apostille array
     * @return {InnerTransaction[]} - An array of inner transactions
     */
    static extractTransactions(apostilles) {
        let txes = [];
        for (let i = 0; i < apostilles.length; i++) {
            txes = txes.concat(apostilles[i].transactions);
        }
        return txes;
    }
    /**
     * Return the MetadataEntry corresponding to a given key from an array of Metadata
     * @param {Metadata[]} metadata - Metadata array
     * @param {string} key - Metadata key
     * @return {MetadataEntry} - MetadataEntry or undefined
     */
    static findMetadataByKey(metadata, key) {
        const meta = metadata.find(meta => meta.metadataEntry.scopedMetadataKey.toHex().toLocaleLowerCase() === key);
        return meta ? meta.metadataEntry : undefined;
    }
    /**
     * Check if two metadata values are identical
     * @param {string} firstValue - A value
     * @param {string} secondValue - A value
     * @return {boolean} - True if identical, false otherwise
     */
    static isIdentical(firstValue, secondValue) {
        if (firstValue === secondValue)
            return true;
        return false;
    }
    /**
     * Extract dedicated account from file name in Apostille format
     * @param {string} filename - File name in Apostille format (Ex: "MyProject - TBLJAVZXTDY3EXNVC5IMEYZN35OPHAQK5GOQXWPH - 2020-01-29.txt")
     * @return {Address} - Dedicated account or undefined
     */
    static extractDedicatedFromName(filename) {
        const arr = filename.split(" ");
        try {
            const dedicated = symbol_sdk_1.Address.createFromRawAddress(arr[arr.length - 3]);
            return dedicated;
        }
        catch (e) {
            return undefined;
        }
    }
    /**
     * Retrieve original file name from file name in Apostille format
     * @param {string} filename - File name in Apostille format (Ex: "MyProject - TBLJAVZXTDY3EXNVC5IMEYZN35OPHAQK5GOQXWPH - 2020-01-29.txt")
     * @return {string} - Original file name with extension
     */
    static getOriginalFilename(filename) {
        const arr = filename.split(" ");
        const extension = ApostilleUtils.getExtension(filename);
        let original = "";
        for (let i = 0; i < arr.length - 4; i++) {
            if (i > 0)
                original += " ";
            original += arr[i];
        }
        return original + extension;
    }
}
exports.ApostilleUtils = ApostilleUtils;
//# sourceMappingURL=ApostilleUtils.js.map