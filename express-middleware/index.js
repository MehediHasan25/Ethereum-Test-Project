const express = require('express');
const bodyParser = require('body-parser');
const Web3 = require('web3');
const app = express();
var abi = [
    {
      "constant": false,
      "inputs": [
        {
          "name": "n",
          "type": "string"
        }
      ],
      "name": "set",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "get",
      "outputs": [
        {
          "name": "",
          "type": "string"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    }
  ];

const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));
web3.eth.defaultAccount = web3.eth.accounts[0];
const setgetContract = web3.eth.contract(abi);
const setgetContractInstance = setgetContract.at("0xF5C44195CaE5e8F2D6a4e2e38Bbe837F4BB80110");
app.use(bodyParser.json());

app.get('/get', function(req, res) {
    let estimatedGas = setgetContractInstance.get.estimateGas();
    var value = setgetContractInstance.get({value: 0, gas: estimatedGas + 1});
    res.send(value);
})


app.post('/set', function(req, res) {

    let estimatedGas = setgetContractInstance.set.estimateGas(req.body.name);
    //console.log(estimatedGas);
    setgetContractInstance.set(req.body.name,{value: 0, gas: estimatedGas + 1});
    res.send("value set");
})

app.listen(3002, (err, res) => {
    console.log("Server is up!!");
})





