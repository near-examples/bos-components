# Collaborative Component Template

This template enables multiple people to collaborate on [building BOS components](https://docs.near.org/bos/home) by automatically deploying the components in the `./src` folder when somebody `push` to `main`.

The template leverages [NEAR Access Keys](https://docs.near.org/concepts/basics/accounts/access-keys), using keys that allow to only access the `set` method of `social.near`. 

Fork the repository and follow the steps bellow to create the necessary Access Key, and setup your repository's Actions.

<br />

### 1. Creating a New Access Key

Using [NEAR CLI](https://github.com/near/near-cli), create a key pair.

```bash
# Set the environment to mainnet
export NEAR_ENV=mainnet

# Create the key
near generate-key rndm-key

# Check it
cat ~/.near-credentials/mainnet/rndm-key.json
```

<br />

### 2. Add an Access Key to your Account
Add the public key as an Access Key to your account, making sure that it is a [`function call key`](https://docs.near.org/concepts/basics/accounts/access-keys#function-call-keys)  (in opposition to a [`full access key`](https://docs.near.org/concepts/basics/accounts/access-keys#full-access-keys)).

Here is how you can add the key to `account.near`. Notice the `--contract-id` parameter, this is what restricts our key to interact only with `social.near`.

```bash
# Add a function call key with a 1N allowance
near add-key account.near ed25519:public_key --contract-id social.near --allowance 1 --method-names set
```

> Login first if necessary using the command `near login` 
> Remember to change `account.near` to your own NEAR Account

<br />

### 3. Allow the Access Key to Write Components in `social.near`
For security reasons, `social.near` needs you to explicitly add the keys with which you plan to write social information. Otherwise, anyone with an access key would be able to write data to your social profile.

```bash
near call social.near grant_write_permission '{"public_key": "ed25519:public_key", "keys": ["account.near/widget"]}' --gas 100000000000000 --deposit 1 --accountId account.near
```

> Remember to change `account.near` to your own NEAR Account

<br />

### 4. Set Actions' Variables
This repository comes with a [predefined action](.github/workflows/deploy-prod.yml), when you push to main the repository will automatically deploy the `components` in `./src` to a NEAR account.

In order for the action to work, you will need to go to `Settings` -> `Secrets and Variables` and add the following parameters:

```js
secret NEAR_SOCIAL_ACCOUNT_PRIVATE_KEY = "ed25519:private_key"
variable NEAR_SOCIAL_ACCOUNT_ID = "account.near"
variable NEAR_SOCIAL_ACCOUNT_PUBLIC_KEY = "ed25519:public_key"
```

> Remember to change `account.near` to your own NEAR Account

<br />

### 5. Enable Actions
Go to the `Actions` tabs, and enable the Workflows. Now, when somebody `push` or `merge` into `main` the components in the `./src` folder will be automatically deployed to `account.near`.

<br />

---

## External Resources

Check these useful resources to help you build NEAR components.

- [How to Build BOS Components](https://docs.near.org/bos/home)
- [BOS VS Extension](https://marketplace.visualstudio.com/items?itemName=near-protocol.near-discovery-ide)
- [Working Example](https://github.com/near-examples/bos-commerce-components)
