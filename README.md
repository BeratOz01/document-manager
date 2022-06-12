# Document Manager With Blockchain
### About
* Document Manager is a web application that allows you to store and control your documents based on blockchain technology. It is a simple and secure way to store your documents and control your file access.
* In blockchain technology, all information is visible to everyone and everyone can access then by its nature. Because of that, I can not keep all the information (ipfs hash, name, etc.) about the document in the manager smart contract. Instead of keeping this private information in my contract, I store them in my centralized backend server.
* I keep this information by hashing them with keccak256 with the following components :
    * Uploader address
    * IPFS Hash
    * Document Name
* Even though keeping this way still other users can this hash. They can never de-crypt this hash to its components. The only way to create a duplicate hash is to upload a document to the same IPFS  Cid, same name, and same address. Which is quite meaningless for the same person uploading the same document which is already there. 
* Because this hash information is public to everyone, Document Manager uses an authentication system with Web3. Which is a quite simple and common authentication technique for dApps.

### Stack
* Hardhat
    * Solidity
    * @openzeppelin/contracts
* React.js
    * Axios
    * Web3.js
    * Tailwind.css
    * @headless/ui
* Node.js
    * Express.js
    * Mongoose
    * JWT
    * Web3.js
    * MongoDB

### Flow
- Connect with your Metamask account.
- Sign a message with random nonce for authentication purposes
    * Authentication is validation based on the signature. User signs a message with a random nonce which is created from the backend server and sends this signature and user address. After the server receives this information, there is a validation from this signature.
- Now the user is authenticated, so the user can upload his/her files to a server or gives access permission to other addresses, or can see documents given to the user by others.

### Backend Verification Of Document
* After creating a new document from the smart contract, the client-side sends a request to the backend right away. This request contains,
    * Hash 
    * Name 
    * IPFS 
of the document. Shortly client side sends components of hash for verification. And this request is protected so the user needs to pass his/her JWT token. With this JWT token, the backend server can resolve the user's address for creating the correct hash. If both hashes are equal to each other, the request is valid and can save this information to the application database. 
* For the give access part, there is an event listener who listens to contract events anytime. When there is a valid transaction mined, Approve event emits, and our backend server can catch this event, and update the following document allowed addresses array.

### Contract
* Smart contract of Document Manager is very similar to ERC721-Non fungible tokens implementation.
* I design a contract like the NFT contract. 
     * So when you create a new document, basically you need to mint a new NFT with a unique bytes32 hash. After a mint, the user is the owner of this document and increases the balance by one. 
	* Like approve in ERC721 implementation, you can give access to other users in the contract. 
	* For tokenURI implementation, the user who has permission and wants to see the document needs to go Document Manager website.
* For more information, please take a look at DocumentManager.sol 


### Setup
For the database, we need to install MongoDB and start it. [How to](https://www.mongodb.com/docs/manual/administration/install-community/)

### Installation
* For local network
```zsh
git clone https://github.com/BeratOz01/document-manager
cd document-manager
npm install
npx hardhat node
```
* For client-side (after cloning repo)
```zsh
cd client
npm install
npm run start
```
* For backend server (after cloning repo)
```zsh
cd backend
npm install
npm run start
```

### Screenshots
* Homepage
![Home1](https://user-images.githubusercontent.com/77115599/173256921-5c22201a-fccf-4563-aaec-e9bbd12c29ec.jpg)
![Home2](https://user-images.githubusercontent.com/77115599/173256929-a3931c66-3a2f-411e-9c15-df0372504e0d.jpg)
* Authentication
![Auth1](https://user-images.githubusercontent.com/77115599/173256991-da050959-3686-4a3a-9b2f-ea992a3cbd35.jpg)
![Auth2](https://user-images.githubusercontent.com/77115599/173257006-054ff97d-6336-431f-a470-39376ebb0a89.jpg)
* My Uploaded Documents
![Myupload](https://user-images.githubusercontent.com/77115599/173257037-8f19deef-1718-4daa-9f9d-75a6e039f529.jpg)
* Upload Document
![upload](https://user-images.githubusercontent.com/77115599/173257083-92404ad7-8726-4c18-812e-a0fa4800bf0c.jpg)
* Documents shared with user
![shared_me](https://user-images.githubusercontent.com/77115599/173257117-a7f80bc6-845c-446d-ae46-1bc7fb8d53a4.jpg)

### TODO
- [ ] Document View Page
- [ ] DocumentManagerV2 for agreement between two parties with EIP-712 implementation
- [ ] Responsive Design
