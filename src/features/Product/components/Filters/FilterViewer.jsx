import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Box, makeStyles, Chip } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexFlow: 'row nowrap',
        alignItems: 'center',

        padding: 0,
        listStyle: 'none',
        margin: theme.spacing(2, 0),

        '& > li': {
            padding: theme.spacing(1),
            margin: 0,
        },
    },

    list: {

    },
}));

const FILTER_LIST = [
    {
        id: 1,
        getLabel: () => 'Free Ship',
        isActive: filters => filters.isFreeShip,
        isVisible: () => true,
        isRemovable: false,
        onRemove: () => {},
        onToggle: filters => {
            const newFilters = {...filters};

            if (filters.isFreeShip) {
                delete newFilters.isFreeShip;
            } else {
                newFilters.isFreeShip = true;
            }

            return newFilters;
        },
    },

    {
        id: 2,
        getLabel: () => 'Promotion',
        isActive: () => true,
        isVisible: filters => filters.isPromotion,
        isRemovable: true,
        onRemove: filters => {
            const newFilters = {...filters};
            delete newFilters.isPromotion;
            return newFilters;
        },
        onToggle: () => {},
    },

    {
        id: 3,
        getLabel: filters => `From ${filters.salePrice_gte} to ${filters.salePrice_lte}`,
        isActive: () => true,
        isVisible: filters => 
            Object.keys(filters).includes('salePrice_lte') && Object.keys(filters).includes('salePrice_gte'),
        isRemovable: true,
        onRemove: filters => {
            const newFilters = {...filters};
            delete newFilters.salePrice_lte;
            delete newFilters.salePrice_gte;
            return newFilters;
        },
        onToggle: () => {},
    },

    // {
    //     id: 4,
    //     getLabel: filters => 'Category',
    //     isActive: () => true,
    //     isVisible: filters => true,
    //     isRemovable: true,
    //     onRemove: filters => {},
    //     onToggle: filters => {},
    // },


]

FilterViewer.propTypes = {
    filters: PropTypes.object,
    onChange: PropTypes.func,
};

function FilterViewer({filters = {}, onChange = null}) {
    const classes = useStyles(); 

    const visibleFilters = useMemo(() => {
        return FILTER_LIST.filter(x => x.isVisible(filters));
    }, [filters]);

    return (
        <Box component="ul" className={classes.root}>
            {visibleFilters.map(x => (
                <li key={x.id}>
                    <Chip 
                        size="small"
                        label={x.getLabel(filters)}
                        color={x.isActive(filters) ? "primary" : "default"}
                        clickable={!x.isRemovable}
                        onClick={x.isRemovable ? null : () => {
                            if (!onChange) return;

                            const newFilters = x.onToggle(filters);
                            onChange(newFilters);
                        }}
                        onDelete={x.isRemovable ? () => {
                            if (!onChange) return;

                            const newFilters = x.onRemove (filters);
                            onChange(newFilters); 
                        } : null}

                    />
                </li>    
            ))}
        </Box>
    );
}

export default FilterViewer;