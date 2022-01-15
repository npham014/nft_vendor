const StickMan = artifacts.require("StickMan");

module.exports = function(deployer) {
    deployer.deploy(StickMan);
}