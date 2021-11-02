import React, { Fragment } from 'react';
import { Button, Form, Label, FormGroup, Input } from 'reactstrap';
import '../Login/Login.css';



function Login() {
    return (
        <Fragment>
            <Form className="login-form">
                <h2 className="text-center">Vaccine Maneger</h2>
                <h3 className="text-center">Wellcome</h3>
                <FormGroup floating className="formGroup">
                    <Input
                        id="Phonenumber"
                        name="Phonenumber"
                        placeholder="Phonenumber"
                        type="string"
                        className="input"
                    />
                    <Label for="Phonenumber">
                        Phonenumber
                    </Label>
                </FormGroup>
                {' '}
                <FormGroup floating className="formGroup">
                    <Input
                        id="examplePassword"
                        name="password"
                        placeholder="Password"
                        type="password"
                        className="input"
                    />
                    <Label for="examplePassword">
                        Password
                    </Label>
                </FormGroup>
                {' '}
                <Button block className="btn-lg btn-dark btn-block">
                    Log in
                </Button>
                <div className="text-center">
                    <a href="/signup">Sign Up </a>
                </div>
            </Form>
        </Fragment >
    );

}

export default Login;