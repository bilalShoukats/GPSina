import React, { Fragment } from 'react';
import { Button, Dialog, Grid, Slide } from '@material-ui/core'

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const TransitionModal = () => {
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
                className='btn bg-info'
                onClick={handleClickOpen}>
                Open Transition Modal
            </Button>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                className="modalWrapper"
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
export default TransitionModal