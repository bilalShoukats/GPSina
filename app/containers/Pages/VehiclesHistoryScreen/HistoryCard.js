import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Grid } from '@material-ui/core';
import Card from '../../../components/Card';
import './style.scss';


const HistoryCard = (props) => (
  <Card>
    <Grid className="responsiveTable">
      <Table className="postTable" aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Registration Number</TableCell>
            <TableCell>Company Email</TableCell>
            <TableCell>Driver Name</TableCell>
            <TableCell>Assigned At</TableCell>
            <TableCell>Unassigned At</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>
              <strong className="uThum">
                {props.item.registrationNo}
              </strong>
            </TableCell>
            <TableCell>
              <strong className="uThum">
                {props.item.companyEmail}
              </strong>
            </TableCell>
            <TableCell>
              <strong className="uThum">
                {props.item.driverID}
              </strong>
            </TableCell>
            <TableCell>
              <strong className="uThum">
                { Date(props.item.assignedAt).toString() }
              </strong>
            </TableCell>
            <TableCell>
              <strong className="uThum">
                { Date(props.item.unAssignedAt).toString() }
              </strong>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Grid>
  </Card>
)
export default HistoryCard;

