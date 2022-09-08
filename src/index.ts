import { Blockchain } from './blockchain';

const bc = new Blockchain();
bc.addBlock('invisible touch');
bc.addBlock('abbacab');
bc.print();
console.log(`is chain valid: ${Blockchain.isValidChain(bc)}`);