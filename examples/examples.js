let BlockmoveApi = require('..');


function printResponse(error, data) {
	if (error !== null) {
		console.log(error);
	}
	else {
		console.log(data);
	}
}


// Generated API Key from your Blockmove.io Wallet
const API_KEY = 'YOUR_API_KEY';

// Generated API Secret Key from your Blockmove.io Wallet
const API_SECRET = 'YOUR_API_SECRET';

// Wallet ID
const WALLET_ID = 'WALLET_ID';



let Api = new BlockmoveApi(API_KEY, API_SECRET);



/**
 * Generate new paying address example
 */

// Webhook example URL
let webhook = 'https://some_webhook.example/status?code=OK&message=OK';

Api.generateAddress({
	wallet_id: WALLET_ID,
	webhook: webhook
}, printResponse);



/**
 * Getting address info example
 */

// Generated address
let address = 'ADDRESS_TO_CHECK';

// Additional message param for currencies like Ripple (Destination Tag), Stellar (Memo), etc.
let message = 'MESSAGE_TO_CHECK';

// ERC20 token if required
let token = 'TST';

Api.getAddressInfo({
	address: address,
	message: message,
	token: token
}, printResponse);



/**
 * Getting wallet balance example
 */
Api.getWalletBalance(WALLET_ID, printResponse);



/**
 * Getting transaction info example
 */

// Transaction ID Hash
let tx_id = 'TX_ID';

Api.getTx({
	wallet_id: WALLET_ID,
	tx_id: tx_id
}, printResponse);


/**
 * Getting wallet transaction history example
 */

// Parameters for displaying records rows
let records_params = {
	limit: 10,
	offset: 5
};

Api.getWalletHistory({
	wallet_id: WALLET_ID,
	params: records_params,
	token: token
}, printResponse);


/**
 * Getting address transaction history example
 */
Api.getAddressHistory({
	address: address,
	params: records_params,
	token: token
}, printResponse);


/**
 * Sending payment example
 */

// Your Wallet Password
let wallet_password = 'WALLET_PASSWORD';

// Address to send coins
let destination = {
	address: 'DESTINATION_ADDRESS',
	message: 'DESTINATION_TAG'
};

// Amount of coins in FLOAT format
let amount = 0.01;

// ERC20 token if required
let tokenSend = 'TST';

Api.send({
	wallet_id: WALLET_ID,
	password: wallet_password,
	destination: destination,
	amount: amount,
	priority: Api.PRIORITY_MEDIUM,
	token: tokenSend
}, printResponse);