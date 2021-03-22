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

RegisterForm.propTypes = {
    onSubmit: PropTypes.func,
};

function RegisterForm(props) {
    const classes = useStyles();

    const schema = yup.object().shape({
        fullName: yup.string().required('Please enter your full name! '),

        email: yup.string().email('The email is not correct!')
            .required('Please enter your email!'),

        password: yup.string().required('Please enter the password! ')
            .min(6,'The password must contain at least 8 characters!')
            .matches(/[a-zA-Z]/, 'Password can only contain Latin letters!'),

        retypePassword: yup.string().required('Please retype the password! ')
            .oneOf([yup.ref('password'), null], 'Passwords must match!'),
    });
    
    const form = useForm({
        defaultValues: {
            fullName: '',
            email: '',
            password: '',
            retypePassword: '',
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
                Create An Account
            </Typography>

            <form onSubmit={form.handleSubmit(handleSubmit)}>
                <InputField name="fullName" label="Full Name" form={form} />
                <InputField name="email" label="Email" form={form} />
                <PasswordField name="password" label="Password" form={form} />
                <PasswordField name="retypePassword" label="Re-type Password" form={form} />

                <Button
                    disabled={isSubmitting}
                    type="submit"
                    variant="contained" 
                    color="primary" 
                    className={classes.submit} 
                    fullWidth
                    size="large"
                >
                    Create an account
                </Button>
            </form>
 
        </div>
    );
}

export default RegisterForm;