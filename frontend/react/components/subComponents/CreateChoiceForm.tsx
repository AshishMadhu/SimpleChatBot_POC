import React, { Component } from 'react';
import ChoiceTags from './ChoiceTags';

class CreateChoiceForm extends Component {
    render() {
        return (
            <div className="col-md-5">
                <ChoiceTags messageId = {null} setState={null}/>
            </div>
        );
    }
}

export default CreateChoiceForm;