import { connect, Contract, keyStores, WalletConnection } from 'near-api-js'
import getConfig from './config.js'

const nearConfig = getConfig('testnet')

// Initialize contract & set global variables
export async function initContract() {
  console.log('Initializing contract')
  // Initialize connection to the NEAR testnet
  const near = await connect(Object.assign({ deps: { keyStore: new keyStores.BrowserLocalStorageKeyStore() } }, nearConfig))

  // Initializing Wallet based Account. It can work with NEAR testnet wallet that
  // is hosted at https://wallet.testnet.near.org
  window.walletConnection = new WalletConnection(near)

  // Getting the Account ID. If still unauthorized, it's just empty string
  window.accountId = window.walletConnection.getAccountId()
  // console.log(window.accountId)

  // Initializing our contract APIs by contract name and configuration
  window.nft_contract = await new Contract(window.walletConnection.account(), nearConfig.contractName, {
    viewMethods: ['invite_left'],
    changeMethods: ['nft_mint', 'invite_other', 'create_pool'],
  });
}

export async function invite_left() {
  let val = await window.nft_contract.invite_left({ 'account_id': window.accountId });
  return val;
}

export async function nft_mint() {
  let x = await window.nft_contract.nft_mint({ 'ipfs_hash': 'xyz' });
  console.log(x);
}

export async function create_pool() {
  let x = await window.nft_contract.create_pool({ 'pool_id': 'nftpoolcontract.someothernewname.testnet', 'roomsize': '1000000' });
  console.log(x);
}

export function logout() {
  window.walletConnection.signOut()
  // reload page
  window.location.replace(window.location.origin + window.location.pathname)
}

export function login() {
  // Allow the current app to make calls to the specified contract on the
  // user's behalf.
  // This works by creating a new access key for the user's account and storing
  // the private key in localStorage.
  window.walletConnection.requestSignIn(nearConfig.contractName)
}
