import React, { useContext, useState } from 'react'
import { Button, Form } from 'semantic-ui-react'
import { gql, useMutation } from '@apollo/client'
// import { useMutation } from '@apollo/react-hooks'
// import gql from 'graphql-tag'

import { useForm } from '../util/hooks.js';
import { AuthContext } from '../context/auth.js'

// https://www.apollographql.com/docs/react/data/mutations/

function Register(props) {
	const context = useContext(AuthContext);

	const [errors, setErrors] = useState({});

	const [values, setValues] = useState({
		username: '',
		email: '',
		password: '',
		confirmPassword: ''
	}); 

	// https://www.pluralsight.com/guides/handling-multiple-inputs-with-single-onchange-handler-react
	const onChange = (event) => {
		//console.log('Keystroke:',event);
		setValues({...values, [event.target.name]: event.target.value});
	};


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
 	update(proxy, {data: {register:userData}}) {
 		console.log('It worked!:',userData)
 		context.login(userData)
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
		      	name='username' 
	            value={values.username}
	            onChange={onChange}
	            type="text"
	           
		      />
		    </Form.Field>
		    <Form.Field>
		      <label>Email</label>
		      <input placeholder='Email'
		      	name='email'  
	            value={values.email}
				onChange={onChange}
	            type="text"
	            
		      />
		    </Form.Field>
		    <Form.Field>
		      <label>Password</label>
		      <input placeholder='Password'
		      	name='password'  
	            value={values.password}
 				onChange={onChange}
	            type="password"
	          
		      />
		    </Form.Field>
		    <Form.Field>
		      <label>Confirm Password</label>
		      <input placeholder='Confirm Password'
		      	name='confirmPassword'  
	            value={values.confirmPassword}
	            onChange={onChange}
	            type="password"
	         
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