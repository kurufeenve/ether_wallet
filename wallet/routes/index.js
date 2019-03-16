var express = require('express');
var router = express.Router();
// var web3 = require('web3');
var ethers = require('ethers');

// const web3 = new Web3(Web3.givenProvider || 'http://127.0.0.1:7545');
// let provider = new ethers.providers.Web3Provider(web3.currentProvider);
let provider = ethers.getDefaultProvider('ropsten');

var etherString;
var current_wallet;
var wallet;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/import_pk', function(req, res, next) {
	// var net = provider. getNetwork();
	// console.log(net);
	var private_key = req.query['text'];
	wallet = new ethers.Wallet(private_key, provider);
	console.log(wallet);

	res.send({pubkey: wallet.signingKey.publicKey, address: wallet.address,});
});

router.get('/create_wallet', function(req, res, next) {
	wallet = ethers.Wallet.createRandom();
 	res.send({pubkey: wallet.signingKey.publicKey, address: wallet.address,});
});

router.get('/check_balance_by_address', async function(req, res, next) {
	var ext_address = req.query['address'];
	try {
		let balance = await provider.getBalance(ext_address);
		etherString = ethers.utils.formatEther(balance);
		console.log("Balance: " + etherString);
	} 
	catch(err) {
		console.log("error", err);
	}
	res.send("Balance: " + etherString);
});

router.get('/check_balance', async function(req, res, next) {
	console.log(wallet);
	try {
		let balance = await provider.getBalance(wallet.address);
		etherString = ethers.utils.formatEther(balance);
		console.log("Balance: " + etherString);
	} 
	catch(err) {
		console.log("error", err);
	}
	res.send("Balance: " + etherString);
});

router.get('/current_wallet', function(req, res, next) {
	current_wallet = wallet;
	console.log("CURRENT WALLET", current_wallet);
	console.log("WALLET JUST WALLET", wallet);
	res.send("Success");
});

router.get('/send', async function(req, res, next) {
	try {
		console.log(wallet);
		let tx = {
			to: req.query['receiver'],
			value: ethers.utils.parseEther(req.query['ether'])
		}
		let sendPromise = await wallet.sendTransaction(tx);;
		console.log(sendPromise);
	} 
	catch(err) {
		console.log("error", err);
	}
	res.send("Success");
});

module.exports = router;

// let address = "0x02F024e0882B310c6734703AB9066EdD3a10C6e0";

// provider.getBalance(address).then(function(balance) {

//     // balance is a BigNumber (in wei); format is as a sting (in ether)
//     let etherString = ethers.utils.formatEther(balance);

//     console.log("Balance: " + etherString);
// }).catch(function(err) {


// provider.getBalance(wallet.address).then(function(balance) {

	// // balance is a BigNumber (in wei); format is as a sting (in ether)
	// etherString = ethers.utils.formatEther(balance);
	// console.log("Balance: " + etherString);
	// }).catch(function(err) {
	// 	console.log(err);
	// });
	// res.send("Balance: " + etherString);

// 

// 0xaf350eae01e99803ee6ed8cbea7d664ed13c9cbe0b54749151e8dace8a888713
