import { useContractFunction, useEthers } from '@usedapp/core';
import { constants, utils } from 'ethers';
import TokenFarm from '../chain-info/contracts/TokenFarm.json';
import ERC20 from '../chain-info/contracts/MockERC20.json';
import { Contract } from '@ethersproject/contracts';
import networkMapping from '../chain-info/deployments/map.json';
import { useEffect, useState } from 'react';

export const useStakeTokens = (tokenAddress: string) => {
  const { chainId } = useEthers();
  const { abi } = TokenFarm;
  const tokenFarmAddress = chainId
    ? networkMapping[String(chainId)]['TokenFarm'][0]
    : constants.AddressZero;
  const tokenFarmInterface = new utils.Interface(abi);
  const tokenFarmContract = new Contract(tokenFarmAddress, tokenFarmInterface);

  const erc20ABI = ERC20.abi;
  const erc20Interface = new utils.Interface(erc20ABI);
  const erc20Contract = new Contract(tokenAddress, erc20Interface);
  // approve
  const { send: approveErc20Send, state: approveErc20State } =
    useContractFunction(erc20Contract, 'approve', {
      transactionName: 'Approve ERC20 transfer',
    });
  const approveAndStake = (amount: string) => {
    setAmountToStake(amount);
    return approveErc20Send(tokenFarmAddress, amount);
  };

  const { send: stakeSend, state: stakeState } = useContractFunction(
    tokenFarmContract,
    'stakeTokens',
    { transactionName: 'Stake Tokens' }
  );

  const [amountToStake, setAmountToStake] = useState('0');

  useEffect(() => {
    if (approveErc20State.status === 'Success') {
      stakeSend(amountToStake, tokenAddress);
    }
  }, [approveErc20State]);

  return { approveAndStake, approveErc20State };
};
