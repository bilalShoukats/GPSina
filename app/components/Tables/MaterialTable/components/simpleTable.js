import React from 'react';
import { Table, TableBody, TableFooter, TableRow, TableHead, TableCell } from '@material-ui/core';
import { Grid } from '@material-ui/core'


const SimpleTable = ({ tablehead, tablebody, className }) => {
    return (
        <Grid className='tableResponsive'>
            <Table
                className={`tableWrapper ${className ? className : ''}`}>
                <TableHead>
                    <TableRow>
                        {tablehead.map(item => (
                            <TableCell key={item}>{item}</TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tablebody.map((item, i) => (
                        <TableRow key={i}>
                            <TableCell>{i + 1} </TableCell>
                            <TableCell>
                                <img className="imgAvatar" src={item.image} alt="" />
                            </TableCell>
                            <TableCell>{item.name}</TableCell>
                            <TableCell>{item.email}</TableCell>
                            <TableCell>{item.phone}</TableCell>
                            <TableCell>
                                {item.status && <span className={`badge 
                                                ${
                                    item.status === 'active' && 'badge-success' ||
                                    item.status === 'inactive' && 'badge-danger' ||
                                    item.status === 'rejected' && 'badge-danger' ||
                                    item.status === 'pending' && 'badge-warning text-warning'
                                    }
                                                `}>
                                    {item.status}
                                </span>}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Grid>
    );
}
export default SimpleTable