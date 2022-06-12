const Web3 = require("web3");

// File model
const File = require("../model/file");

// Contract abi
const { abi } = require("../abi/DocumentManager.json");

// Web3 instance for the current node
const web3 = new Web3(
  new Web3.providers.WebsocketProvider("ws://127.0.0.1:8545/")
);

// Creating new contract instance for interaction with the contract
const contract = new web3.eth.Contract(
  abi,
  "0x5FbDB2315678afecb367f032d93F642f64180aa3"
);

contract.events
  .Approve({}, (err, event) => {
    if (err) console.log(err);
  })
  .on("data", async (data) => {
    const values = data.returnValues;
    const { hash, approvedAddress } = values;

    console.log("hash => ", hash);
    console.log("to   => ", approvedAddress);

    const f = await File.findOne({ hash });
    if (!f) return;

    f.allowedAddresses.push(approvedAddress.toLowerCase());
    await f.save();
  });

// Helper function for check if the user is owner of the hash given in the parameter
const ifOwner = async (address, _hash) => {
  const result = await contract.methods.ownerOf(_hash).call();
  console.log(result);
  return result.toLowerCase() === address;
};

module.exports = { web3, contract, ifOwner };
