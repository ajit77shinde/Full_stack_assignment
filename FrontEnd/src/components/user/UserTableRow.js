import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import { url } from '../../config/config';
import dateFormat from 'dateformat';

export default class UserTableRow extends Component {

    constructor(props) {
        super(props);
        // this.deleteUser = this.deleteUser.bind(this);
    }
    
    deleteUser() {
        axios.delete(`${url}/students/delete-student/${this.props.obj._id}`)
            .then((res) => {
                console.log('Student successfully deleted!')
            }).catch((error) => {
                console.log(error)
            })
    }

    render() {
        return (
            <tr>
                <td>{this.props.obj.id}</td>
                <td>{this.props.obj.name}</td>
                <td>{this.props.obj.gender}</td>
                <td>{this.props.obj.email}</td>
                <td>{this.props.obj.status}</td>
                <td>{dateFormat(this.props.obj.created_date, "mmmm dS, yyyy")}</td>
                <td>{dateFormat(this.props.obj.updated_date, "mmmm dS, yyyy")}</td>
                <td>
                <Link className="edit-link" to={"/edit-user/" + this.props.obj._id}>
                        Edit
                    </Link></td>
                {/* <td> <Button onClick={() => this.deleteUser()} size="sm" variant="danger">Delete</Button> </td> */}
            </tr>
        );
    }
}