import React from 'react';
import PropTypes from 'prop-types';
import InputField from '../../../../components/form-controls/InputField';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { Avatar, Typography, makeStyles, Button, LinearProgress } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'; 
import PasswordField from '../../../../components/form-controls/PasswordField';

const useStyles = makeStyles(theme => ({
    root: {
        position: 'relative',
        paddingTop: theme.spacing(4), // theme.spacing(1) = 8px;
    } ,
    
    avatar: {
        margin: '0 auto',
        backgroundColor: theme.palette.secondary.main, 
    },

    title: {
        textAlign: 'center',
        margin: theme.spacing(2, 0, 3, 0),
    },

    submit: {
        margin: theme.spacing(3, 0, 2),
    },

    progress: {
        position: 'absolute',
        top: theme.spacing(1),
        left: 0,
        right: 0,
    }
}));

LoginForm.propTypes = {
    onSubmit: PropTypes.func,
};

function LoginForm(props) {
    const classes = useStyles();

    const schema = yup.object().shape({
        identifier: yup.string().email('The email is not correct!')
            .required('Please enter your email!'),

        password: yup.string().required('Please enter the password! ')
            .matches(/[a-zA-Z]/, 'Password can only contain Latin letters!'),
    });
    
    const form = useForm({
        defaultValues: {
            identifier: '',
            password: '',
        }, 

        resolver: yupResolver(schema),
    });

    const handleSubmit = async (values) => {
        const {onSubmit} = props;
        if (onSubmit) {
            await onSubmit(values); 
        }
    };

    const {isSubmitting} = form.formState;

    return (
        <div className={classes.root}>
            {isSubmitting && <LinearProgress className={classes.progress} />}

            <Avatar className={classes.avatar}>
                <LockOutlinedIcon></LockOutlinedIcon>
            </Avatar>

            <Typography component="h3" variant="h5" className={classes.title}>
                Sign In
            </Typography>

            <form onSubmit={form.handleSubmit(handleSubmit)}>
                <InputField name="identifier" label="Email" form={form} />
                <PasswordField name="password" label="Password" form={form} />

                <Button
                    disabled={isSubmitting}
                    type="submit"
                    variant="contained" 
                    color="primary" 
                    className={classes.submit} 
                    fullWidth
                    size="large"
                >
                    Sign In
                </Button>
            </form>
 
        </div>
    );
}

export default LoginForm;