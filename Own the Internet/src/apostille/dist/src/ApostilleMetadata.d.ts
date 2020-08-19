import { Metadata, MetadataEntry } from 'symbol-sdk';
export declare class ApostilleMetadata {
    readonly name: MetadataEntry;
    readonly hash: MetadataEntry;
    readonly tags: MetadataEntry;
    readonly description: MetadataEntry;
    readonly url: MetadataEntry;
    constructor(name: MetadataEntry, hash: MetadataEntry, tags: MetadataEntry, description: MetadataEntry, url: MetadataEntry);
    /**
     * Isolate Apostille related metadata from dedicated account's metadata
     * @param {Metadata[]} metadata - Dedicated account's metadata
     * @return {ApostilleMetadata} - Apostille metadata
     */
    static create(metadata: Metadata[]): ApostilleMetadata;
}
