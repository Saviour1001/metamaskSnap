// import * as bip32 from "bip32";
// import { Network, networks } from "bitcoinjs-lib";
// import { BIP32Interface } from "bip32";
import { Wallet, ScriptType, BIP44CoinTypeNode } from "../interface";

export async function getExtendedPublicKey(wallet: Wallet): Promise<string> {
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
    return "Hello";
  } else {
    throw new Error("User reject to access the key");
  }
}
