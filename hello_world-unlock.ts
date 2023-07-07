import {
    Blockfrost,
    C,
    Constr,
    Data,
    Lucid,
    SpendingValidator,
    TxHash,
    fromHex,
    toHex,
    utf8ToHex,
  } from "https://deno.land/x/lucid@0.8.3/mod.ts";
  import * as cbor from "https://deno.land/x/cbor@v1.4.1/index.js";
   
  const lucid = await Lucid.new(
    new Blockfrost("http://localhost:8080/api/v1", // yaci-devkit is compatible with blockfrost API (https://blockfrost.dev/)
     ""),
     "Preprod",
   );

// never share your mainnet wallet passphrase like this, it is only for demo purpouses!
lucid.selectWalletFromSeed('damp wish scrub sentence vibrant gauge tumble raven game extend winner acid side amused vote edge affair buzz hospital slogan patient drum day vital');
   
  const validator = await readValidator();
   
  async function readValidator(): Promise<SpendingValidator> {
    const validator = JSON.parse(await Deno.readTextFile("plutus.json")).validators[0];
    return {
      type: "PlutusV2",
      script: toHex(cbor.encode(fromHex(validator.compiledCode))),
    };
  }


const utxo: OutRef = { txHash: Deno.args[0], outputIndex: 0 };
 
const redeemer = Data.to(new Constr(0, [utf8ToHex("Hello, World!")]));
 
const txHash = await unlock(utxo, {
  from: validator,
  using: redeemer,
});
 
await lucid.awaitTx(txHash);
 
console.log(`1 tADA unlocked from the contract
    Tx ID:    ${txHash}
    Redeemer: ${redeemer}
`);
 
async function unlock(
  ref: OutRef,
  { from, using }: { from: SpendingValidator; using: Redeemer }
): Promise<TxHash> {
  const [utxo] = await lucid.utxosByOutRef([ref]);
 
  const tx = await lucid
    .newTx()
    .collectFrom([utxo], using)
    .addSigner(await lucid.wallet.address())
    .attachSpendingValidator(from)
    .complete();
 
  const signedTx = await tx
    .sign()
    .complete();
 
  return signedTx.submit();
}