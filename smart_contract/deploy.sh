./build.sh
#
#### resetting everything
near delete nftcontract.somenewname.testnet somenewname.testnet
near delete nftpoolcontract.somenewname.testnet somenewname.testnet
near delete nfterc20contract.somenewname.testnet somenewname.testnet

#######
###### deplow section
#near state somenewname.testnet
near create_account nftcontract.somenewname.testnet --masterAccount somenewname.testnet --initialBalance 10
near create_account nftpoolcontract.somenewname.testnet --masterAccount somenewname.testnet --initialBalance 10
near create_account nfterc20contract.somenewname.testnet --masterAccount somenewname.testnet --initialBalance 5
#near create_account nftnewcontract.somenewname.testnet --masterAccount somenewname.testnet --initialBalance 5

###
#######
near deploy --accountId nftcontract.somenewname.testnet --wasmFile ./res/non_fungible_token.wasm --initFunction new --initArgs '{"owner_id": "somenewname.testnet", "name": "nfts collectibles" , "symbol" : "platform" ,"base_uri": "somenewname"}'
near deploy --accountId nftpoolcontract.somenewname.testnet --wasmFile ./res/nft_pool.wasm --initFunction new --initArgs '{"subowner" : "somenewname.testnet"}'
near deploy --accountId nfterc20contract.somenewname.testnet --wasmFile ./res/fungible_token.wasm --initFunction new_default_meta --initArgs '{"owner_id":"somenewname.testnet","name":"WSK","total_supply":"20000000","nftcaller":"nftcontract.somenewname.testnet"}'

#near deploy --accountId nftnewcontract.somenewname.testnet --wasmFile ./res/fungible_token.wasm --initFunction new_default_meta --initArgs '{"owner_id":"somenewname.testnet","name":"somenewname-pooltoken","total_supply":"20000000","nftcaller":"nftcontract.somenewname.testnet"}'

near call nfterc20contractcontract.somenewname.testnet storage_deposit '' --accountId amanraj1608.testnet --amount 0.00125
near call nfterc20contract.somenewname.testnet ft_transfer '{"receiver_id":"amanraj1608.testnet", "amount":"10"}' --accountId somenewname.testnet --depositYocto 1
#
#####
####### for calling
#####
near call nftcontract.somenewname.testnet nft_mint '{"ipfs_hash":"https://cattery-api.amanraj.dev/api/img/6"}' --accountId somenewname.testnet --gas 300000000000000
#near call nftcontract.somenewname.testnet invite_other '{"invitee":"amanraj1608.testnet"}' --accountId somenewname.testnet --gas 300000000000000
#near call nftcontract.somenewname.testnet create_pool '{"pool_id":"nftpoolcontract.somenewname.testnet","roomsize":"200000000"}' --accountId somenewname.testnet --gas 300000000000000
#near call nftcontract.somenewname.testnet nft_mint '{"ipfs_hash":"https://avatars.githubusercontent.com/u/42795731?v=4"}' --accountId somenewname.testnet --gas 300000000000000
#near call nftcontract.somenewname.testnet nft_mint '{"ipfs_hash":"https://avatars.githubusercontent.com/u/42104907?v=4"}' --accountId somenewname.testnet
#near call nftcontract.somenewname.testnet invite_other '{"invitee":"amanraj1608.testnet"}' --accountId somenewname.testnet --gas 300000000000000
#near call nftcontract.somenewname.testnet invite_other '{"invitee":"somenewname.testnet"}' -- accountId somenewname.testnet --gas 300000000000000

#near call nftcontract.somenewname.testnet nft_transfer '{"receiver_id":"testing2somenewname.testnet","token_id":"1"}' --accountId somenewname.testnet --depositYocto 1

#near call somenewname123.nftpoolcontract.somenewname.testnet ft_balance_of '{"account_id":"somenewname.testnet"}' --accountId somenewname.testnet
#'somenewname20.nftpoolcontract.somenewname.testnet'

#near call nftcontract.somenewname.testnet invite_left '{"account_id":"somenewname.testnet"}' --accountId somenewname.testnet


#near call nftcontract.somenewname.testnet nft_metadata --accountId somenewname.testnet

#near call nftcontract.somenewname.testnet token_metadataa '{"account_id":"somenewname.testnet"}' --accountId somenewname.testnet

#near call nftcontract.somenewname.testnet storage_deposit '' --accountId modi.testnet --amount 0.00125