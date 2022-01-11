const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const compiledFactory = require('./build/CampaignFactory.json');

const provider = new HDWalletProvider({
  mnemonic: {
    phrase:
      'giggle fruit trophy hip fee clinic fall horse strong situate next eyebrow',
  },
  providerOrUrl:
    'https://rinkeby.infura.io/v3/9b7f644063e24a29b636700bb9b84f0a',
});

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();
  console.log('Attempting to deploy from account', accounts[0]);

  const result = await new web3.eth.Contract(compiledFactory.abi)
    .deploy({ data: '0x' + compiledFactory.evm.bytecode.object })
    .send({ from: accounts[0], gas: '1500000' });

  console.log('Contract deployed to', result.options.address);
  provider.engine.stop();
};

// 0x3fbe2846b69563ea76faf6eeef371721d327a117;
// 0x9E81Db83eE7598cFCA1dB0dBBa2654374a622C7d;

deploy();
