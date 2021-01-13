import { gql } from '@apollo/client'

export const FETCH_POSTS_QUERY = gql`
	{
		getPosts{
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