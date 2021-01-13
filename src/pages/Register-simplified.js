import React, { useState } from 'react'
import { Button, Form } from 'semantic-ui-react'
import { gql, useMutation } from '@apollo/client'
// import { useMutation } from '@apollo/react-hooks'
// import gql from 'graphql-tag'

import { useForm } from '../util/hooks.js';

// https://www.apollographql.com/docs/react/data/mutations/

function Register(props) {

	// clean
	const [errors, setErrors] = useState({});

	// Orig
	const [values, setValues] = useState({
		username: '',
		email: '',
		password: '',
		confirmPassword: ''
	}); 

	// clean
	// const initialState = {
	// 	username: '',
	// 	email: '',
	// 	password: '',
	// 	confirmPassword: ''
	// };

	// orig
	const onChange = (event) => {
		console.log('hello');
		console.log('event:',event);
		setValues({...values, [event.target.name]: event.target.value});
	};

	// clean
	// const { onChange, onSubmit, values } = useForm(registerUser, initialState)

	// both 
	// const [addUser, { loading }] = useMutation(REGISTER_USER, {
	// 	update(proxy, result) { 
	// 		console.log('the new user is:', result);
	// 		// props.history.push('/')
	// 	},
	// 	variables: {
	// 		username: 'anna',
	// 		email: 'anna@anna.com',
	// 		password: '123456',
	// 		confirmPassword: '123456'
	// 	}
	// });


	// clean
	// function registerUser() {
	// 	addUser();
	// }

	// const onSubmit = (event) => {
	// 	event.preventDefault();
	// 	addUser();
	// }

  let input;
  const [addUser, data ] = useMutation(REGISTER_USER, { onError: (error) => {
      console.log(error.graphQLErrors[0].extensions.exception.errors)}}
  );


	return (
	    <div>
	      <form
	        onSubmit={e => {
	          e.preventDefault();
	          addUser({ variables: { 	
	          	username: input.value,
				email: 'colin@colin.com',
				password: '123456',
				confirmPassword: '123456' } });
 				input.value = '';
	        }}
	      >
	        <input
	          ref={node => {
	            input = node;
	          }}
	        />
	        <button type="submit">Add User</button>
	      </form>
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