import { Box, FormControlLabel, makeStyles, Typography, Checkbox } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(2),
        borderTop: `1px solid ${theme.palette.grey[300]}`,
    },

    list: {
        padding: 0,
        margin: 0,
        listStyle: 'none',

        '& > li' : {
            margin: 0,
        }
    },
}));

FilterByService.propTypes = {
    filters: PropTypes.object,
    onChange: PropTypes.func,
};

function FilterByService({filters = {}, onChange}) {
    const classes = useStyles();

    const handleChange = (e) => {
        if (!onChange) return;

        const {name, checked} = e.target;
        onChange({[name] : checked}); 
    };

    return (
        <Box className={classes.root}>
            <Typography variant="subtitle2">SERVICE</Typography>

            <ul className={classes.list}>
                {[
                    {value: 'isPromotion', label: 'Promotion'}, 
                    {value: 'isFreeShip', label: 'Free Ship'}
                ].map((service) => (
                    <li key={service.value}>
                        <FormControlLabel 
                            control={
                                <Checkbox 
                                    checked={Boolean(filters[service.value])}
                                    onChange={handleChange}
                                    name={service.value}
                                    color="primary"
                                />
                            }
                            label={service.label} 
                        />
                    </li>
                ))}
            </ul>
        </Box>
    );
}

export default FilterByService;