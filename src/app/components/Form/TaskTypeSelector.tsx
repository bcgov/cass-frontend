import * as React from 'react';
import { default as FormFieldWrapper, FormFieldWrapperProps } from './FormFieldWrapper';
import { FormControl } from 'react-bootstrap';


export default class TaskTypeSelector extends React.PureComponent<FormFieldWrapperProps>{
    render(){
        const { input:{value, onChange}, label} = this.props;
        return (
            <FormFieldWrapper {...this.props}>
                <FormControl componentClass="select" value={value} onChange={onChange}>
                    <option value="No task type selected">{`Select ${label}`}</option>
                    <option value="Court Security">Court Security</option>
                    <option value="Escort Services">Escort Services</option>
                    <option value="Document Services">Document Services</option>
                </FormControl>
            </FormFieldWrapper>
        );
    }
}