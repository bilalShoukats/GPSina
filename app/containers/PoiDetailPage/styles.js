import { grey } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(
    theme => (
        console.log(theme),
        {
            root: {
                flexGrow: 1,
                margin: 'auto',
                maxWidth: '1000px',
                marginTop: '1em',
                padding: '0 2em',
                paddingBottom: '2em',
            },
            container: {
                marginTop: '1em',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
            },
            label: {
                textTransform: 'capitalize',
            },
            avatar: {
                marginTop: '2em',
            },
            textInput: {
                width: '100%',
                backgroundColor: 'transparent',
                color: grey[500],
                borderBottom: '3px solid' + grey[500],
                marginTop: '0.5em',
                marginBottom: '1em',
                padding: '0.2em 0.5em',
                fontSize: '14px',
                borderRadius: '0px',
            },
            title: {
                fontWeight: '500',
                margin: '1em 0 0.5em 0',
            },
            bottomContainer: {
                margin: '2em 0',
            },
            radioContainer: {
                width: 'auto',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            },
            radioGroup: {
                margin: '0 2em',
            },
            error: {
                color: 'red',
            },
        }
    ),
);

export { useStyles };
