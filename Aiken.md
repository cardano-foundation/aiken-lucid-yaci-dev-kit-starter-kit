## Installation (Apple M1 / M2)

Open in the browser: [https://github.com/aiken-lang/aiken/releases/tag/v1.0.11-alpha](https://github.com/aiken-lang/aiken/releases/tag/v1.0.11-alpha)

```
cd ~
mkdir -p .local/bin
cd .local/bin
wget https://github.com/aiken-lang/aiken/releases/download/v1.0.11-alpha/aiken_v1.0.11-alpha_darwin_arm64.tar.gz
tar zxvf  
./aiken

mati@Mateuszs-MBP bin % ./aiken -V
aiken v1.0.11-alpha 90ff211

export PATH=$USER/.local/bin:$PATH

rm -f aiken_v1.0.11-alpha_darwin_arm64.tar.gz
```

or alternatively via cargo:
```
cargo install --git https://github.com/aiken-lang/aiken.git


mati@Mateuszs-MBP bin % aiken -V
aiken v1.0.11-alpha 90ff211
```

Write validators in the `validators` folder, and supporting functions in the `lib` folder using `.ak` as a file extension.

For example, as `validators/always_true.ak`

```gleam
validator {
  fn spend(_datum: Data, _redeemer: Data, _context: Data) -> Bool {
    True
  }
}
```

Validators are named after their purpose, so one of:

- `spent`
- `mint`
- `withdraw`
- `publish`

## Building

```sh
aiken build
```

## Testing

You can write tests in any module using the `test` keyword. For example:

```gleam
test foo() {
  1 + 1 == 2
}
```

To run all tests, simply do:

```sh
aiken check
```

To run only tests matching the string `foo`, do:

```sh
aiken check -m foo
```

## Documentation

If you're writing a library, you might want to generate an HTML documentation for it.

Use:

```sh
aiken docs
```

## Resources

Find more on the [Aiken's user manual](https://aiken-lang.org).

# Looking for Aiken’s standard library?
https://github.com/aiken-lang/stdlib

# Looking for alternative Aiken’s libraries?
https://github.com/Cardano-Fans

# Looking for more Aiken resources?
https://github.com/aiken-lang/awesome-aiken

# Hungry for more? Check out the following link with many Aiken dApps
https://github.com/search?q=saved%3A%22Aiken%20projects%22%20&type=code&saved_searches=%5B%7B%22name%22%3A%22Aiken%20projects%22%2C%22query%22%3A%22path%3Aaiken.toml%20-org%3Aaiken-lang%20NOT%20is%3Afork%22%7D%5D&expanded_query=path%3Aaiken.toml%20-org%3Aaiken-lang%20NOT%20is%3Afork%20
