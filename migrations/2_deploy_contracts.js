var Token = artifacts.require("./Token.sol");
var Sale = artifacts.require("./Sale.sol");
var SafeMath=artifacts.require("./SafeMath.sol");
module.exports = function(deployer) {
	deployer.deploy(SafeMath);
	deployer.deploy(Sale, "0x3B5db17376ee6d9B5874862381a3e55077E57cCe").then(function() {
		return deployer.deploy(Token, Sale.address).then(function() {
		deployer.link(Token, SafeMath);
		});
	});
	deployer.link(Sale, SafeMath);
};
