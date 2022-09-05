import { SHA256 } from "crypto-js";

export class Block {
  private timestamp: string;
  private prevHash: string;
  private hash: string;
  private data: string;
  private validator: string | undefined;
  private signature: string | undefined;

  constructor(
    timestamp: string,
    prevHash: string,
    hash: string,
    data: string,
    validator?: string,
    signature?: string
  ) {
    this.timestamp = timestamp;
    this.prevHash = prevHash;
    this.hash = hash;
    this.data = data;
    this.validator = validator;
    this.signature = signature;
  }

  static genesis() {
    return new this(`genesis timestamp`, "", Block.hash(`genesis timestamp`, "", ""), "");
  }

  static hash(timestamp: string, prevHash: string, data: string) {
    return SHA256(`${timestamp}${prevHash}${data}`).toString();
  }

  static createBlock(lastBlock: Block, data: string) {
    let hash;
    let timestamp = Date.now().toString();
    const lastHash = lastBlock.hash;
    hash = Block.hash(timestamp, lastHash, data);

    return new this(timestamp, lastHash, hash, data);
  }

  toString() {
    return `Block - 
        Timestamp : ${this.timestamp}
        Prev Hash : ${this.prevHash}
        Hash      : ${this.hash}
        Data      : ${this.data}
        Validator : ${this.validator}
        Signature : ${this.signature}`;
  }
}
