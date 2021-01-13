import React, { useReducer, createContext } from 'react'
import jwtDecode from 'jwt-decode'

const initialState = {
	user: null
};

// Whenever you refresh homepage, it will show username om MenuBar 
// because of AuthContext is called in MenuBar
// check it out in Developer Tools F12 Application local Storage
if (localStorage.getItem('jwtToken')) {
	const decodedToken = jwtDecode(localStorage.getItem('jwtToken'))
	console.log('jwtToken is:',localStorage.getItem('jwtToken'))
	console.log('decodedToken returns back the user objects associated with it:',decodedToken)
	
	if (decodedToken.exp * 1000 < Date.now()) {
		localStorage.removeItem('jwtToken');
	} else {
		initialState.user = decodedToken;
	}
}

//rember that user has token, username, email, createdAt 
const AuthContext = createContext({
	user: null,
	login: (userData) => {},
	logout: () => {}
})

function authReducer(state, action) {
	switch(action.type) {
		case 'LOGIN':
			return {
				...state,
				user: action.payload
			}
		case 'LOGOUT':
			return{
				...state,
				user: null
			}
		default:
			return state;

	}
}


// Every Context object comes with a Provider 
function AuthProvider(props) {
	const [state, dispatch] = useReducer(authReducer, initialState);

	function login(userData){
		localStorage.setItem("jwtToken", userData.token)
		dispatch({
			type: 'LOGIN',
			payload: userData
		})
	}

	function logout(){
		localStorage.removeItem("jwtToken")
		dispatch({ type: 'LOGOUT' })
	}

	// Every Context object comes with a Provider 
	return (
		<AuthContext.Provider
			value={{ user: state.user, login, logout }}
			{...props}
			/>
	)

}

export { AuthContext, AuthProvider }