use aiken/hash.{Blake2b_224, Hash}
use aiken/list
use aiken/transaction.{ScriptContext, Spend}
use aiken/transaction/credential.{VerificationKey}

type Datum {
  owner: Hash<Blake2b_224, VerificationKey>,
}

type Redeemer {
  msg: ByteArray,
}

validator {
  fn hello_world(datum: Datum, redeemer: Redeemer, ctx: ScriptContext) -> Bool {
    when ctx.purpose is {
      Spend(_ref) -> {
        let _abc = 1_000_000
        let must_say_hello = redeemer.msg == "Hello, World!"
        let must_be_signed =
          list.has(ctx.transaction.extra_signatories, datum.owner)
        must_say_hello && must_be_signed
      }
      _ -> False
    }
  }
}
