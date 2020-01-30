import React, { useState, useEffect } from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import './Form.css';

const UserForm = ({ values, errors, touched, status}) => {
  const [user, setUser] = useState([]);
  useEffect(() => {
    console.log("status has changed", status);
    status && setUser(user => [...user, status]);
  }, [status]);

  return (
    <div >
      <Form className="form">
        <label htmlFor="name" className="labels">
          <h1>Name:</h1>
          <Field id="name" type="text" name="name"/>
          {touched.name && errors.name && (
            <p className="errors">{errors.name}</p>
          )}
        </label>
        <label htmlFor="email" className="labels">
          <h1>Email:</h1>
          <Field id="email" type="text" name="email" />
          {touched.email && errors.email && (
            <p className="errors">{errors.email}</p>
          )}
        </label >
        <label htmlFor="password" className="labels">
          <h1>Password:</h1>
          <Field id="password" type="password" name="password" />
          {touched.password && errors.password && (
            <p className="errors">{errors.password}</p>
          )}
        </label>
        <label htmlFor="tos" className="labels">
          <h5>Terms Of Service</h5>
          <Field
            id="tos"
            type="checkbox"
            name="tos"
            check={values.tos}
          />
         
        </label>
        <button type="submit">Submit!</button>
      </Form>

      {user.map(users => (
        <ul className="list" key={users.id}>
          <li>Name: {users.name}</li>
          <li>Email: {users.email}</li>
          <li>Password: {users.password}</li>
          
          
          
        </ul>
      ))}
    </div>
  );
};
const FormikUserForm = withFormik({
  mapPropsToValues({ name, email, password, tos }) {
    return {
      name: name || "",
      email: email || "",
      password: password || "",
      tos: false
      
    };
  },
  validationSchema: Yup.object().shape({
    name: Yup.string().required("Name is a required field").min(3, "Name must be more than 3 characters long").max(15, "Name must be less than 15 characters long"),
    email: Yup.string().required().email(),
    password: Yup.string().required().min(8, "Password must be more than 8 characters long").max(20, "Password must be less than 20 characters long"),
    tos: Yup.boolean().required()
    
  }),
  handleSubmit(values, { setStatus }) {
    console.log("submitting", values);
    axios
      .post("https://reqres.in/api/users/", values)
      .then(response => {
        console.log("success", response);
        setStatus(response.data);
      })
      .catch(error => {
        console.log("There data was not returned", error.response);
      });
  }
})(UserForm);

export default FormikUserForm;



