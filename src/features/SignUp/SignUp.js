import React, { Fragment } from "react";
import { Button, Form, Label, FormGroup, Input } from 'reactstrap';
import '../SignUp/SignUp.css';

export default function SignUp() {
    return (
        <Fragment>
            <Form className="login-form">
                <h2 className="text-center">Vaccine Maneger</h2>
                <h3 className="text-center">Sign Up</h3>
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
                    Sign Up
                </Button>
                <div className="text-center">
                    <a href="/signup">Log in </a>
                </div>
            </Form>
        </Fragment >
    );

}