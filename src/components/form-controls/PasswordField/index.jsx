import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, FormHelperText } from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Controller } from 'react-hook-form';

PasswordField.propTypes = {
    form: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,
    
    label: PropTypes.string,
    disabled: PropTypes.bool,
};

function PasswordField(props) {
    const [showPassword, setShowPassword] = useState(false);
    
    const toggleShowPassword = () => {
        setShowPassword(x => !x);
    };

    const {form, name, label, disabled} = props;
    const {errors} = form;
    const hasError = !!errors[name];

    return (
        <FormControl error={hasError} variant="outlined" fullWidth margin="normal">
                <InputLabel htmlFor={name}>{label}</InputLabel>
                <Controller
                    name={name} 
                    control={form.control} 
                    as={OutlinedInput} 

                    id={name}
                    type={showPassword ? 'text' : 'password'}
                    label={label}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton aria-label="toggle password visibility" onClick={toggleShowPassword}> 
                                {showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        </InputAdornment>
                    }
                    disabled={disabled} 
                />

                <FormHelperText error={!!hasError} >{errors[name]?.message}</FormHelperText>
            </FormControl>
    );
}

export default PasswordField;