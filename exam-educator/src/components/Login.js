import React, {Component} from 'react';
import { Modal, Button, Form } from 'react-bootstrap'
import { Formik } from 'formik';
import * as yup from 'yup';
import Axios from 'axios';
import { URL, TOKEN_KEY, ID} from '../constants';

class Login extends Component {

    //Schemas used to validate input of form.
    RegisterSchema = yup.object({
        email: yup.string().email('Invalid email address').required('Email is required'),
        password: yup.string().required('Password is required'),
        confirm_password: yup.string()
            .oneOf([yup.ref('password'), null], "Password does not match")
            .required('Password confirm is required'),
    })
    LoginSchema = yup.object({
        email: yup.string().email('Invalid email address').required('Email is required'),
        password: yup.string().required('Password is required'),
    })

    //When forms close, need to set the state of its parent(App) back to false.

    switchToRegister = () => {
        this.props.showLoginForm(false);
        this.props.showRegisterForm(true);
    }

    switchToLogin = () => {
        this.props.showRegisterForm(false);
        this.props.showLoginForm(true);
    }

    hideRegisterForm = () => {
        this.props.showRegisterForm(false);
    };

    hideLoginForm = () => {
        this.props.showLoginForm(false);
    }

    //Handle Submit. TODO(Http request.)
    handleSubmitLogin = (event, { setSubmitting }) => {

        // const url = `${URL}/users/login`;
        // Axios({
        //     method: 'POST',
        //     url: url,
        //     data: {
        //         email: event.email,
        //         password: event.password            }
        // })
        //     .then(
        //         response => {
        //             if (response.data.operationResponse.failed === false) {
        //                 localStorage.setItem(TOKEN_KEY, response.data.token);
        //                 localStorage.setItem(ID, response.data.id);
        //                 this.props.loggedIn();
        //                 this.props.showLoginForm(false);
        //             } else {
        //                 console.log("Login failed");
        //             }
        //             setSubmitting(false);
        //         }
        //     )
        //     .catch(
        //         err => {
        //             console.log("Login failed");
        //         }
        //     )
    }
    handleSubmitRegister = (event) => {
        const url = `${URL}/users/register`
        Axios({
            method: 'POST',
            url: url,
            data: {
                email: event.email,
                password: event.password,
                userName: event.userName
            }
        })
            .then(
                response => {
                    if (response.data.failed === false) {
                        this.switchToLogin();
                    }
                }
            )
            .catch(
                response => {
                    console.log('failed')
                }
            )
    }

    render() {
        return (
            <div className=".login">
                {/* Modal is the pop up window */}
                {<Modal show={this.props.isLoginForm} onHide={this.hideLoginForm}>

                    <Modal.Header closeButton>
                        <Modal.Title>Sign In</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {/* Formik and yup are used to validate input of form */}
                        <Formik
                            validationSchema={this.LoginSchema}
                            onSubmit={this.handleSubmitLogin}
                            initialValues={{
                                email: '',
                                password: '',
                            }}
                        >
                            {/* Form start here */}
                            {({ handleSubmit,
                                  handleChange,
                                  resetForm,
                                  handleBlur,
                                  values,
                                  touched,
                                  isValid,
                                  errors }) => (<Form noValidate onSubmit={handleSubmit}>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Email address</Form.Label>
                                        <Form.Control
                                            type="email"
                                            placeholder="Enter email"
                                            name='email'
                                            onChange={handleChange}
                                            isInvalid={!!errors.email && touched.email}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.email}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group controlId="formBasicPassword">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control
                                            type="password"
                                            placeholder="Password"
                                            name='password'
                                            onChange={handleChange}
                                            isInvalid={!!errors.password && touched.password}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.password}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Button size="sm" block="true" variant="link" onClick={this.switchToRegister}>
                                        Not registered? Sign up
                                    </Button> {' '}
                                    <Button block="true" className="Submit_Buttom" variant="primary" type="submit">
                                        Log in
                                    </Button>
                                </Form>
                            )}
                        </Formik>
                    </Modal.Body>
                </Modal>}

                {<Modal show={this.props.isRegisterForm} onHide={this.hideRegisterForm}>
                    <Modal.Header closeButton>
                        <Modal.Title>Register</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <Formik
                            validationSchema={this.RegisterSchema}
                            onSubmit={this.handleSubmitRegister}
                            initialValues={{
                                email: '',
                                password: '',
                                confirm_password: '',
                            }}
                        >
                            {({ handleSubmit,
                                  handleChange,
                                  handleBlur,
                                  values,
                                  touched,
                                  isValid,
                                  errors }) => (<Form noValidate onSubmit={handleSubmit}>
                                    <Form.Group controlId="formUserName">
                                        <Form.Label>Email Address</Form.Label>
                                        <Form.Control
                                            type="email"
                                            placeholder="Enter email"
                                            name='email'
                                            onChange={handleChange}
                                            isInvalid={!!errors.email && touched.email}
                                        />
                                        <Form.Text className="text-muted">
                                            We'll never share your email with anyone else.
                                        </Form.Text>
                                        <Form.Control.Feedback type="invalid">
                                            {errors.email}
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>UserName</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="UserName"
                                            name='userName'
                                            onChange={handleChange}
                                            isInvalid={!!errors.userName && touched.userName}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.userName}
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group controlId="formBasicPassword">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control
                                            type="password"
                                            placeholder="Password"
                                            name='password'
                                            onChange={handleChange}
                                            isInvalid={!!errors.password && touched.password}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.password}
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group controlId="formConfirmPassword">
                                        <Form.Label>Confirm Password</Form.Label>
                                        <Form.Control
                                            type="password"
                                            placeholder="Password"
                                            name='confirm_password'
                                            onChange={handleChange}
                                            isInvalid={!!errors.confirm_password && touched.confirm_password}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.confirm_password}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Button size="sm" block="true" variant="link" onClick={this.switchToLogin}>
                                        Aready registered? Log in
                                    </Button> {' '}
                                    <Button block="true" className="Submit_Buttom" variant="primary" type="submit">
                                        Join
                                    </Button>
                                </Form>
                            )}
                        </Formik>
                    </Modal.Body>
                </Modal>}
            </div>
        );
    }
}

export default Login;