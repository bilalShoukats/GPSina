import React, { Fragment } from 'react';
import { Button, Dialog, Grid, DialogContent, DialogContentText } from '@material-ui/core'


const ScrollModal = () => {
    const [open, setOpen] = React.useState(false);
    const [scroll, setScroll] = React.useState('paper');

    const handleClickOpen = scrollType => () => {
        setOpen(true);
        setScroll(scrollType);
    };

    function handleClose() {
        setOpen(false);
    }

    return (
        <Fragment>
            <Button className='btn bg-default modalB mr-10' onClick={handleClickOpen('paper')}>scroll=paper</Button>
            <Button className='btn bg-secondary modalB' onClick={handleClickOpen('body')}>scroll=body</Button>
            <Dialog
                open={open}
                onClose={handleClose}
                scroll={scroll}
                className="modalWrapper"
            >
                <Grid className="modalTitle">
                    <h3>Use Google's location service?</h3>
                </Grid>
                <DialogContent dividers={scroll === 'paper'}>
                    <DialogContentText>
                        {[...new Array(50)]
                            .map(
                                () => `Cras mattis consectetur purus sit amet fermentum.
Cras justo odio, dapibus ac facilisis in, egestas eget quam.
Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`,
                            )
                            .join('\n')}
                    </DialogContentText>
                </DialogContent>
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
export default ScrollModal