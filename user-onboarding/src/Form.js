import React from 'react';
import {withFormik, Form as formikform, Field} from 'formik';
import styled from 'styled-components';
import * as yup from 'yup';
import axios from 'axios';

const Form = styled(formikform)`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
`;

function MyForm(props) {
    console.log(props.errors);
    console.log('Touched', props.touched);
  return (
    <div>

        <Form>

            <label htmlFor = 'name'>
                Name
                <Field name = 'name' placeholder = 'Name'/>
                {props.touched.name && props.errors.name && (<p>{props.errors.name}</p>)}
            </label>

            <label htmlFor = 'email'>
                Email
                <Field name = 'email' placeholder = 'Email'/>
                {props.touched.email && props.errors.email && (
                    <p>{props.errors.email}</p>
                )}
            </label>

            <label htmlFor = 'pw'>
                Password
                <Field type = 'password' name = 'pw'/>
                {props.touched.pw && props.errors.pw && (
                    <p>{props.errors.pw}</p>
                )}
            </label>

            <label htmlFor = 'tos'>
                ToS
                <Field type = 'checkbox' name = 'tos'/>
                {props.touched.tos && props.errors.tos && (
                    <p>{props.errors.tos}</p>
                )}
            </label>

            <button type = 'submit'>Submit</button>

        </Form>

    </div>
  );
}

const FormikForm = withFormik({

    mapPropsToValues: props => {
        return {
            name: props.name || '',
            email: props.email || '',
            pw: props.pw || '',
            tos: props.tos || false,
        }
    },

    validationSchema: yup.object().shape({
        name: yup.string().required('Name is required.').min(4, 'Needs to have 4 characters or more.'),
        email: yup.string().required('Email address is required.').email('Email must be valid.'),
        pw: yup.string().required('Please enter a password').min(6, 'Password needs to contain 6 letters or more.'),
        tos: yup.boolean().oneOf([true], 'You must agree to our ToS.')
    }),

    handleSubmit: (values, bag) => {
        console.log('values', values);
        axios.post('https://reqres.in/api/users', values).then(res => {
            console.log('res.data:', res.data);
            bag.props.setMembers([...bag.props.members, res.data]);
        }).catch(err => console.log(err))
        bag.resetForm();
    }

})(MyForm);

export default FormikForm;

