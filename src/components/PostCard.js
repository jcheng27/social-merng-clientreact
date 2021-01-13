import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, Icon, Image, Label, Popup } from 'semantic-ui-react';
import moment from 'moment';

import { AuthContext } from '../context/auth.js'
import LikeButton from './LikeButton.js'
import DeleteButton from './DeleteButton.js'
import PopupSemantic from '../util/PopupSemantic.js'

function PostCard({post: {_id, username, body, createdAt, likeCount, commentCount, likes, comments}}){

	const context = useContext(AuthContext);

	function likePost(){
		console.log('liking post')
	}

	function commentOnPost(){
		console.log('commenting on post')
	}

	return (

		    <Card fluid>
		      <Card.Content>
		        <Image
		          floated='right'
		          size='mini'
		          src='https://react.semantic-ui.com/images/avatar/large/molly.png'
		        />
		        <Card.Header>{username}</Card.Header>
		        <Card.Meta as={Link} to={`/posts/${_id}`}>{moment(createdAt).fromNow()}</Card.Meta>
		        <Card.Description>
		          {body}
		        </Card.Description>
		      </Card.Content>
		      <Card.Content extra>

		      	<LikeButton user={context.user} post={{_id, likes, likeCount}} />
			  
		      	<PopupSemantic content='Comment on post'>
				    <Button as='div' labelPosition='right' as={Link} to={`/posts/${_id}`}>
				      <Button color='blue' basic>
				        <Icon name='comment' />
				        
				      </Button>
				      <Label basic color='blue' pointing='left'>
				        {commentCount}
				      </Label>
				    </Button>
			    </PopupSemantic>

			    {context.user && context.user.username === username && (
			    	<DeleteButton postId={_id} />
			    )
				}

		      </Card.Content>
		    </Card>

	)
}



export default PostCard