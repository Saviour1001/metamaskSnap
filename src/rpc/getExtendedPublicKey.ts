import * as bip32 from "bip32";
import { Wallet, BIP44CoinTypeNode } from "../interface";
import { Keypair } from "@solana/web3.js";
import * as bs58 from "bs58";
import { BIP32Interface } from "bip32";

export async function extractAccoutPrivateKey(
  wallet: Wallet
): Promise<Keypair> {
  let coinType: number = 501;
  //   if (network != networks.bitcoin) {
  //     coinType = 1;
  //   }

  const methodName = `snap_getBip44Entropy_${coinType}`;
  const bitcoin44node = (await wallet.request({
    method: methodName,
  })) as BIP44CoinTypeNode;
  const privateKeyBuffer = Buffer.from(bitcoin44node.privateKey, "hex");
  const chainCodeBuffer = Buffer.from(bitcoin44node.chainCode, "hex");
  //   return privateKeyBuffer.toString("hex");

  //   const keypair = Keypair.fromSecretKey(
  //     bs58.decode(chainCodeBuffer.toString("hex"))
  //   );
  //   return keypair;

  //   let node: BIP32Interface = bip32
  //     .fromPrivateKey(privateKeyBuffer, chainCodeBuffer)

  //@ts-ignore
  // ignore checking since no function to set depth for node
  //   node.__DEPTH = 2;
  //@ts-ignore
  // ignore checking since no function to set index for node
  //   node.__INDEX = HIGHEST_BIT + 0;
  //   return node.deriveHardened(0);
}

export async function getExtendedPublicKey(wallet: Wallet): Promise<Keypair> {
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
    let response = await extractAccoutPrivateKey(wallet);
    return response;
  } else {
    throw new Error("User reject to access the key");
  }
}
