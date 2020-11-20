import React, { Component } from 'react';

type Props = {
    err: string
}

class ShowError extends Component<Props> {

    constructor(props:Props) {
        super(props);
    }

    render() {
        return (
            <div className="alert alert-danger">
                {this.props.err}
            </div>
        );
    }
}

export default ShowError;