import { useEthers } from '@usedapp/core';
import helperConfig from '../helper-config.json';
import networkMapping from '../chain-info/deployments/map.json';
import { constants } from 'ethers';
import brownieConfig from '../brownie-config.json';
import dapp from '../dapp.png';
import eth from '../eth.png';
import dai from '../dai.png';
import { YourWallet } from './yourWallet/YourWallet';

export type Token = {
  image: string;
  address: string;
  name: string;
};

export const Main = () => {
  // Show token values from the wallet
  // Get the address of different tokens
  // Get the balance of the users wallet

  // Send the brownie-config to our 'src' folder
  // Send the build folder

  const { chainId, error } = useEthers();
  const networkName = chainId ? helperConfig[chainId] : 'dev';
  console.log(chainId);
  console.log(networkName);
  let stringChainId = String(chainId);
  const dappaTokenAddress = chainId
    ? networkMapping[stringChainId]['DappToken'][0]
    : constants.AddressZero;
  const wethTokenAddress = chainId
    ? brownieConfig['networks'][networkName]['weth_token']
    : constants.AddressZero;
  const fauTokenAddress = chainId
    ? brownieConfig['networks'][networkName]['fau_token']
    : constants.AddressZero;

  const supportedTokens: Array<Token> = [
    {
      image: dapp,
      address: dappaTokenAddress,
      name: 'DAPP',
    },
    {
      image: eth,
      address: wethTokenAddress,
      name: 'WETH',
    },
    {
      image: dai,
      address: fauTokenAddress,
      name: 'DAI',
    },
  ];

  return <YourWallet supportedTokens={supportedTokens} />;
};
