import React from 'react';
import { Grid, Button } from '@material-ui/core'
import './style.scss'
const Footer = ({ className }) => {
    return (
        <footer className={`footerArea ${className}`}>
            <p>© 2020 Azure Innovations All rights reserved</p>
        </footer>
    )
}
export default Footer;
