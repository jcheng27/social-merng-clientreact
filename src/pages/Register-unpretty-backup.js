import React, { useState } from 'react'
import { Button, Form } from 'semantic-ui-react'
import { gql, useMutation } from '@apollo/client'
// import { useMutation } from '@apollo/react-hooks'
// import gql from 'graphql-tag'

import { useForm } from '../util/hooks.js';

// https://www.howtographql.com/react-apollo/3-mutations-creating-links/

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

  // let input;
  // const [addUser, data ] = useMutation(REGISTER_USER, { onError: (error) => {
  //     console.log(error.graphQLErrors[0].extensions.exception.errors)}}
  // );


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
 	}

  });

	return (

	    <div>
	    
	      <form
	        onSubmit={(e) => {
	          e.preventDefault();
	          addUser();
	        }}
	      >
	        <div className="flex flex-column mt3">
	          <input
	            className="mb2"
	            value={values.username}
	            onChange={(e) =>
	              setValues({
	                ...values,
	                username: e.target.value
	              })
	            }
	            type="text"
	            placeholder="Username"
	          />
	          <input
	            className="mb2"
	            value={values.email}
	            onChange={(e) =>
	              setValues({
	                ...values,
	                email: e.target.value
	              })
	            }
	            type="text"
	            placeholder="Email"
	          />
	          <input
	            className="mb2"
	            value={values.password}
	            onChange={(e) =>
	              setValues({
	                ...values,
	                password: e.target.value
	              })
	            }
	            type="text"
	            placeholder="Create Password"
	          />
	          <input
	            className="mb2"
	            value={values.confirmPassword}
	            onChange={(e) =>
	              setValues({
	                ...values,
	                confirmPassword: e.target.value
	              })
	            }
	            type="text"
	            placeholder="Confirm Password"
	          />

	        </div>

	        <button type="submit">Submit</button>

	      </form>
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