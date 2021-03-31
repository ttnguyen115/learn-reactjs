import { Box, Paper } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import DOMPurify from 'dompurify';

ProductDescription.propTypes = {
    product: PropTypes.object,
};

function ProductDescription({product = {}}) {
    const safeDescription = DOMPurify.sanitize(product.description)

    return (
        <Paper elevation={0} style={{ padding: '15px' }}>
            <Box dangerouslySetInnerHTML={{__html: safeDescription}}></Box>
        </Paper>
    );
}

export default ProductDescription;