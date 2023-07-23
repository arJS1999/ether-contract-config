# demo_pac 
It contains option to connect metamask wallet, deploy and interact with smart contract using  ether.js

# Development

### Install package

Run below comment on your project root folder.

```shell
npm install --save demo_pac
```

### demo_pac Functions

##### Connect Wallet
Using below code to connect with metamask wallet to your application

```js

//ts
import { connectWallet } from 'demo_pac';
//js
//const connectWallet = require("demo_pac").connectWallet;

const account = await connectWallet();

if (account && account.account) {
    console.log("Connected to metamask wallet - ", account.account);
} else if (account && account.message) {
    console.log("Error while connecting wallet - ", account.message);
}

```

##### Deploy Contract
Using below code to deploy contract with abi and bytecode

```js

//ts
import { deployContract } from 'demo_pac';
//js
//const deployContract = require("demo_pac").deployContract;

//5, 6 - contract intial constructor params
const contract = await deployContract(abi, byteCode, 5, 6);

if (contract) {
    console.log("Contract deployed successfully - ", contract.address);
} else {
    console.log("Error while deploying Contract");
}

```

##### Access Contract
Using below code to Access contract with abi and contract_address

```js

//ts
import { getContract } from 'demo_pac';
//js
//const getContract = require("demo_pac").getContract;

const contract = await getContract(contractAddress, abi);

if (contract) {
    console.log("Contract accessed successfully - ", contract.address);
} else {
    console.log("Error while access Contract");
}

```