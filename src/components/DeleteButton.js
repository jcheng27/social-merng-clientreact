import React, {useState} from 'react'
import { gql, useMutation } from '@apollo/client'
import { Button, Confirm, Icon } from 'semantic-ui-react'
import { FETCH_POSTS_QUERY } from '../util/graphql.js'
import PopupSemantic from '../util/PopupSemantic.js'

// all the bearer tokens authorization has been take care of in ApolloProvider.js
function DeleteButton(props) {
	const [confirmOpen, setConfirmOpen] = useState(false);

	const dynamic = props.commentId ? DELETE_COMMENT_MUTATION : DELETE_POST_MUTATION;

	const [deletePostorComment, {error}] = useMutation(dynamic, {
		variables: {
			postId: props.postId,
			commentId: props.commentId
		},
		onError: (error) => {console.log(error)},
		update(proxy, data) {
	 		console.log('Removing this post:',data)
	 		//close the confirm window or it won't go away
	 		setConfirmOpen(false);

	 		if (!props.commentId) {
		 		const refresh = proxy.readQuery({
		 			query: FETCH_POSTS_QUERY
		 		});
		 		console.log('current cache is:',refresh)
		 		
		 		console.log('after filtering, one less:', refresh.getPosts.filter(x => x._id !== props.postId) )
		 		const oneless = refresh.getPosts.filter(x => x._id !== props.postId)
		 		proxy.writeQuery({ query: FETCH_POSTS_QUERY, data: { getPosts : oneless }});
	 		}

	 		if (props.callback) props.callback()
	 	}
	}) 


	return (
	<>
	<PopupSemantic content={props.commentId ? 'Delete Comment' : 'Delete Post'}>
	    <Button as='div' color='red' floated='right' onClick={() => {
	    	console.log('Confirm deleting first')
	    	setConfirmOpen(true)
	    }}>
	    	<Icon name='trash' style={{ margin: 0 }} />
	    </Button>
	</PopupSemantic>
	    <Confirm
	    	open={confirmOpen}
	    	onCancel={() => setConfirmOpen(false)}
	    	onConfirm={deletePostorComment}
	    />
	</>
	)
}

const DELETE_POST_MUTATION = gql`
	mutation deletePost($postId: ID!) {
		deletePost(postId: $postId)
	}
`;

const DELETE_COMMENT_MUTATION = gql`
	mutation deleteComment(
		$postId: ID!
		$commentId: ID!
	) {
		deleteComment(
			postId: $postId
			commentId: $commentId
		) {
   			 _id
		    comments{
		      _id
		      username
		      body
		    }
		    commentCount			
		}
	}
`;

export default DeleteButton