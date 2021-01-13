import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';

import { AuthContext } from '../context/auth.js'

function AuthRoute({ component: Component, ...rest }){
	console.log('Component is:', Component)
	console.log('...rest is spread as', {...rest})
	const { user } = useContext(AuthContext);

	return(
		<Route
			{...rest}
			render={props => 
				user ? <Redirect to="/" /> : <Component {...props} />
			}
		/>
	)

}

export default AuthRoute