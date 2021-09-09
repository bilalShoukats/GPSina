/**
 * Theme.js
 * 
 * Our applications contains 
 * 1. Base theme - this styles would be applied across both light and dark mode
 * 2. Dark theme - this styles applied when dark mode is active
 * 3. Light theme - this styles applied when light mode is active
 */

import { createTheme } from "@material-ui/core";
import { blue, blueGrey, deepOrange, green, grey, red, yellow } from "@material-ui/core/colors";

const baseTheme = createTheme({
    typography: {
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
          ].join(','),
        fontSize: 14,
    }
});

const darkTheme = createTheme({
    ...baseTheme,
    palette: {
        type: 'dark',
        primary: {
            main: blue[500],
            light: blue[200],
            dark: blue[700],
            contrastText: '#FFFFFF',
        },
        secondary: {
            main: deepOrange[500],
            light: deepOrange[200],
            dark: deepOrange[700],
            contrastText: '#FFFFFF',
        },
        info: {
            main: blueGrey[500],
            light: blueGrey[200],
            dark: blueGrey[700],
            contrastText: '#FFFFFF',
        },
        error: {
            main: red[500],
            light: red[200],
            dark: red[700],
            contrastText: '#FFFFFF',
        },
        warning: {
            main: yellow[500],
            light: yellow[200],
            dark: yellow[700],
            contrastText: '#FFFFFF',
        },
        success: {
            main: green[500],
            light: green[200],
            dark: green[700],
            contrastText: '#FFFFFF',
        },
        action: {
            disabled: grey[400]
        }
    },
});

const lightTheme = createTheme({
    ...baseTheme,
    palette: {
        type: 'light',
        primary: {
            main: blue[500],
            light: blue[200],
            dark: blue[700],
            contrastText: '#FFFFFF',
        },
        secondary: {
            main: deepOrange[500],
            light: deepOrange[200],
            dark: deepOrange[700],
            contrastText: '#FFFFFF',
        },
        info: {
            main: blueGrey[500],
            light: blueGrey[200],
            dark: blueGrey[700],
            contrastText: '#FFFFFF',
        },
        error: {
            main: red[500],
            light: red[200],
            dark: red[700],
            contrastText: '#FFFFFF',
        },
        warning: {
            main: yellow[500],
            light: yellow[200],
            dark: yellow[700],
            contrastText: '#FFFFFF',
        },
        success: {
            main: green[500],
            light: green[200],
            dark: green[700],
            contrastText: '#FFFFFF',
        },
        action: {
            disabled: grey[400]
        }
    },
});

export {
    darkTheme,
    lightTheme,
};