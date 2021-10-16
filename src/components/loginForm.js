import React, { Component } from 'react';

import Input from './Input';
import Button from './Button';

const LoginForm = () => {
    return (
        <form>
            <div>
                <label>Username: </label>
                <Input className='username' />
            </div>
            <div>
                <label>Password: </label>
                <Input className='password' />
            </div>
            <div>
                <Button className='button' />
            </div>
        </form>
    )
}

export default loginForm;


