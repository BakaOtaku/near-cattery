use std::borrow::{Borrow, BorrowMut};
use std::convert::{TryFrom, TryInto};
use std::ops::Sub;
use near_contract_standards::non_fungible_token::metadata::{
    NFTContractMetadata, NonFungibleTokenMetadataProvider, TokenMetadata, NFT_METADATA_SPEC,
};
use near_contract_standards::non_fungible_token::{Token, TokenId};
use near_contract_standards::non_fungible_token::NonFungibleToken;
use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::collections::{LazyOption, LookupMap, UnorderedSet};
use near_sdk::json_types::{Base64VecU8, ValidAccountId};
use near_sdk::{env, ext_contract, near_bindgen, AccountId, Balance, Gas, BorshStorageKey, PanicOnDefault, Promise, PromiseOrValue, log, PromiseResult, CryptoHash};
use near_sdk::env::{log, promise_result, sha256, state_read};

use near_sdk::serde_json::{json, json_internal_vec};

near_sdk::setup_alloc!();

#[ext_contract(ext_pool)]
pub trait DeployPool {
    fn new_pool(&mut self, poolname :AccountId, owner_id:AccountId,roomsize :U128) -> PromiseOrValue<AccountId>;
}

#[ext_contract(ext_ft)]
pub trait FungibleToken {
    fn ft_balance_of(&mut self, account_id: AccountId) -> U128;
    fn nft_internal_transfer(&mut self, invitee: AccountId, amount : U128);
}

#[ext_contract(ext_self)]
pub trait MyContract {
    fn nft_mint_callback(&mut self, check:String, caller : AccountId,reciever_id :ValidAccountId,ipfs_hash: String) -> String;
}

const NO_DEPOSIT: Balance = 0;
const BASE_GAS: Gas = 5_000_000_000_000;
const PROMISE_CALL: Gas = 5_000_000_000_000;
const GAS_FOR_NFT_ON_APPROVE: Gas = BASE_GAS + PROMISE_CALL;


#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize, PanicOnDefault)]
pub struct Contract {
    tokens: NonFungibleToken,
    metadata: LazyOption<NFTContractMetadata>,
    tokenIds : LazyOption<String>,
    ContractGlobal : LazyOption<AccountId>,
    OwnerNftStore : LookupMap<AccountId,String>,
    InviteNftCounts : LookupMap<AccountId,u128>
}

const DATA_IMAGE_SVG_NEAR_ICON: &str = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 288 288'%3E%3Cg id='l' data-name='l'%3E%3Cpath d='M187.58,79.81l-30.1,44.69a3.2,3.2,0,0,0,4.75,4.2L191.86,103a1.2,1.2,0,0,1,2,.91v80.46a1.2,1.2,0,0,1-2.12.77L102.18,77.93A15.35,15.35,0,0,0,90.47,72.5H87.34A15.34,15.34,0,0,0,72,87.84V201.16A15.34,15.34,0,0,0,87.34,216.5h0a15.35,15.35,0,0,0,13.08-7.31l30.1-44.69a3.2,3.2,0,0,0-4.75-4.2L96.14,186a1.2,1.2,0,0,1-2-.91V104.61a1.2,1.2,0,0,1,2.12-.77l89.55,107.23a15.35,15.35,0,0,0,11.71,5.43h3.13A15.34,15.34,0,0,0,216,201.16V87.84A15.34,15.34,0,0,0,200.66,72.5h0A15.35,15.35,0,0,0,187.58,79.81Z'/%3E%3C/g%3E%3C/svg%3E";

#[derive(BorshSerialize, BorshStorageKey)]
enum StorageKey {
    NonFungibleToken,
    Metadata,
    TokenMetadata,
    Enumeration,
    Approval,
    TokenIds,
    ContractOwner,
    OwnerNft,
    InviteCount,
    TokensPerOwner { account_hash: Vec<u8> },
    TokenPerOwnerInner { account_id_hash: CryptoHash },
}

#[near_bindgen]
impl Contract {
    /// Initializes the contract owned by `owner_id` with
    /// default metadata (for example purposes only).
    #[init]
    pub fn new(owner_id: ValidAccountId, name: String, symbol: String, base_uri: String) -> Self {
        // assert!(!env::state_exists(), "Already initialized");
        let metadata: NFTContractMetadata = NFTContractMetadata {
            spec: NFT_METADATA_SPEC.to_string(),
            name,
            symbol,
            icon: Some(DATA_IMAGE_SVG_NEAR_ICON.to_string()),
            base_uri: Some(base_uri),
            reference: None,
            reference_hash: None
        };
        let initcounter: String = "0".to_string();
        Self {
            tokens: NonFungibleToken::new(
                StorageKey::NonFungibleToken,
                owner_id.clone(),
                Some(StorageKey::TokenMetadata),
                Some(StorageKey::Enumeration),
                Some(StorageKey::Approval),
            ),
            metadata: LazyOption::new(StorageKey::Metadata, Some(&metadata)),
            tokenIds: LazyOption::new(StorageKey::TokenIds, Some(&initcounter)),
            ContractGlobal: LazyOption::new(StorageKey::ContractOwner, Some(&owner_id.into())),
            OwnerNftStore: LookupMap::new(StorageKey::OwnerNft),
            InviteNftCounts : LookupMap::new( StorageKey::InviteCount)
        }
    }

    /// Mint a new token with ID=`token_id` belonging to `receiver_id`.
    ///
    /// Since this example implements metadata, it also requires per-token metadata to be provided
    /// in this call. `self.tokens.mint` will also require it to be Some, since
    /// `StorageKey::TokenMetadata` was provided at initialization.
    ///
    /// `self.tokens.mint` will enforce `predecessor_account_id` to equal the `owner_id` given in
    /// initialization call to `new`.
    #[payable]
    pub fn nft_mint(
        &mut self,
        ipfs_hash: String
    ) -> Promise {

        let reciever_id: String = env::predecessor_account_id();
        let validAccountID = ValidAccountId::try_from(reciever_id.clone()).unwrap();
        let somename = validAccountID.to_string();

        ext_ft::ft_balance_of(
            reciever_id.clone().into(),
            &"nfterc20contract.somenewname.testnet", // contract account id
            0, // yocto NEAR to attach
            5_000_000_000_000 // gas to attach
        ).then(ext_self::nft_mint_callback(
            "checkbalance".to_string(),
            env::predecessor_account_id().into(),
            validAccountID.into(),
            "".to_string(),
            &env::current_account_id(), // this contract's account id
            9620000000000000000000, // yocto NEAR to attach to the callback
            env::prepaid_gas()/2 // gas to attach to the callback
        ))
    }

    #[payable]
    pub fn create_pool(&mut self, pool_id: AccountId, roomsize: U128) -> PromiseOrValue<String> {
        let account_id = env::predecessor_account_id();
        let tokenid = self.OwnerNftStore.get(&account_id.clone()).unwrap_or_else(|| "".to_string());
        log!(tokenid);
        if tokenid == "" {
            assert!(false, "token id not found")
        }

        let validCurrentId = ValidAccountId::try_from(env::current_account_id()).unwrap();
        self.tokens.internal_transfer(&env::predecessor_account_id(), &env::current_account_id(), &tokenid.clone(), None, None);
        let mut poolname: Vec<&str> = account_id.split(".").collect();
        let counter = self.tokenIds.get().unwrap().to_owned();
        let mut finalname = poolname[0].to_string();
        finalname.push_str("creatorsroomandpools");

        ext_pool::new_pool(finalname.to_string(), env::predecessor_account_id(), roomsize, &pool_id, NO_DEPOSIT, env::prepaid_gas() / 2).into()
    }

    #[payable]
    pub fn nft_mint_callback(&mut self, check:String, caller : AccountId, reciever_id: ValidAccountId, mut ipfs_hash: String) -> String {
        assert_eq!(
            env::promise_results_count(),
            1,
            "This is a callback method"
        );
        let mut owner_metadata : TokenMetadata = TokenMetadata {
            title: None,
            description: None,
            media: None,
            media_hash: None,
            copies: None,
            issued_at: None,
            expires_at: None,
            starts_at: None,
            updated_at: None,
            extra: None,
            reference: None,
            reference_hash: None
        };
        let latest_counter: String = self.tokenIds.get().unwrap();
        let int_counter: i32 = latest_counter.parse().unwrap();

        if check.eq("checkbalance") {
            log!(ipfs_hash);
            let stuff = reciever_id.to_string();
            log!(stuff);

            match env::promise_result(0) {
                PromiseResult::NotReady => unreachable!(),
                PromiseResult::Failed => unreachable!(),
                PromiseResult::Successful(result) => {
                    let balance = near_sdk::serde_json::from_slice::<U128>(&result).unwrap();
                    log!("this is balance very much");
                    if (balance.0 < 0) {
                        assert!(false, "balance less then required")
                    }
                },
            }
            let invites:u128= 2;
            self.InviteNftCounts.insert(&reciever_id.clone().into(), &invites);
            let latest_counter: String = self.tokenIds.get().unwrap();
            let int_counter: i32 = latest_counter.parse().unwrap();

            let newhash=format!("https://cattery-api.amanraj.dev/api/img/{}",(int_counter+1));
            let media_hash = env::sha256(newhash.clone().as_bytes());

            owner_metadata = TokenMetadata {
                title: Some("wow a boss cat".to_string()),
                description: Some(format!("owner nft for {}", reciever_id.to_string())),
                copies: Some(1),
                issued_at: None,
                expires_at: None,
                starts_at: Some(env::block_timestamp().to_string()),
                updated_at: Some(env::block_timestamp().to_string()),
                extra: None,
                reference: None,
                reference_hash: None,
                media: Some(ipfs_hash.clone()),
                media_hash: Some(Base64VecU8::from(media_hash.clone()))
            };

        }else if check.eq("checktransfer") {
            match env::promise_result(0) {
                PromiseResult::NotReady => unreachable!(),
                PromiseResult::Failed => unreachable!(),
                PromiseResult::Successful(result) => {}
            }
            let data= self.InviteNftCounts.get(&caller.clone().into()).unwrap();

            let invites:u128= data-1;
            self.InviteNftCounts.insert(&caller.clone().into(), &invites);

            log!("invite init started");
            log!("amount transfer init");
            let media_hash = env::sha256(ipfs_hash.clone().as_bytes());

            // log!(int_counter.to_string());
            let newhash=format!("https://cattery-api.amanraj.dev/api/img/{}",(int_counter+1));
            let media_hash = env::sha256(newhash.clone().as_bytes());
            owner_metadata = TokenMetadata {
                title: Some("invite nft".to_string()),
                description: Some(format!("invite nft for {}", reciever_id.to_string())),
                copies: Some(1),
                issued_at: None,
                expires_at: None,
                starts_at: Some(env::block_timestamp().to_string()),
                updated_at: Some(env::block_timestamp().to_string()),
                extra: None,
                reference: None,
                reference_hash: None,
                media: Some(newhash.clone()),
                media_hash: Some(Base64VecU8::from(media_hash.clone()))
            };
        }
        log!("{}",ipfs_hash.clone());

        env::log("ownwer token minted".to_string().as_bytes());
        self.tokenIds.replace(&(int_counter + 1).to_string());
        self.OwnerNftStore.insert(&reciever_id.clone().into(), &(int_counter + 1).to_string());

        if check.eq("checktransfer"){
            let invitecaller : ValidAccountId= ValidAccountId::try_from(caller.clone()).unwrap();
            self.internal_mint((int_counter+1).to_string(),invitecaller , Some(owner_metadata));
            self.tokens.internal_transfer(&caller, &reciever_id.clone().into(), &(int_counter+1).to_string(),None,None);
            return (int_counter+1).to_string();

        }

        self.internal_mint((int_counter + 1).to_string(), reciever_id.clone(), Some(owner_metadata));
        return (int_counter+1).to_string();
    }

    #[payable]
    pub fn invite_other( &mut self , invitee : ValidAccountId)->Promise{
        let inviteeleft=self.InviteNftCounts.get(&env::predecessor_account_id()).unwrap_or_else(||10);
        let caller = env::predecessor_account_id();
        if inviteeleft==10{
            assert!(false,"no invitee nft are left")
        }
        log!("invite init started");
        log!("amount transfer init");
        let amounttransfer = U128::try_from(0).unwrap();

        let first = Promise::new("nfterc20contract.somenewname.testnet".to_string()).function_call(
            b"nft_internal_transfer".to_vec(),
            json!({"invitee":invitee.to_string(),"amount":U128::from(1)}).to_string().into_bytes(),
            0,
            5_000_000_000_000
        );

        log!("after transfer");
        let second= ext_self::nft_mint_callback(
            "checktransfer".to_string(),
            env::predecessor_account_id().into(),
            invitee,
            "".to_string(),
            &env::current_account_id(), // contract account id
            9630000000000000000000, // yocto NEAR to attach
            env::prepaid_gas()/2 // gas to attach
            );

        first.then(second)
    }


    pub fn invite_left(&self, account_id:AccountId)->U128{
        let inviteleft = self.InviteNftCounts.get(&account_id).unwrap_or_else(||0);
        return U128::from(inviteleft);
    }

    fn internal_mint(&mut self, token_id :String, token_owner_id : ValidAccountId, token_metadata:Option<TokenMetadata>) ->Token{
        let initial_storage_usage = env::storage_usage();
        // self.tokens.mint()
        if self.tokens.token_metadata_by_id.is_some() && token_metadata.is_none() {
            env::panic(b"Must provide metadata");
        }
        if self.tokens.owner_by_id.get(&token_id).is_some() {
            env::panic(b"token_id must be unique");
        }

        let owner_id: AccountId = token_owner_id.into();

        // Core behavior: every token must have an owner
        self.tokens.owner_by_id.insert(&token_id, &owner_id);

        // Metadata extension: Save metadata, keep variable around to return later.
        // Note that check above already panicked if metadata extension in use but no metadata
        // provided to call.
        self.tokens.token_metadata_by_id
            .as_mut()
            .and_then(|by_id| by_id.insert(&token_id, &token_metadata.as_ref().unwrap()));

        log!("inserted here");
        // Enumeration extension: Record tokens_per_owner for use with enumeration view methods.
        if let Some(tokens_per_owner) = &mut self.tokens.tokens_per_owner {
            let mut token_ids = tokens_per_owner.get(&owner_id).unwrap_or_else(|| {
                UnorderedSet::new(StorageKey::TokensPerOwner {
                    account_hash: env::sha256(owner_id.as_bytes()),
                })
            });
            token_ids.insert(&token_id);
            tokens_per_owner.insert(&owner_id, &token_ids);
        }

        // Approval Management extension: return empty HashMap as part of Token
        let approved_account_ids =
            if self.tokens.approvals_by_id.is_some() { Some(HashMap::new()) } else { None };


        Token { token_id, owner_id, metadata: token_metadata, approved_account_ids }
    }
}


near_contract_standards::impl_non_fungible_token_core!(Contract, tokens);
near_contract_standards::impl_non_fungible_token_approval!(Contract, tokens);
near_contract_standards::impl_non_fungible_token_enumeration!(Contract, tokens);

#[near_bindgen]
impl NonFungibleTokenMetadataProvider for Contract {
    fn nft_metadata(&self) -> NFTContractMetadata {
        self.metadata.get().unwrap()
    }
}

