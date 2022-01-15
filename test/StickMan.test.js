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

    })

})