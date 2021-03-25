import React, { Component, useEffect, useState } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { url } from '../../config/config';
// import './gift.css';
import validate from "./validationRule";
import useForm from "./useForm";
import { useHistory } from "react-router-dom";
import { Link } from 'react-router-dom';
import "./user.css";
import { useAlert } from 'react-alert'

export const EditUser = ({match}) => {
    const history = useHistory();
    const alert = useAlert();
    const [flag, setflag] = useState(false);

    const {
        values,
        errors,
        handleChange,
        handleSubmit,
        setEditValues
    } = useForm(login, validate);
    useEffect(() => {
        console.log("url = ",url)
        // console.log("match = ",match)
        axios.get(`${url}/users/edit-user/${match.params.id}`)
            .then(res => {
                console.log(" = =", res.data)
                setEditValues(res.data)
            })
            .catch((error) => {
                console.log(error);
            })

    },[])

    function login() {
        console.log('No errors, submit callback called!');
        const userObject = {
            name: values.name,
            email: values.email,
            gender: values.gender,
            status: values.status,
            _id: values._id,
        };
        console.log("userObject = ", userObject)

        axios.put(`${url}/users/update-user`, userObject)
            .then(res => {
                alert.show(res.data.msg)
                console.log(res.data);
                history.push("/user-list");
            });
    }
    console.log("values = ", values)
    return (
        <div className="form-wrapper">
            {/* <Form onSubmit={this.onSubmit}> */}
            <Form >
            <Form.Group controlId="Name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control autoComplete="off" name="name" type="name" value={values.name || ''} onChange={handleChange}
                        placeholder="Please Enter Name" />
                </Form.Group>
                <Form.Group controlId="Email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control autoComplete="off" name="email" type="text" value={values.email || ''} onChange={handleChange}
                        placeholder="Please Enter Email" />
                    {errors.email && (
                        <p className="help is-danger">{errors.email}</p>
                    )}
                </Form.Group>
                
                <Form.Group controlId="Gender">
                    <Form.Label>gender</Form.Label>
                    <Form.Control autoComplete="off" name="gender" type="gender" value={values.gender || ''} onChange={handleChange}
                        placeholder="Please Enter Gender" />
                </Form.Group>
                <Form.Group controlId="Status">
                    <Form.Label>status</Form.Label>
                    <Form.Control autoComplete="off" name="status" type="status" value={values.status || ''} onChange={handleChange}
                        placeholder="Please Enter Status" />
                </Form.Group>
                
                <Button onClick={(e) => handleSubmit(e)} variant="danger" size="lg" block="block" type="submit">
                    Update User
        </Button>
                {/* <div className="center-link">
                    <Link className=""
                        to={"/edit-user"}
                    > Forgot password? </Link>
                </div> */}
            </Form>

        </div>
    )
}

