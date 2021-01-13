import React, {useContext} from 'react';
import { gql, useQuery } from '@apollo/client';
// import gql from 'graphql-tag';
// import { useQuery } from '@apollo/react-hooks';

import PostCard from '../components/PostCard.js';
import { Grid } from 'semantic-ui-react';

function Home() {
	const { loading, data: {getPosts : posts} } = useQuery(FETCH_POSTS_QUERY);
	if (posts) {
		console.log(posts);
	}

	return (
		  <Grid columns={3}>
		    <Grid.Row className="page-title">
		    	<h1>Recent Posts</h1>
		    </Grid.Row>
		    <Grid.Row>
		    	{loading ? (<h1>Loading posts..</h1>) : (
		    		posts && posts.map((post) => (
				      <Grid.Column key={post.id} style={{ marginBottom: 20 }}>
				        <PostCard post={post} />
				      </Grid.Column>
		    		))
		    	)}
		    </Grid.Row>
		  </Grid>
	);
}

const FETCH_POSTS_QUERY = gql`
	{
		getPosts{
			_id body createdAt username likeCount
			likes{
				username
			}
			commentCount
			comments{
				_id username createdAt body
			}
		}
	}
`;

export default Home;