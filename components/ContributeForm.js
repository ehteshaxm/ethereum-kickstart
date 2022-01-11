import React, { useState } from 'react';
import { Button, Form, Input, Message } from 'semantic-ui-react';
import Campaign from '../ethereum/campaign';
import web3 from '../ethereum/web3';
import { Router } from '../routes';

const ContributeForm = ({ address }) => {
  const [ether, setEther] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();

    setLoading(true);
    setErrorMessage('');

    const campaign = Campaign(address);
    try {
      const accounts = await web3.eth.getAccounts();
      await campaign.methods.contribute().send({
        from: accounts[0],
        value: web3.utils.toWei(ether, 'ether'),
      });
      Router.replaceRoute(`/campaigns/${address}`);
    } catch (error) {
      setErrorMessage(error.message);
    }
    setLoading(false);
  }

  return (
    <Form onSubmit={onSubmit} error={errorMessage}>
      <Form.Field>
        <label>Amount to Contribute</label>
        <Input
          label='ether'
          labelPosition='right'
          value={ether}
          onChange={(e) => setEther(e.target.value)}
        />
      </Form.Field>
      <Message error header='Oops!' content={errorMessage} />
      <Button primary loading={loading}>
        Contribute
      </Button>
    </Form>
  );
};

export default ContributeForm;
