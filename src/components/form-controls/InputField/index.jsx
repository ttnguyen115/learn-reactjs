import React from 'react';
import { TextField } from '@material-ui/core';
import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';

InputField.propTypes = {
    form: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,
    
    label: PropTypes.string,
    disabled: PropTypes.bool,
};

function InputField(props) {
    const {form, name, label, disabled} = props;
    const {errors} = form;
    const hasError = errors[name];

    return (
        <Controller 
            name={name} 
            control={form.control} 

            render={({ onChange, onBlur, name, value }) => (
                <TextField
                    margin="normal"
                    variant="outlined"
                    fullWidth 
                    label={label} 
                    disabled={disabled} 
        
                    // Error message (Material UI)
                    error={!!hasError}
                    helperText={errors[name]?.message}    

                    // Handle actions
                    onChange={onChange}
                    onBlur={onBlur}
                    name={name}
                    value={value}
                />
            )}
        />
    );
}

export default InputField;