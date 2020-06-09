let _request = require('request');
let _crypto = require('crypto');


/**
 * @param {string} 		key 		API Public Key
 * @param {string}		secret		API Secret Key
 * @constructor
 */
let Main = function(key, secret) {
	this.key = key;
	this.secret = secret;

	/**
	 * Blockmove.io API Endpoint
	 */
	this.ENDPOINT = 'https://api.blockmove.io/v1';

	/**
	 * Transaction priority for fastest confirmation
	 */
	this.PRIORITY_HIGH = 'high';

	/**
	 * Transaction priority for medium confirmation (used by default)
	 */
	this.PRIORITY_MEDIUM = 'medium';

	/**
	 * Transaction priority for slow confirmation
	 */
	this.PRIORITY_LOW = 'low';
};


/**
 * @callback cb
 */
Main.prototype.status = function(cb) {
	this._request('status', {}, cb);
};


/**
 * @param {string} 	endpoint	API Endpoint
 */
Main.prototype.setEndpoint = function(endpoint) {
	this.ENDPOINT = endpoint;
};


/**
 * @param {Object} 		params		Object to generate new API address {string wallet_id, string webhook}
 * @callback cb
 */
Main.prototype.generateAddress = function(params, cb) {
	this._request('generateaddress', params, cb);
};


/**
 * @param {Object} 		params		Object to get transactionstatus {string wallet_id, string tx_id}
 * @callback cb
 */
Main.prototype.getTx = function(params, cb) {
	this._request('tx', params, cb);
};


/**
 * @param {string} 		walletId	Wallet ID
 * @callback cb
 */
Main.prototype.getWalletBalance = function(walletId, cb) {
	this._request('walletbalance', {
		wallet_id: walletId
	}, cb);
};


/**
 * @param {Object}		params		Object to get address info {string address, string message}
 * @param cb
 */
Main.prototype.getAddressInfo = function(params, cb) {
	this._request('addressinfo', params, cb);
};


/**
 * @param {Object} 		params 		Object to get wallet history {string walletId, array params, string token}
 * @param cb
 */
Main.prototype.getWalletHistory = function(params, cb) {
	this._request('wallethistory', params, cb);
};


/**
 * @param {Object}		params		Object to get address history {string address, array params, string token}
 * @param cb
 */
Main.prototype.getAddressHistory = function(params, cb) {
	this._request('addresshistory', params, cb);
};


/**
 * @param {Object}		params		Object to send transaction {string wallet_id, string password, string|object destination {string address, string message}, float amount, const priority}
 * @param cb
 */
Main.prototype.send = function(params, cb) {
	params.password = this._encryptPassword(params.password);
	this._request('send', params, cb);
};


/**
 * @private
 * @param {string} 	method
 * @param {Object} 	params
 * @callback cb
 */
Main.prototype._request = function(method, params, cb) {
	let url = this.ENDPOINT + '/' + method;

	params = Object.assign({}, params, {_api_key: this.key});

	let json = JSON.stringify(params);
	let sign = this._createSign(json);

	params = Object.assign({}, params, {_api_sign: sign});

	_request.post({
		uri: url,
		method: 'POST',
		json: true,
		body: params
	}, function (error, response, body) {
		if (error || response.statusCode !== 200) {
			cb(error, body || {});
		}
		else {
			cb(null, body);
		}
	});
};


/**
 * @private
 * @param {string} 		queryString
 * @returns {string} 	HMAC SHA256 encoded
 */
Main.prototype._createSign = function(queryString) {
	let hmac = _crypto.createHmac('sha256', this.secret);
	return hmac.update(queryString).digest('hex');
};


/**
 * @private
 * @param {string} 		password 		Wallet Password
 * @returns {string}	Encrypted password
 */
Main.prototype._encryptPassword = function(password) {
	let hash = _crypto.createHash('sha512');
	return hash.update(password, 'utf-8').digest('hex');
};


module.exports = Main;