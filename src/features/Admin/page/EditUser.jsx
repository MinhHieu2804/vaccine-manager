import React from 'react'
import './edituser.css';
import { Form, FormGroup, Label, Input } from 'reactstrap';

export default function EditUser() {
    return (
        <div className="editUser">
            <h1>Edit User</h1>
            <div className="editorWrapper">
                <Form>
                    <FormGroup>
                        <Label for="exampleEmail">
                            Email
                        </Label>
                        <Input
                            id="exampleEmail"
                            name="email"
                            placeholder="with a placeholder"
                            type="email"
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="examplePassword">
                            Password
                        </Label>
                        <Input
                            id="examplePassword"
                            name="password"
                            placeholder="password placeholder"
                            type="password"
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="exampleDate">
                            Date
                        </Label>
                        <Input
                            id="exampleDate"
                            name="date"
                            placeholder="date placeholder"
                            type="date"
                        />
                    </FormGroup>
                </Form>
            </div>
        </div>
    )
}