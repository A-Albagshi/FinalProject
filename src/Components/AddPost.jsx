import React, { useState, useContext } from 'react';
import firebase from 'firebase';
import { AuthContext } from './Auth/Auth';
import { useHistory } from 'react-router-dom';
var uniqid = require('uniqid');

const AddPost = () => {
	const { currentUser } = useContext(AuthContext);
	const [title, setTitle] = useState('');
	const [body, setBody] = useState('');
	const [postImg, setPostImg] = useState('');
	const db = firebase.firestore();
	const history = useHistory();

	const handelChange = (e) => {
		const target = e.target;
		const name = target.name;
		name === 'title'
			? setTitle(target.value)
			: name === 'body'
			? setBody(target.value)
			: setPostImg(target.value);
	};

	const addPostToDB = () => {
		const creator = currentUser ? currentUser.uid : 'abdullah';
		const creatorEmail = currentUser ? currentUser.email : 'abdullah@gmail.com';
		const yourDate = new Date();
		let id = uniqid();
		if (title === '' || body === '' || postImg === '') {
			return;
		}
		db.collection('posts')
			.doc(id)
			.set({
				title: title,
				body: body,
				img: postImg,
				date: yourDate.toISOString().split('T')[0],
				id: id,
				creator: creator,
				creatorEmail: creatorEmail,
			})
			.then(() => {
				history.push('/');
			})
			.catch(() => {
				console.error('post Error');
			});
	};

	return (
		<div className='container my-5'>
			<div className='mb-3'>
				<label htmlFor='title' className='form-label'>
					Post Title
				</label>
				<input
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
					type='url'
					name='img'
					className='form-control'
					id='img'
					onChange={handelChange}
					pattern='https?://.+'
					required
				/>
			</div>
			<button type='button' className='btn btn-success' onClick={addPostToDB}>
				Post
			</button>
		</div>
	);
};

export default AddPost;
