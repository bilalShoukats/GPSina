import React, { Fragment } from 'react';
import { Grid, LinearProgress } from '@material-ui/core';;
const LinearIndeterminate = () => {
    const [completed, setCompleted] = React.useState(0);
    React.useEffect(() => {
        function progress() {
            setCompleted(oldCompleted => {
                if (oldCompleted === 100) {
                    return 0;
                }
                const diff = Math.random() * 10;
                return Math.min(oldCompleted + diff, 100);
            });
        }

        const timer = setInterval(progress, 500);
        return () => {
            clearInterval(timer);
        };
    }, []);
    return (
        <Fragment>
            <Grid className="mb-16">
                <LinearProgress
                    className="progressBar"
                    classes={{
                        barColorPrimary: 'bg-default'
                    }}
                />
            </Grid>
            <Grid className="mb-16">
                <LinearProgress
                    className="progressBar"

                    classes={{
                        barColorPrimary: 'bg-success'
                    }}
                />
            </Grid>

            <Grid>
                <LinearProgress
                    variant="determinate"
                    value={completed}
                    className="progressBar"
                    classes={{
                        barColorPrimary: 'bg-primary'
                    }}
                />
            </Grid>
        </Fragment>
    );
}
export default LinearIndeterminate