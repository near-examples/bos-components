# Collaborative Component Template

NEAR allows to build composable application using [components](https://docs.near.org/bos/home).

This template guides you on setting an automatic flow, so multiple people can collaborate and automatically deploy components to a specific account.

## Setup

To keep the whole process secure, we will leverage [NEAR Access Keys](https://docs.near.org/concepts/basics/accounts/access-keys), creating a key that can only be used to interact with `social.near`.

### 1. Creating a New Access Key

Using [NEAR CLI](https://github.com/near/near-cli), create a new access key for your account.

```bash
# Set the environment to mainnet
export NEAR_ENV=mainnet

# Create the key
near generate-key rndm-key

# Check it
cat ~/.near-credentials/mainnet/rndm-key.json
```

### 2. Add the Access Key to your Account
Add the public key to your account, making sure that it is a [`function call key`](https://docs.near.org/concepts/basics/accounts/access-keys#function-call-keys)  (in opposition to a [`full access key`](https://docs.near.org/concepts/basics/accounts/access-keys#full-access-keys)).

Here is how you can add the key to `account.near`. Notice the `--contract-id` parameter, this is what restricts our key to interact only with `social.near`.

```bash
# Add a function call key with a 1N allowance
near add-key account.near ed25519:public_key --contract-id social.near --allowance 1
```

> Login first if necessary using the command `near login` 
> Remember to change `account.near` to your own NEAR Account

### 3. Allow the Access Key to Write Components in `social.near`
For security reasons, `social.near` needs you to explicitly add the keys with which you plan to write social information. Otherwise, anyone with an access key would be able to write data to your social profile.

```bash
near call social.near grant_write_permission '{"public_key": "ed25519:public_key", "keys": ["account.near/widget"]}' --gas 100000000000000 --deposit 1 --accountId account.near
```

> Remember to change `account.near` to your own NEAR Account

### 4. Set Actions' Variables
This repository comes with a [predefined action](.github/workflows/deploy-prod.yml), when you push to main the repository will automatically deploy the `components` in `./src` to a NEAR account.

In order for the action to work, you will need to go to `Settings` -> `Secrets and Variables` and add the following parameters:

```js
secret NEAR_SOCIAL_ACCOUNT_PRIVATE_KEY = "ed25519:private_key"
variable NEAR_SOCIAL_ACCOUNT_ID = "account.near"
variable NEAR_SOCIAL_ACCOUNT_PUBLIC_KEY = "ed25519:public_key"
```

> Remember to change `account.near` to your own NEAR Account