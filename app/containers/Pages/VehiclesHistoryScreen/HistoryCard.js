import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Grid } from '@material-ui/core';
import Card from '../../../components/Card';
import './style.scss';

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
var days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const HistoryCard = (props) => {
  let date = new Date(props.item.assignedAt / 1000000);
  let unassignDate = new Date(props.item.unAssignedAt / 1000000);
  let assignedAtDate = days[date.getDay()] + " " + months[date.getMonth()] + " " +date.getDate()+ " "+date.getFullYear()+ " "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();
  let unassignedDate = days[unassignDate.getDay()] + " " + months[unassignDate.getMonth()] + " " +unassignDate.getDate()+ " "+unassignDate.getFullYear()+ " "+unassignDate.getHours()+":"+unassignDate.getMinutes()+":"+unassignDate.getSeconds();
  return (
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
                  {assignedAtDate}
                </strong>
              </TableCell>
              <TableCell>
                <strong className="uThum">
                {unassignedDate}
                </strong>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Grid>
    </Card>
  )
}
export default HistoryCard;