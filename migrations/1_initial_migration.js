var Migrations = artifacts.require("./Migrations.sol");
var SafeMath=artifacts.require("./SafeMath.sol");
module.exports = function(deployer) {
  deployer.deploy(Migrations);
};
