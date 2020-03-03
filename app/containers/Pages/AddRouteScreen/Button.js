import React, { Component } from 'react'
import { Button } from '@material-ui/core'
export default class CustomButton extends Component {
    state = {
        disabled: true,
        data: {},
    }
    makeDisable = () => {
        this.setState({ disabled: true })
    }
    makeEnable = (data) => {
        this.setState({ disabled: false, data: data })
    }
    render() {
        return (
            <Button className="btn bg-default" disabled={this.state.disabled} onClick={()=>this.props.onClick(this.state.data)} >
                {this.props.text}
            </Button>
        )
    }
}
