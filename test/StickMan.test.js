const { assert } = require('chai');

const StickMan = artifacts.require('./StickMan.sol');

require('chai').use(require('chai-as-promised')).should()

contract('StickMan', (accounts) => {
    let contract;
    
    before(async () => {
        contract = await StickMan.deployed();
    })

    describe('deployment', async () => {
        it('deploys to blockchain', async () => {
            const address = contract.address;
            //console.log("address: ", address);
            assert.notEqual(address, null);
            assert.notEqual(address, 0x0);
            assert.notEqual(address, '');
            assert.notEqual(address, undefined);
        })

        it('has the correct name and symbol', async () => {
            let name = await contract.name();
            let symbol = await contract.symbol();

            assert.equal(name, "StickMan");
            assert.equal(symbol, "STKM");
        })

    })// end describe deployment

    describe('minting', async () => {
        it('mints a new token',async () => {
            let newToken = await contract.mint(1234);
            //console.log(contract)
            let supp = await contract.totalSupply();
            
            //should succeed
            assert.equal(supp, 1);
            const event = newToken.logs[0].args;
            assert.equal(event.tokenId.toNumber(), 0, 'id of first token is 0');
            assert.equal(event.from, '0x0000000000000000000000000000000000000000', 'minted from blank address');
            assert.equal(event.to,accounts[0], 'to account is correct');

            //should fail
            await contract.mint("1234").should.be.rejected;
        }) 
    })//end describe minting

    describe('nft index', async () => {
        it('returns all stickmans', async () => {
            await contract.mint(1111);
            await contract.mint(2222);
            await contract.mint(3333);
            const totSupp = await contract.totalSupply();

            let stick;
            let actualStickMans = [];

            for (let i = 0; i < totSupp; i++) {
                stick = await contract.StickMans(i);
                actualStickMans.push(stick);
            }
            let expectedStickMans = [1234,1111,2222,3333];
            assert.equal(expectedStickMans.join(','),actualStickMans.join(','), "multiple mints can be retrieved");
        }) 
    })
})