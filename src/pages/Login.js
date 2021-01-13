import React, { useContext, useState } from 'react'
import { Button, Form } from 'semantic-ui-react'
import { gql, useMutation } from '@apollo/client'
import { useForm } from '../util/hooks.js';

import { AuthContext } from '../context/auth.js'

function Login(props) {
	const context=useContext(AuthContext);

	const [errors, setErrors] = useState({});

	const { onChange, onSubmit, values } = useForm(loginUserCallback, {
		username:'',
		password:''
	})

  	const [loginUser, {loading, error}] = useMutation(LOGIN_USER, {
	    variables: values,
		onError: (error) => {
	      	console.log(error.graphQLErrors[0].extensions.exception.errors)
			setErrors(error.graphQLErrors[0].extensions.exception.errors);
	 	},
	 	update(proxy, {data: {login: userData}}) {
	 		console.log('It worked!:',userData)
	 		context.login(userData)
	 		props.history.push('/');
	 	}
	 })

	function loginUserCallback() {
		loginUser();
	}

	return (


		<div className="form-container">

		  <Form onSubmit={onSubmit} className={loading ? 'loading' : ''}>
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
		      <label>Password</label>
		      <input placeholder='Password'
		      	name='password'  
	            value={values.password}
 				onChange={onChange}
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

const LOGIN_USER = gql`
	mutation login(
		$username: String!
		$password: String!
	) {
		login(
			username: $username
			password: $password
		) {
			_id email username createdAt token
		}
	}
`;

export default Login;

