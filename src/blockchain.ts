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

  print() {
    for (const block of this.chain) {
        console.log(`${block.toString()}`)
    }
  }
}
