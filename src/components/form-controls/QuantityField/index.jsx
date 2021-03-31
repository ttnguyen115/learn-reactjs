import { Box, FormControl, FormHelperText, IconButton, makeStyles, OutlinedInput, Typography } from '@material-ui/core';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import PropTypes from 'prop-types';
import React from 'react';
import { Controller } from 'react-hook-form';

QuantityField.propTypes = {
    form: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,
    
    label: PropTypes.string,
    disabled: PropTypes.bool,
};

const useStyles = makeStyles(theme => ({
    root: {},

    box: {
        display: 'flex',
        flexFlow: 'row nowrap',
        alignItems: 'center',
        maxWidth: '200px',
    },
}));

function QuantityField(props) {

    const classes = useStyles();
    const {form, name, label, disabled} = props;
    const {errors, setValue} = form;
    const hasError = !!errors[name];

    return (
        <FormControl error={hasError} variant="outlined" fullWidth margin="normal" size="small">
                <Typography>{label}</Typography>
                <Controller
                    name={name} 
                    control={form.control} 

                    render={({ onChange, onBlur, name, value }) => (
                        <Box className={classes.box}>
                            <IconButton onClick={() => setValue(name, Number.parseInt(value) ? Number.parseInt(value) - 1 : 1)}>
                                <RemoveCircleOutlineIcon />
                            </IconButton>
                            
                            <OutlinedInput 
                                id={name}
                                type="number"
                                disabled={disabled}
                                onChange={onChange}
                                onBlur={onBlur}
                                name={name}
                                value={value}
                            />

                            <IconButton>
                                <AddCircleOutlineIcon onClick={() => setValue(name, Number.parseInt(value) ? Number.parseInt(value) + 1 : 1)} />
                            </IconButton>
 
                        </Box>
                    )}
                />

                <FormHelperText error={!!hasError} >{errors[name]?.message}</FormHelperText>
            </FormControl>
    );
}

export default QuantityField;