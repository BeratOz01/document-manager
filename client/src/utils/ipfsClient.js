/* import the ipfs-http-client library */
import { create } from "ipfs-http-client";

export const ipfsClient = create("https://ipfs.infura.io:5001/api/v0");
