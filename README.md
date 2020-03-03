## Official Blockmove.io Node.js SDK

Documentation is available at website https://docs.blockmove.io.

Examples are available in this package.

To install, just use npm:
```bash
npm install blockmove-api
```

Example
--------

```javascript
let BlockmoveApi = require('blockmove-api-node');

// Generated API Key from your Blockmove.io Wallet
const API_KEY = 'YOUR_API_KEY';

// Generated API Secret Key from your Blockmove.io Wallet
const API_SECRET = 'YOUR_API_SECRET';

// Wallet ID
const WALLET_ID = 'WALLET_ID';

let Api = new BlockmoveApi(API_KEY, API_SECRET);

// Get wallet balance
Api.getWalletBalance(WALLET_ID, function(error, data) {
    if (error !== null) {
        console.log(error);
    }
    else {
        console.log(data);
    }
});
```
