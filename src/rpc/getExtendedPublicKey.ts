// import * as bip32 from "bip32";
import { Network, networks } from "bitcoinjs-lib";
import { BIP32Interface } from "bip32";
import { Wallet, ScriptType, BIP44CoinTypeNode } from "../interface";
import { getBIP44AddressKeyDeriver } from "@metamask/key-tree";

export async function getExtendedPublicKey(wallet: Wallet): Promise<Buffer> {
  const result = await wallet.request({
    method: "snap_confirm",
    params: [
      {
        prompt: "Access your extended public key?",
        description:
          "Do you want to allow this app to access your extended public key?",
      },
    ],
  });

  if (result) {
    // let accountNode = await extractAccoutPrivateKey(wallet, network);
    // let accountPublicKey = accountNode.neutered();
    // return accountPublicKey.toBase58();
    // console.log("redd");
    let response = await extractAccoutPrivateKey(wallet);
    return response;
  } else {
    throw new Error("User reject to access the key");
  }
}

export async function extractAccoutPrivateKey(wallet: Wallet): Promise<Buffer> {
  let coinType: number = 501;
  // if (network != networks.bitcoin) {
  //   coinType = 1;
  // }

  const methodName = `snap_getBip44Entropy_${coinType}`;
  const bitcoin44node = (await wallet.request({
    method: methodName,
  })) as BIP44CoinTypeNode;
  const privateKeyBuffer = Buffer.from(bitcoin44node.privateKey, "hex");
  const chainCodeBuffer = Buffer.from(bitcoin44node.chainCode, "hex");
  console.log(privateKeyBuffer);
  console.log(chainCodeBuffer);
  return chainCodeBuffer;
  // let node: BIP32Interface = bip32.fromPrivateKey(
  //   privateKeyBuffer,
  //   chainCodeBuffer,
  //   network
  // );
  //@ts-ignore
  // ignore checking since no function to set depth for node
  // node.__DEPTH = 2;
  // //@ts-ignore
  // // ignore checking since no function to set index for node
  // node.__INDEX = HIGHEST_BIT + 0;
  // return node.deriveHardened(0);
}
// export async function extractAccoutPrivateKey(
//   wallet: Wallet,
//   network: string
// ): Promise<string> {
//   const result = await wallet.request({
//     method: "snap_confirm",
//     params: [
//       {
//         prompt: "Access your account private key?",
//         description:
//           "Do you want to allow this app to access your account private key?",
//       },
//     ],
//   });

//   return "Hello";
// }
