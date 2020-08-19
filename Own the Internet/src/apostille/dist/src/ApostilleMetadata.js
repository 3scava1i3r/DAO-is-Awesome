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
const ApostilleUtils_1 = require("./ApostilleUtils");
class ApostilleMetadata {
    constructor(name, hash, tags, description, url) {
        this.name = name;
        this.hash = hash;
        this.tags = tags;
        this.description = description;
        this.url = url;
    }
    /**
     * Isolate Apostille related metadata from dedicated account's metadata
     * @param {Metadata[]} metadata - Dedicated account's metadata
     * @return {ApostilleMetadata} - Apostille metadata
     */
    static create(metadata) {
        const name = ApostilleUtils_1.ApostilleUtils.findMetadataByKey(metadata, ApostilleConstants_1.metadataKey.name);
        const hash = ApostilleUtils_1.ApostilleUtils.findMetadataByKey(metadata, ApostilleConstants_1.metadataKey.hash);
        const tags = ApostilleUtils_1.ApostilleUtils.findMetadataByKey(metadata, ApostilleConstants_1.metadataKey.tags);
        const description = ApostilleUtils_1.ApostilleUtils.findMetadataByKey(metadata, ApostilleConstants_1.metadataKey.description);
        const url = ApostilleUtils_1.ApostilleUtils.findMetadataByKey(metadata, ApostilleConstants_1.metadataKey.url);
        return new ApostilleMetadata(name, hash, tags, description, url);
    }
}
exports.ApostilleMetadata = ApostilleMetadata;
//# sourceMappingURL=ApostilleMetadata.js.map