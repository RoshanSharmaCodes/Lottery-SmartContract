const ganache = require("ganache-cli");
const Web3 = require("Web3");
const web3 = new Web3(ganache.provider());
const assert = require("assert");
const { interface, bytecode } = require("../Compile.js");

let accounts;
beforeEach(async () => {
  accounts = await web3.eth.getAccounts();
  lottery = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode })
    .send({
      from: accounts[0],
      gas: "1000000",
      gasPrice: web3.utils.toWei("2", "gwei"),
    });
});

describe("Lottery",()=>{
    it("Deploying a contract",()=>{
        assert.ok(lottery.options.address)
    })

    it("Checking User Can Enter",async ()=>{
        await lottery.methods.enterEvent().send({from:accounts[0], value:web3.utils.toWei("0.21","ether")});
        const players = await lottery.methods.getPlayers().call({from: accounts[0]});
        assert.equal(players[0],accounts[0]);
    })

    it("Only Manager Can Pick Winner",async()=>{
        try{
            await lottery.methods.pickWinner().call({from: accounts[1]})
            assert(false)
        }catch(err){
            assert(err)
        }
    })
})