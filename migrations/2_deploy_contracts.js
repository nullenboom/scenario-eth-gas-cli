
var Binary = artifacts.require("./ParityBinary.sol");
var Modulo = artifacts.require("./ParityModulo.sol");


module.exports = function(deployer) {

  deployer.deploy(Binary);
  deployer.deploy(Modulo);


};
