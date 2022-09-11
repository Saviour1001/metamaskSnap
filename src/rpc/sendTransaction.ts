import { extractAccoutPrivateKey } from "./getExtendedPublicKey";
import { Wallet } from "../interface";
import {
  Connection,
  Keypair,
  SystemProgram,
  LAMPORTS_PER_SOL,
  Transaction,
  sendAndConfirmTransaction,
  PublicKey,
} from "@solana/web3.js";

export async function sendTransaction(wallet: Wallet): Promise<string> {
  const user = await extractAccoutPrivateKey(wallet);

  const connection = new Connection(
    "https://api.devnet.solana.com/",
    "confirmed"
  );

  const transferTransaction = new Transaction().add(
    SystemProgram.transfer({
      fromPubkey: user.publicKey,
      toPubkey: new PublicKey("GdNh12yVy5Lsew9WXVCV5ErgK5SpmsBJkcti5jVtPB7o"),
      lamports: 1 * LAMPORTS_PER_SOL,
    })
  );

  const response = await sendAndConfirmTransaction(
    connection,
    transferTransaction,
    [user]
  );
  return response;
}
