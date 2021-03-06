import React, { useEffect, useState } from 'react';
import 'semantic-ui-css/semantic.min.css';
import factory from '../ethereum/factory';
import { Card, Button } from 'semantic-ui-react';
import Layout from '../components/Layout';
import { Link } from '../routes';

const index = ({ campaigns }) => {
  const renderCampaigns = () => {
    const items = campaigns.map((address) => {
      return {
        header: address,
        description: (
          <Link route={`/campaigns/${address}`}>
            <a>View Campaign</a>
          </Link>
        ),
        fluid: true,
      };
    });

    return <Card.Group items={items} />;
  };

  return (
    <Layout>
      <h3>Open Campaigns</h3>
      <Link route='campaigns/new'>
        <a>
          <Button
            floated='right'
            content='Create Campaign'
            icon='add circle'
            primary
          />
        </a>
      </Link>
      {renderCampaigns()}{' '}
    </Layout>
  );
};

index.getInitialProps = async () => {
  const campaigns = await factory.methods.getDeployedCampaigns().call();
  return { campaigns: campaigns };
};

export default index;
