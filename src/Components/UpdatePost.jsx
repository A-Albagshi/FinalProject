import React, { useState, useEffect, useContext } from 'react';
import firebase from 'firebase';
import { AuthContext } from './Auth/Auth';
import { useHistory, useParams } from 'react-router-dom';
var uniqid = require('uniqid');

const UpdatePost = () => {
	let { id } = useParams();
	const [first, setFirst] = useState(true);
	const [title, setTitle] = useState('');
	const [body, setBody] = useState('');
	const [postImg, setPostImg] = useState('');
	const [post, setPost] = useState({});
	const ref = firebase.firestore().collection('posts');
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

	let setPostDetailsToState = () => {
		setTitle(
			document.getElementById('title').defaultValue ||
				document.getElementById('title').value
		);
		setBody(
			document.getElementById('body').defaultValue ||
				document.getElementById('body').value
		);
		setPostImg(
			document.getElementById('img').defaultValue ||
				document.getElementById('img').value
		);
	};

	useEffect(() => {
		getPost();
	}, []);

	const handelChange = (e) => {
		const target = e.target;
		const name = target.name;

		name === 'title'
			? setTitle(target.value)
			: name === 'body'
			? setBody(target.value)
			: setPostImg(target.value);
	};

	const updatePost = () => {
		ref
			.doc(post.id)
			.update({
				title:
					title ||
					document.getElementById('title').defaultValue ||
					document.getElementById('title').value,
				body:
					body ||
					document.getElementById('body').defaultValue ||
					document.getElementById('body').value,
				img:
					postImg ||
					document.getElementById('img').defaultValue ||
					document.getElementById('img').value,
			})
			.then(() => {
				console.log('update Success');
				history.push('/');
			})
			.catch((err) => {
				console.error(err);
			});
	};

	return (
		<div className='container my-5'>
			{post ? (
				<>
					<div className='mb-3'>
						<label htmlFor='title' className='form-label'>
							Post Title
						</label>
						<input
							defaultValue={post.title || ''}
							type='text'
							name='title'
							className='form-control'
							id='title'
							placeholder='Post Title 1'
							onChange={handelChange}
						/>
					</div>
					<div className='mb-3'>
						<label htmlFor='body' className='form-label'>
							Post Content
						</label>
						<textarea
							defaultValue={post.body || ''}
							name='body'
							className='form-control'
							id='body'
							rows='12'
							onChange={handelChange}
						></textarea>
					</div>
					<div className='mb-3'>
						<label htmlFor='img' className='form-label'>
							Post Image
						</label>
						<input
							defaultValue={post.img || ''}
							type='url'
							name='img'
							className='form-control'
							id='img'
							onChange={handelChange}
							pattern='https?://.+'
							required
						/>
					</div>
					<button
						type='button'
						className='btn btn-success'
						onClick={updatePost}
					>
						Update Post
					</button>
				</>
			) : (
				<h1>Loading ...</h1>
			)}
		</div>
	);
};

export default UpdatePost;
