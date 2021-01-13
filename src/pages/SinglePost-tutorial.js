import React, {useContext, useState, useRef} from 'react'
import { gql, useQuery, useMutation } from '@apollo/client'
import moment from 'moment'

import { Button, Card, Form, Grid, Icon, Image, Label } from 'semantic-ui-react'
import { AuthContext } from '../context/auth.js'
import LikeButton from '../components/LikeButton.js'
import DeleteButton from '../components/DeleteButton.js'
import { useForm } from '../util/hooks.js'

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

  const commentInputRef = useRef(null);
  const [comment, setComment] = useState('');
  const [submitComment] = useMutation(SUBMIT_COMMENT_MUTATION, {
    update() {
      setComment('');
      commentInputRef.current.blur();
    },
    variables: {
      postId,
      body: comment
    }
  });


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
						    {context.user && context.user.username === username && (
						    	<DeleteButton postId={_id} callback={deletePostCallback}/>
						    )}							
						</Card.Content>
					</Card>
					{context.user && (
						<Card fluid>
							<Card.Content>

                  <p>Post a comment</p>
                  <Form>
                    <div className="ui action input fluid">
                      <input
                        type="text"
                        placeholder="Comment.."
                        name="comment"
                        value={comment}
                        onChange={(event) => setComment(event.target.value)}
                        ref={commentInputRef}
                      />
                      <button
                        type="submit"
                        className="ui button teal"
                        disabled={comment.trim() === ''}
                        onClick={submitComment}
                      >
                        Submit
                      </button>
                    </div>
                  </Form>
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

const SUBMIT_COMMENT_MUTATION = gql`
	mutation createComment(
		$postId: ID!
		$body: String!) {
			createComment(
				postId: $postId
				body: $body) {
					_id
				    comments{
				      _id
				      username
				      body
				      createdAt
				    }
				    commentCount
		}
	}
`;

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