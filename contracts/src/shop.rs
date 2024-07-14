use ethers::prelude::*;
use ethers::providers::{Http, Provider};
use ethers::signers::{LocalWallet, Signer};
use std::sync::Arc;
use std::str::FromStr;
use tokio::main;
use eyre::Result;
use std::fs::File;
use std::io::{BufReader, BufRead};

const RPC_URL: &str = "https://sepolia-rollup.arbitrum.io/rpc";
const STYLUS_PROGRAM_ADDRESS: &str = "0xFf815c15e20DA1E43262B42a7F8401DF030de554";

#[abigen(Marketplace, "[
    function buyMerchandise(uint256 itemId) external payable
    function buyTokens(uint256 tokenAmount) external payable
    function getMerchandisePrice(uint256 itemId) external view returns (uint256)
    function getTokenPrice(uint256 tokenAmount) external view returns (uint256)
    function getBalance(address account) external view returns (uint256)
]")]
struct Marketplace;

#[main]
async fn main() -> Result<()> {
    let priv_key_path =
         std::env::var("PRIV_KEY_PATH").map_err(|_| eyre::eyre!("No PRIV_KEY_PATH env var set"))?;
    let rpc_url = RPC_URL;
    let program_address = STYLUS_PROGRAM_ADDRESS;
    let provider = Provider::<Http>::try_from(rpc_url)?;
    let address: Address = program_address.parse()?;
    let privkey = read_secret_from_file(&priv_key_path)?;
    let privkey = "YOUR_PRIVATE_KEY_HERE".to_string();
    let wallet = LocalWallet::from_str(&privkey)?;
    let chain_id = provider.get_chainid().await?.as_u64();
    let client = Arc::new(SignerMiddleware::new(provider, wallet.with_chain_id(chain_id)));
    let marketplace = Marketplace::new(address, client);
    let item_id = 1;
    let price = marketplace.getMerchandisePrice(item_id).call().await?;
    let pending_tx = marketplace.buyMerchandise(item_id).value(price).send().await?;
    let receipt = pending_tx.await?;
    println!("Buy merchandise transaction receipt: {:?}", receipt);
    let token_amount = 100;
    let token_price = marketplace.getTokenPrice(token_amount).call().await?;
    let pending_tx = marketplace.buyTokens(token_amount).value(token_price).send().await?;
    let receipt = pending_tx.await?;
    println!("Buy tokens transaction receipt: {:?}", receipt);
    let my_address = wallet.address();
    let balance = marketplace.getBalance(my_address).call().await?;
    println!("Account balance: {:?}", balance);
    Ok(())
}

fn read_secret_from_file(fpath: &str) -> eyre::Result<String> {
    let f = File::open(fpath)?;
    let mut buf_reader = BufReader::new(f);
    let mut secret = String::new();
    buf_reader.read_line(&mut secret)?;
    Ok(secret.trim().to_string())
}
