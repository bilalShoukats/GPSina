import React, { Fragment } from 'react';
import { Button, Dialog, Grid, Paper } from '@material-ui/core'
import Draggable from 'react-draggable';

function PaperComponent(props) {
    return (
        <Draggable cancel={'[class*="MuiDialogContent-root"]'}>
            <Paper {...props} />
        </Draggable>
    );
}

const DraggableModal = () => {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Fragment>
            <Button
                className='btn bg-success'
                onClick={handleClickOpen}
            >
                Open form dialog
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                PaperComponent={PaperComponent}
                className="modalWrapper"
                aria-labelledby="draggable-dialog-title"
            >
                <Grid style={{ cursor: 'move' }} className="modalTitle">
                    <h3>Dragable Modal</h3>
                </Grid>
                <Grid className="modalBody">
                    <p>Let Google help apps determine location. This means sending anonymous location data to
                        Google, even when no apps are running.</p>
                </Grid>
                <Grid className="modalFooter">
                    <Button className="bg-warning" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button className="bg-success" onClick={handleClose}>
                        Agree
                    </Button>
                </Grid>
            </Dialog>
        </Fragment>
    );
}
export default DraggableModal