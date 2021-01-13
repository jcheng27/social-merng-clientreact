import React, {useContext, useState} from 'react'
import { gql, useQuery, useMutation } from '@apollo/client'
import moment from 'moment'

import { Button, Card, Form, Grid, Icon, Image, Label } from 'semantic-ui-react'
import { AuthContext } from '../context/auth.js'
import LikeButton from '../components/LikeButton.js'
import DeleteButton from '../components/DeleteButton.js'
import { useForm } from '../util/hooks.js'
import PostComment from '../components/PostComment.js';
import PopupSemantic from '../util/PopupSemantic.js'

function SinglePost(props) {

	const context = useContext(AuthContext);
	console.log('Props is:',props)
	const postId = props.match.params.postId;
	console.log('Post Id from props.match.params:',postId);

	const { data } = useQuery(FETCH_POST_QUERY, {
	    variables: { postId }
	  })

  	if (data) {
  		console.log('Data from FETCH_POST_QUERY:',data)
  	}

  	function deletePostCallback() {
  		props.history.push('/')
  	}


  	//Destructuring so that you don't need to do data.getPost below, for some reason can't destructure above?
	let postMarkup;
	if(!data) {
		postMarkup = <p>Loading post..</p>
	} else {
		const { _id, body, createdAt, username, comments, commentCount, likes, likeCount} = data.getPost;

		postMarkup = (
			<Grid>
	        	<Grid.Row>
	          	<Grid.Column width={2}>
	            	<Image
	              		src="https://react.semantic-ui.com/images/avatar/large/molly.png"
	              		size="small"
	              	float="right"
	            	/>
	          	</Grid.Column>
					<Grid.Column width={10}>
					<Card fluid>
						<Card.Content>
							<Card.Header>{username}</Card.Header>
							<Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
							<Card.Description>{body}</Card.Description>
						</Card.Content>
						<hr/>
						<Card.Content extra>
							<LikeButton user={context.user} post={{_id, likeCount, likes}} />

							<PopupSemantic content="Comment on post">
								<Button
									as="div"
									labelPosition="right"
									onClick={() => console.log('Comment on Single Post')}
								>
									<Button basic color="blue">
										<Icon name="comments"/>
									</Button>
									<Label basic color="blue" pointing="left">
										{commentCount}
									</Label>
								</Button>
							</PopupSemantic>
						    {context.user && context.user.username === username && (
						    	<DeleteButton postId={_id} callback={deletePostCallback}/>
						    )}							
						</Card.Content>
					</Card>
					{context.user && (
						<Card fluid>
							<Card.Content>
								<PostComment postId={_id}/>
							</Card.Content>
						</Card>
					)}
					{comments.map( (c) => (
						<Card fluid key={c.id}>
						<Card.Content>
						    {context.user && context.user.username === c.username && (
						    	<DeleteButton postId={_id} commentId={c._id} />
						    )}							
							<Card.Header> {c.username} </Card.Header>
							<Card.Meta> {moment(c.createdAt).fromNow()} </Card.Meta>
							<Card.Description> {c.body} </Card.Description>
						</Card.Content>
						</Card>
						)
					)}

					</Grid.Column>
				</Grid.Row>
			</Grid>
		)
	}

	return postMarkup;

}


const FETCH_POST_QUERY = gql`
	query($postId: ID!) {
		getPost(postId: $postId) {
			_id body createdAt username likeCount
			likes{
				username
			}
			likeCount
			comments{
				_id username createdAt body
			}
			commentCount
		}
	}
`;

export default SinglePost;