import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { gql, useMutation } from '@apollo/client'
import { Button, Icon, Label } from 'semantic-ui-react'
import PopupSemantic from '../util/PopupSemantic.js'

function LikeButton({user, post: {_id, likes, likeCount}}) {

	const [liked, setLiked] = useState(false)

	// search react useEffect dependency array
	useEffect( () => {
		if (user && likes.find(x => x.username === user.username)) {
			setLiked(true)
		} else setLiked(false)
	}, [user, likes]);


  	const [likePost, {error}] = useMutation(LIKE_POST_MUTATION, {
	    variables: { postId: _id },
		onError: (error) => {
	      	console.log(error);
	 	},
	 	update(proxy, data) {
	 		console.log('You liked this post:',data)
	 	}
	 })


	const likeButton = user ? (
		liked ? (
		      <Button color='teal'>
		        <Icon name='heart' />
		        
		      </Button>
			) : (
		      <Button color='teal' basic>
		        <Icon name='heart' />
		        
		      </Button>
			)
		) : (
		      <Button as={Link} to="/login" color='teal' basic>
		        <Icon name='heart' />
		        
		      </Button>
		)


	return (

	    <Button as='div' labelPosition='right' onClick={likePost}>
	    <PopupSemantic content={liked ? 'Unlike post' : 'Like post'}>
	    	{likeButton}
	    </PopupSemantic>
	     	<Label basic color='teal' pointing='left'>
	        	{likeCount}
	      	</Label>
	    </Button>

	)
}

const LIKE_POST_MUTATION = gql`
	mutation likePost($postId: ID!) {
		likePost(postId: $postId) {
			_id
			likes {
				username
			}
			likeCount
		}
	}
`;

export default LikeButton 