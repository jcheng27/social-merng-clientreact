import React, { useState } from 'react'
import { Button, Form } from 'semantic-ui-react'
import { gql, useMutation } from '@apollo/client'
// import { useMutation } from '@apollo/react-hooks'
// import gql from 'graphql-tag'

import { useForm } from '../util/hooks.js';

// https://www.apollographql.com/docs/react/data/mutations/

function Register(props) {


	const [errors, setErrors] = useState({});

	const [values, setValues] = useState({
		username: '',
		email: '',
		password: '',
		confirmPassword: ''
	}); 

	// const onChange = (event) => {
	// 	console.log('Keystroke:',event);
	// 	setValues({...values, [event.target.name]: event.target.value});
	// };


  const [addUser] = useMutation(REGISTER_USER, {
    variables: {
   		username: values.username,
   		email: values.email,
   		password: values.password,
   		confirmPassword: values.confirmPassword
    },
	onError: (error) => {
      	console.log(error.graphQLErrors[0].extensions.exception.errors)
		setErrors(error.graphQLErrors[0].extensions.exception.errors);
 	},
 	update(proxy, result) {
 		console.log('It worked!:',result)
 		props.history.push('/');
 	}

  });

	return (

		<div className="form-container">

		  <Form onSubmit={(e) => {
		          e.preventDefault();
		          addUser();

		        }}>
		    <Form.Field>
		      <label>Username</label>
		      <input placeholder='Username' 
	            value={values.username}
	            onChange={(e) =>
	              setValues({
	                ...values,
	                username: e.target.value
	              })
	            }
	            type="text"
	           
		      />
		    </Form.Field>
		    <Form.Field>
		      <label>Email</label>
		      <input placeholder='Email' 
	            value={values.email}
	            onChange={(e) =>
	              setValues({
	                ...values,
	                email: e.target.value
	              })
	            }
	            type="text"
	            
		      />
		    </Form.Field>
		    <Form.Field>
		      <label>Password</label>
		      <input placeholder='Password' 
	            value={values.password}
	            onChange={(e) =>
	              setValues({
	                ...values,
	                password: e.target.value
	              })
	            }
	            type="text"
	          
		      />
		    </Form.Field>
		    <Form.Field>
		      <label>Confirm Password</label>
		      <input placeholder='Confirm Password' 
	            value={values.confirmPassword}
	            onChange={(e) =>
	              setValues({
	                ...values,
	                confirmPassword: e.target.value
	              })
	            }
	            type="text"
	         
		      />
		    </Form.Field>		    

		    <Button type='submit' primary>Submit</Button>

		  </Form>		

		{Object.keys(errors).length > 0 && (
			<div className="ui error message">
			<ul className="list">
				{Object.values(errors).map(value => (
					<li key={value}>{value}</li>
				))}
			</ul>
			</div>	
		)}

	    </div>

	)
}

const REGISTER_USER = gql`
	mutation register(
		$username: String!
		$email: String!
		$password: String!
		$confirmPassword: String!
	) {
		register(
			registerInput: {
				username: $username
				email: $email
				password: $password
				confirmPassword: $confirmPassword
			}
		) {
			_id email username createdAt token
		}

	}
`;

export default Register;