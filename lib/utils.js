const fs = require('fs');
const Web3 = require('web3');
const ethers = require('ethers');
const read = require('fs-readdir-recursive');
const parser = require("solidity-parser-antlr");
const path = require('path')

const utils = {


	getContractMethodInfos(srcPath) {
		const files = this.listSolidityFiles(srcPath);
		const contractsAndMethods = [];
		files.forEach(file => {

			const input = fs.readFileSync(file, "utf-8");
			const ast = parser.parse(input, { tolerant: true })

			let name;
			let subNodes = [];
			parser.visit(ast, {
				ContractDefinition: function(node) {
					name = node.name;
					node.subNodes.filter(node => node.type == 'FunctionDefinition' ).forEach(node => {
						subNodes.push(node);
					})
				}
			});

			const contractInfo = {
				name: name,
				methods: []
			};

			
			subNodes.forEach( node => {
				const methodInfo = {
					methodName: node.name
				}
				contractInfo.methods.push(methodInfo)
			});
			
		contractsAndMethods.push(contractInfo);
		});
		return contractsAndMethods;
	},

	listSolidityFiles(srcPath) {
		let base = `./${srcPath}/`;
		if (process.platform === "win32") {
			base = base.replace(/\\/g, "/");
		}

		const paths = read(base)
			.filter(file => path.extname(file) === ".sol")
			.map(file => base + file);

		return paths;
	},
};

module.exports = utils;
