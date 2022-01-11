import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
  CampaignFactory.abi,
  '0xf7AeD3aE11Ee2DA9c086914073A4650b11aCbA38'
);

export default instance;
