import React, {useContext} from 'react';
import { gql, useQuery } from '@apollo/client';
// import gql from 'graphql-tag';
// import { useQuery } from '@apollo/react-hooks';

import { AuthContext } from '../context/auth.js'
import PostCard from '../components/PostCard.js';
import PostForm from '../components/PostForm.js';
import { Grid, Transition } from 'semantic-ui-react';
import { FETCH_POSTS_QUERY } from  '../util/graphql.js'

function Home() {
	const { user } = useContext(AuthContext)

	const { loading, data, error } = useQuery(FETCH_POSTS_QUERY);
	if (data) {
		console.log(data.getPosts);
	}

	function hello() {
		console.log('hello!!!')
	}
	hello();

	// JavaScript: true && expression always evaluates to expression, and false && expression always evaluates to false.
	return (
		  <Grid columns={3}>
		    <Grid.Row className="page-title">
		    	<h1>Recent Posts</h1>
		    </Grid.Row>
		    <Grid.Row>
		    	{user && (
		    		<Grid.Column>
		    			<PostForm />
		    		</Grid.Column>
		    	)}
	    	
		    	{loading ? (<h1>Loading posts..</h1>) : (
			    	<Transition.Group duration={5000}>
			    	{
			    		data.getPosts && data.getPosts.map((post) => (
					    <Grid.Column key={post._id} style={{ marginBottom: 20 }}>
					       <PostCard post={post} />
					    </Grid.Column>
			    		))
			    	}
			    	</Transition.Group>
		    	)}
		    </Grid.Row>
		  </Grid>
	);
}

export default Home;