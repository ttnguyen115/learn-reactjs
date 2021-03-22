import React from 'react';
import RegisterForm from '../RegisterForm';
import { useDispatch } from 'react-redux';
import { register } from '../../userSlice';
import { unwrapResult } from '@reduxjs/toolkit';

Register.propTypes = {};

function Register(props) {
    const dispatch = useDispatch();

    const handleSubmit = async (values) => {
        try {
            console.log('Form Submit: ', values);
            const action = register(values);
            const resultAction = await dispatch(register);
            const user = unwrapResult(resultAction);
            console.log('new user: ', user);

        } catch (error) {
            console.log('Failed to register: ', error);
        }
    }

    return (
        <div>
            <RegisterForm onSubmit={handleSubmit} />
        </div>
    );
}

export default Register;