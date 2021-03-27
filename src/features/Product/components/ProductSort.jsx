import React from 'react';
import PropTypes from 'prop-types';
import { Tabs, Tab } from '@material-ui/core';

ProductSort.propTypes = {
    currentSort: PropTypes.string.isRequired,
    onChange: PropTypes.func,
};

function ProductSort({currentSort, onChange}) {

    const handleSortChange = (e, newValue) => {
        if (onChange) onChange(newValue);
    }

    return (
        <Tabs
            value={currentSort}
            indicatorColor="primary"
            textColor="primary"
            onChange={handleSortChange}
            aria-label="disabled tabs example"
        >
            <Tab label="Free Ship" value="isFreeShip "></Tab>
            <Tab label="Lowest" value="salePrice:ASC"></Tab>
            <Tab label="Highest" value="salePrice:DESC"></Tab>
            <Tab label="Latest" value="updated_at:DESC"></Tab>
        </Tabs>
    );
}

export default ProductSort;