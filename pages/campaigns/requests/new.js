import React, { useState } from 'react';
import 'semantic-ui-css/semantic.min.css';
import { Form, Input, Button, Message } from 'semantic-ui-react';
import Layout from '../../../components/Layout';
import Campaign from '../../../ethereum/campaign';
import web3 from '../../../ethereum/web3';
import { Router, Link } from '../../../routes';

const RequestNew = ({ address }) => {
  const [value, setValue] = useState('');
  const [description, setDescription] = useState('');
  const [recipient, setRecipient] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function submitHandler() {
    const campaign = Campaign(address);
    setLoading(true);
    setError('');
    try {
      const accounts = await web3.eth.getAccounts();
      await campaign.methods
        .createRequest(description, web3.utils.toWei(value, 'ether'), recipient)
        .send({
          from: accounts[0],
        });
      Router.pushRoute(`/campaigns/${address}/requests`);
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  }

  return (
    <Layout>
      <Link route={`/campaigns/${address}/requests`}>
        <a>Back</a>
      </Link>
      <h3>Create a Request</h3>
      <Form onSubmit={submitHandler} error={error}>
        <Form.Field>
          <label>Description</label>
          <Input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <label>Value in Ether</label>
          <Input
            label='ether'
            labelPosition='right'
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <label>Recipient</label>
          <Input
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
          />
        </Form.Field>
        <Message error header='Oops!' content={error} />
        <Button primary loading={loading}>
          Create
        </Button>
      </Form>
    </Layout>
  );
};

RequestNew.getInitialProps = async (props) => {
  const address = props.query.address;

  return {
    address: address,
  };
};

export default RequestNew;
