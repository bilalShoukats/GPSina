import React, { Component } from 'react'
import { Button } from '@material-ui/core'
export default class CustomButton extends Component {
    state = {
        disabled: true
    }
    makeDisable = () => {
        this.setState({ disabled: true })
    }
    makeEnable = () => {
        this.setState({ disabled: false })
    }
    render() {
        return (
            <Button className="btn bg-default" disabled={this.state.disabled} onClick={this.props.onClick} >
                {this.props.text}
            </Button>
        )
    }
}
