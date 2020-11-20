import React, { Component } from 'react';

type Props = {
    title: string;
}

class Header extends Component<Props> {
    render() {
        return (
            <div className="chatapp-header">
                <h2>{this.props.title}</h2>
            </div>
        );
    }
}

export default Header;