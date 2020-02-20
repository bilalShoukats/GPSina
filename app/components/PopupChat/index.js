import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import { Widget, addResponseMessage } from 'react-chat-widget';
import 'react-chat-widget/lib/styles.css';
import './style.scss'

// images 
import logo from 'images/avatar.svg'
class PopupChat extends Component {
    componentDidMount() {
        addResponseMessage("Welcome to this awesome Zamps!");
    }

    handleNewUserMessage = (newMessage) => {
        addResponseMessage(response);
    }

    render() {
        return (
            <Widget
                handleNewUserMessage={this.handleNewUserMessage}
                profileAvatar={logo}
                title="My new awesome title"
                subtitle="And my cool subtitle"
            />
        )
    }
}
export default PopupChat;
