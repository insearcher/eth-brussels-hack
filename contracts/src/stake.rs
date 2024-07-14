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
const STYLUS_PROGRAM_ADDRESS: &str = "0x93b19315A575532907DeB0FA63Bbd74972934784";

#[abigen(Staking, "[
    function stake() external payable
    function withdraw(uint256 amount) external
    function balanceOf(address account) external view returns (uint256)
]")]
struct Staking;

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
    let staking = Staking::new(address, client);
    let amount = ethers::utils::parse_ether(1.0)?;
    let pending_tx = staking.stake().value(amount).send().await?;
    let receipt = pending_tx.await?;
    println!("Stake transaction receipt: {:?}", receipt);
    let my_address = wallet.address();
    let balance = staking.balanceOf(my_address).call().await?;
    println!("Staked balance: {:?}", balance);
    let withdraw_amount = ethers::utils::parse_ether(0.05)?;
    let pending_tx = staking.withdraw(withdraw_amount).send().await?;
    let receipt = pending_tx.await?;
    println!("Withdraw transaction receipt: {:?}", receipt);
    let balance = staking.balanceOf(my_address).call().await?;
    println!("Staked balance after withdrawal: {:?}", balance);
    Ok(())
}

fn read_secret_from_file(fpath: &str) -> eyre::Result<String> {
    let f = File::open(fpath)?;
    let mut buf_reader = BufReader::new(f);
    let mut secret = String::new();
    buf_reader.read_line(&mut secret)?;
    Ok(secret.trim().to_string())
}
