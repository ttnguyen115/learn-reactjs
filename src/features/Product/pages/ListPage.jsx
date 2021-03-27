import { Box, Container, Grid, makeStyles, Paper } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import productApi from '../../../api/productApi';
import ProductList from '../components/ProductList';
import ProductSkeletonList from '../components/ProductSkeletonList';
import { Pagination } from '@material-ui/lab';

ListPage.propTypes = {};


const useStyles = makeStyles(theme => ({
    root: {
        
    },

    left: {
        width: '250px',
    },

    right: {
        flex: '1 1 0',
    },

    
}));

function ListPage(props) {
    const classes = useStyles(); 
    const [productList, setProductList] = useState([]);
    const [pagination, setPagination] = useState({
        limit: 9,
        total: 10,
        page: 1,
    });
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        _page: 1,
        _limit: 9,
    });
    

    useEffect(() => {
        (async () => {
            try {
                const {data, pagination} = await productApi.getAll(filters); 
                setProductList(data);
                setPagination(pagination); 
                console.log({data, pagination});
            } catch (error) {
                console.log('Failed to fetch product list: ', error);
            }

            setLoading(false);

        })();
    }, [filters]);

    const handlePageChange = (e, page) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            _page: page,
        }))
    };

    return (
        <Box> 
            <Container>
                <Grid container spacing={1} >
                    <Grid item className={classes.left} >
                        <Paper elevation={0} >Left column</Paper>
                    </Grid>
                    
                    <Grid item className={classes.right} >
                        <Paper elevation={0} >
                            {loading ? <ProductSkeletonList /> : <ProductList data={productList} />}
                        </Paper>

                        <Pagination 
                            color="primary" 
                            count={Math.ceil(pagination.total / pagination.limit)} 
                            page={pagination.page}
                            onChange={handlePageChange}
                        ></Pagination>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}

export default ListPage;