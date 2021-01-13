import React, { useState } from 'react'
import { Button, Form } from 'semantic-ui-react'
import { useForm } from '../util/hooks.js'
import { gql, useMutation } from '@apollo/client'

function PostComment(props) {

	const [comment, setComment] = useState('');
  	const [submitComment] = useMutation(SUBMIT_COMMENT_MUTATION, {
  		variables : {
  			postId: props.postId,
  			body: comment
  		},
  		onError : (error) => {
  			console.log('Error in commenting:', error);
  		},
  		update(proxy, result) {
  			console.log('You just added this comment', result);
  			setComment('');
  		} 
  	})

  	return (

      <Form onSubmit={submitComment}>
        <h3>Add a comment:</h3>
        <Form.Field>
          <input
            placeholder="Write your comment here"
            name="comment"
            value={comment}
            onChange={(event) => setComment(event.target.value)}
          />
          <Button type="submit" color="teal" disabled={comment.trim() === ''}>
            Submit
          </Button>
        </Form.Field>
      </Form>

  	)
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

export default PostComment;