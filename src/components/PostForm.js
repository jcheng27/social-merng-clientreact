import React, { useState } from 'react'
import { Button, Form } from 'semantic-ui-react'
import { useForm } from '../util/hooks.js'
import { gql, useMutation } from '@apollo/client'
import { FETCH_POSTS_QUERY } from  '../util/graphql.js'

function PostForm() {

	// don't need authContext here because it is check in Home.Js with user &&
	// const [errors, setErrors] = useState({});
	const { onChange, onSubmit, values } = useForm(createPostCallback, {
		body:''
	})

	// https://www.apollographql.com/docs/react/caching/cache-interaction/#writequery-and-writefragment
	// using proxy to cache, this is using a bit from the tutorial and a bit from apollo site
	const [createPost, { error }] = useMutation(CREATE_POST_MUTATION, {
		variables: values,
		onError: (error) => {
	      	console.log(error.graphQLErrors[0].message)
	 	},	
		update(proxy, result) {
			console.log('Result from update function is:', result)

			const data = proxy.readQuery({
				query: FETCH_POSTS_QUERY
			});
			console.log('From proxy.readQuery', data)
			proxy.writeQuery({ query: FETCH_POSTS_QUERY, data: {
				getPosts: [result.data.createPost, ... data.getPosts]
				},	 
			});
			values.body = '';
		}
	})

	function createPostCallback() {
		createPost()
	}

	return (
		
	    <>
		      <Form onSubmit={onSubmit}>
		        <h2>Create a post:</h2>
		        <Form.Field error={error ? true : false}>
		          <input
		            placeholder="Write your post here"
		            name="body"
		            onChange={onChange}
		            value={values.body}
		           
		          />
		          <Button type="submit" color="teal">
		            Submit
		          </Button>
		        </Form.Field>
		      </Form>

		      {error && (
		        <div className="ui error message" style={{ marginBottom: 20 }}>
		          <ul className="list">
		            <li>{error.graphQLErrors[0].message}</li>
		          </ul>
		        </div>
		      )}

	    </>
	)
}

const CREATE_POST_MUTATION = gql`
  mutation createPost($body: String!) {
    createPost(body: $body) {
      _id
      body
      createdAt
      username
      likes {
        _id
        username
        createdAt
      }
      likeCount
      comments {
        _id
        body
        username
        createdAt
      }
      commentCount
    }
  }
`;

export default PostForm