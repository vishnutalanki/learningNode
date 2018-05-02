//represents a single "block" in the "blockchain"
//consists of index, data and previous Hash; as well as a timestamp

var sha1 = require('sha1');

class Block{
	constructor(index,data,prevHash){
		this.index=index;
				this.timestamp = Math.floor(Date.now()/1000);
		this.data=data;
		this.prevHash=prevHash;
	}
	
	getHash(){
		return sha1(JSON.stringify(this.data)+this.prevHash+this.index+this.timestamp);
	}
}

class BlockChain{
	constructor(){
		this.chain = [];
	}
	
	addBlock(data){
	let index = this.chain.length;
	let prevHash = this.chain.length !== 0 ? this.chain[this.chain.length - 1].hash : 0;
	let block = new Block(index, data, prevHash);

	this.chain.push(block);
	}
	
	chainIsValid(){

		for(var i=0;i<this.chain.length;i++){

			if(this.chain[i].hash !== this.chain[i].getHash()) 
				return false;

			if(i > 0 && this.chain[i].prevHash !== this.chain[i-1].hash)
				return false;
		}

	return true;
	}
}

//Create a new blockchain called eRupee
//eRupee - "The crypto currency for India"
const eRupee = new BlockChain();

//Adding data to the blockchain!
eRupee.addBlock({sender: "Modi", reciver: "Rahul", amount: 100});
eRupee.addBlock({sender: "Rahul", reciver: "Sonia", amount: 50});
eRupee.addBlock({sender: "Sonia", reciver: "Tharoor", amount: 75});

console.log(JSON.stringify(eRupee, null, 4));



