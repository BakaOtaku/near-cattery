import { createContext, useEffect, useRef, useState } from "react";
import { connect, Contract, keyStores, WalletConnection } from 'near-api-js'

import getConfig from '@utils/config';
const nearConfig = getConfig('testnet')

export const nearContext = createContext();

export default function Near({ children }) {
  const [address, setAddress] = useState('');
  const [isAuth, setIsAuth] = useState(false);
  const [isCreator, setIsCreator] = useState(false);

  async function initContract() {
    console.log('Initializing contract')
    // Initialize connection to the NEAR testnet
    const near = await connect(Object.assign({ deps: { keyStore: new keyStores.BrowserLocalStorageKeyStore() } }, nearConfig))
    window.walletConnection = new WalletConnection(near)
    window.accountId = window.walletConnection.getAccountId()
    setAddress(window.accountId);
    // Initializing our contract APIs by contract name and configuration
    window.nft_contract = await new Contract(window.walletConnection.account(), nearConfig.contractName, {
      viewMethods: ['invite_left'],
      changeMethods: ['nft_mint', 'invite_other', 'create_pool'],
    });
  }

  useEffect(() => {
    if (window) window.nearInitPromise = initContract();
  }, []);

  const login = () => {
    window.walletConnection.requestSignIn(nearConfig.contractName)
  }

  async function fetch_pool_balance(owner, balanceRequester) {
    let nft_pool_master_contract = await near.loadContract('nftpoolcontract.somenewname.testnet', {
      viewMethods: ['get_pool_details'],
      changeMethods: [],
      sender: balanceRequester
    })

    let x = await nft_pool_master_contract.get_pool_details({ 'for_account': owner });
    console.log('pool ' + x);
    let pool_contract = await near.loadContract(x, {
      viewMethods: ['ft_balance_of'],
      changeMethods: ['',],
      sender: balanceRequester
    });
    let balance = await pool_contract.ft_balance_of({ 'account_id': balanceRequester });
    console.log(balance);
    return { 'pool_id': x, 'balance': balance };
  }

  const logout = () => {
    window.walletConnection.signOut()
    window.location.replace(window.location.origin + window.location.pathname)
  }

  return (
    <nearContext.Provider value={{ login, logout, address, isAuth }}>
      {children}
    </nearContext.Provider>
  );
}
