import React from 'react';
import { Table, Button } from 'semantic-ui-react';
import web3 from '../ethereum/web3';
import Campaign from '../ethereum/campaign';
import { Router } from '../routes';
import Routes from 'next-routes-extended';

const RequestRow = ({ id, request, address, approversCount }) => {
  const { Row, Cell } = Table;

  const readtToFinalize = request.approvalCount > approversCount / 2;

  async function approveHandler() {
    const campaign = Campaign(address);
    const accounts = await web3.eth.getAccounts();
    await campaign.methods.approveRequest(id).send({
      from: accounts[0],
    });
  }

  async function finalizeHandler() {
    const campaign = Campaign(address);
    const accounts = await web3.eth.getAccounts();
    await campaign.methods.finalizeRequest(id).send({
      from: accounts[0],
    });
  }

  return (
    <Row
      disabled={request.complete}
      positive={readtToFinalize && !request.complete}
    >
      <Cell>{id}</Cell>
      <Cell>{request.description}</Cell>
      <Cell>{web3.utils.fromWei(request.value, 'ether')} ether</Cell>
      <Cell>{request.recipient}</Cell>
      <Cell>
        {request.approvalCount}/{approversCount}
      </Cell>
      <Cell>
        {request.complete ? null : (
          <Button color='green' basic onClick={approveHandler}>
            Approve
          </Button>
        )}
      </Cell>
      <Cell>
        {request.complete ? null : (
          <Button color='teal' basic onClick={finalizeHandler}>
            Finalize
          </Button>
        )}
      </Cell>
    </Row>
  );
};

export default RequestRow;
