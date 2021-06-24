import React, { useEffect, useState, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import firebase from '../config/firebaseConfig';
import { AuthContext } from './Auth/Auth';
import { useHistory } from 'react-router-dom';

const PostDetails = () => {
	let { id } = useParams();
	const [post, setPost] = useState({});
	const ref = firebase.firestore().collection('posts');
	const { currentUser } = useContext(AuthContext);
	const history = useHistory();

	let getPost = () => {
		ref
			.where('id', '==', id)
			.get()
			.then((querySnapshot) => {
				querySnapshot.forEach((doc) => {
					setPost(doc.data());
				});
			})
			.catch((error) => {
				console.log('Error getting documents: ', error);
			});
	};

	let deletePost = () => {
		ref
			.where('id', '==', id)
			.get()
			.then((querySnapshot) => {
				querySnapshot.forEach((doc) => {
					doc.ref.delete();
				});
			})
			.then(() => {
				console.log('success');
				history.push('/');
			})
			.catch((error) => {
				console.log('Error Deleting document: ', error);
			});
	};

	useEffect(() => {
		getPost();
	}, []);
	return (
		<div className='container my-5'>
			{post ? (
				<div className='card my-5'>
					<img src={post.img} className='card-img-top' alt={post.title} />
					<div className='card-body'>
						<h5 className='card-title'>{post.title}</h5>
						<p className='card-text'>{post.body}</p>
						<br />
						<div className='d-flex align-items-center justify-content-between'>
							<div className='creator'>
								<p className='fw-light'>{post.creatorEmail}</p>
								<p className='card-text'>
									<small className='text-muted'>Create At {post.date}</small>
								</p>
							</div>
							{currentUser && currentUser.email == post.creatorEmail ? (
								<div>
									<Link to={`/postupdate/${post.id}`}>
										<button className='mx-4 btn btn-info text-white'>
											Update Post
										</button>
									</Link>
									<button
										className='btn btn-danger text-white'
										onClick={deletePost}
									>
										Delete Post
									</button>
								</div>
							) : null}
						</div>
					</div>
				</div>
			) : (
				<h1>loading ... </h1>
			)}
			<br />
		</div>
	);
};

export default PostDetails;
