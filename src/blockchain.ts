import { Block } from "./block";

export class Blockchain {
  private chain: Block[];

  constructor() {
    this.chain = [Block.genesis()];
  }

  addBlock(data: string) {
    const block = Block.createBlock(this.chain[this.chain.length - 1], data);
    this.chain.push(block);

    return block;
  }

  static isValidChain(chain: Blockchain) {
    const c = chain.getChain();
    for (let i = 0; i < c.length; i++) {
      let ithBlock = c[i];
      if (ithBlock.getHash() !== Block.blockHash(ithBlock)) {
        return false;
      }
    }
    return true;
  }

  getChain() {
    return this.chain;
  }

  print() {
    for (const block of this.chain) {
        console.log(`${block.toString()}`)
    }
  }
}
