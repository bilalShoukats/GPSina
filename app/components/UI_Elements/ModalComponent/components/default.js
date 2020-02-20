import React, { Fragment } from 'react';
import { Button, Dialog, Grid, } from '@material-ui/core'

const DefaultModal = ({ maxWidth, button, buttonClass }) => {
    const [open, setOpen] = React.useState(false);

    function handleClickOpen() {
        setOpen(true);
    }

    function handleClose() {
        setOpen(false);
    }

    return (
        <Fragment>
            <Button
                className={`btn ${buttonClass}`}
                onClick={handleClickOpen}>
                {button}
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                className="modalWrapper"
                maxWidth={maxWidth}
            >
                <Grid className="modalTitle">
                    <h3>Use Google's location service?</h3>
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
export default DefaultModal