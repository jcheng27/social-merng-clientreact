import React, { useState } from 'react'
import { Button, Form } from 'semantic-ui-react'
import { gql, useMutation } from '@apollo/client'
// import { useMutation } from '@apollo/react-hooks'
// import gql from 'graphql-tag'

import { useForm } from '../util/hooks.js';



function Register(props) {

	// clean
	const [errors, setErrors] = useState({});

	// Orig
	// const [values, setValues] = useState({
	// 	username: '',
	// 	email: '',
	// 	password: '',
	// 	confirmPassword: ''
	// }); 

	// clean
	const initialState = {
		username: '',
		email: '',
		password: '',
		confirmPassword: ''
	};

	// orig
	// const onChange = (event) => {
	// 	// console.log('hello');
	// 	// console.log('event:',event);
	// 	setValues({...values, [event.target.name]: event.target.value});
	// };

	// clean
	const { onChange, onSubmit, values } = useForm(registerUser, initialState)

	// both 
	const [addUser, { loading }] = useMutation(REGISTER_USER, {
		update(proxy, result) { 
			console.log(result);
			props.history.push('/')
		},
		onError(err){
			console.log(err.graphQLErrors[0].extensions.exception.errors)
			setErrors(err.graphQLErrors[0].extensions.exception.errors);
		},
		variables: values
	});

	// clean
	function registerUser() {
		addUser();
	}

	// const onSubmit = (event) => {
	// 	event.preventDefault();
	// 	addUser();
	// }

	return (
		<div className="form-container">
			<Form onSubmit={onSubmit} noValidate className={loading? 'loading' : ''}>
				<h1>Register Page</h1>
				<Form.Input
					label="Username"
					placeholder="Username.."
					name="username"
					type="text"
					value={values.username}
					error={errors.username ? true : false}
					onChange={onChange}
					/>
				<Form.Input
					label="Email"
					placeholder="Email.."
					name="email"
					type="email"
					value={values.email}
					error={errors.email ? true : false}
					onChange={onChange}
					/>
				<Form.Input
					label="Password"
					placeholder="Password.."
					name="password"
					type="password"
					value={values.password}
					error={errors.password ? true : false}
					onChange={onChange}
					/>
				<Form.Input
					label="Confirm Password"
					placeholder="Confirm Password.."
					name="confirmPassword"
					type="password"
					value={values.confirmPassword}
					error={errors.confirmPassword ? true : false}
					onChange={onChange}
					/>										
				</Form>
				<Button type="submit" primary>
					Register
				</Button>
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