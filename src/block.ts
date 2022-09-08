import { SHA256 } from "crypto-js";

const BLOCK_DIFFICULTY_PREFIX = "00";

export class Block {
  private timestamp: string;
  private prevHash: string;
  private hash: string;
  private data: string;
  private nonce: number | undefined;
  private validator: string | undefined;
  private signature: string | undefined;

  constructor(
    timestamp: string,
    prevHash: string,
    hash: string,
    data: string,
    nonce?: number,
    validator?: string,
    signature?: string
  ) {
    this.timestamp = timestamp;
    this.prevHash = prevHash;
    this.hash = hash;
    this.data = data;
    this.nonce = nonce;
    this.validator = validator;
    this.signature = signature;
  }

  static genesis() {
    let h = Block.hash(`genesis timestamp`, "", "");
    return new this(`genesis timestamp`, "", h.hash, "");
  }

  // TODO: Once Proof of Stake is activated, uncomment this
  // static hash(timestamp: string, prevHash: string, data: string) {
  //   return SHA256(`${timestamp}${prevHash}${data}`).toString();
  // }

  static hash(timestamp: string, prevHash: string, data: string, blockNonce?: number) {
    let nonce = blockNonce || 0;
    let hash = "";
    while (nonce < Number.MAX_VALUE) {
      hash = SHA256(`${timestamp}${prevHash}${data}${nonce}`).toString();
      if (hash.startsWith(BLOCK_DIFFICULTY_PREFIX)) {
        return {hash, nonce};
      }
      nonce += 1;
    }
    // TODO: This should never happen, but handle this error case
    return {hash: "", nonce: 0};
  }

  static blockHash(block: Block) {
    const { timestamp, prevHash, data, nonce} = block;
    const {hash} = Block.hash(timestamp, prevHash, data, nonce);
    return hash;
  }

  static createBlock(lastBlock: Block, data: string) {
    let timestamp = Date.now().toString();
    const lastHash = lastBlock.hash;
    const {hash, nonce} = Block.hash(timestamp, lastHash, data);

    return new this(timestamp, lastHash, hash, data, nonce);
  }

  getHash() {
    return this.hash;
  }
  
  getNonce() {
    return this.nonce;
  }

  toString() {
    return `Block - 
        Timestamp : ${this.timestamp}
        Prev Hash : ${this.prevHash}
        Hash      : ${this.hash}
        Data      : ${this.data}
        Nonce     : ${this.nonce}
        Validator : ${this.validator}
        Signature : ${this.signature}`;
  }
}
