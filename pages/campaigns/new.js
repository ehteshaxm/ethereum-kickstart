import React, { useState } from "react";
import "semantic-ui-css/semantic.min.css";
import { Button, Form, Input, Message } from "semantic-ui-react";
import Layout from "../../components/Layout";
import factory from "../../ethereum/factory";
import web3 from "../../ethereum/web3";
import { Router } from "../../routes";

const campaignNew = () => {
  const [minimumContribution, setMinimumContribution] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    try {
      const accounts = await web3.eth.getAccounts();
      await factory.methods.createCampaign(minimumContribution).send({
        from: accounts[0],
      });
      Router.pushRoute("/");
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  };

  return (
    <Layout>
      <h3>New Campaign</h3>
      <Form onSubmit={submitHandler} error={error}>
        <Form.Field>
          <label>Minimum Contribution</label>
          <Input
            label="wei"
            labelPosition="right"
            value={minimumContribution}
            onChange={(e) => setMinimumContribution(e.target.value)}
          />
        </Form.Field>
        <Message error header="Oops!" content={error} />
        <Button loading={loading} primary>
          Create
        </Button>
      </Form>
    </Layout>
  );
};

export default campaignNew;
