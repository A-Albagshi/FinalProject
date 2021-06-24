import React, { useEffect, useState } from 'react';
import firebase from '../config/firebaseConfig';
import Card from './Card';

const Posts = () => {
	const [posts, setPosts] = useState([]);
	const [loading, setLoading] = useState(false);

	const ref = firebase.firestore().collection('posts');

	let getPosts = () => {
		setLoading(true);
		ref.onSnapshot((querySnapshot) => {
			const items = [];
			querySnapshot.forEach((doc) => {
				items.push(doc.data());
			});
			setPosts(items);
			setLoading(false);
		});
	};

	useEffect(() => {
		getPosts();
	}, []);

	return (
		<div className="my-3">
			<header>
				<h1>Blog Posts</h1>
			</header>

			<div className='posts'>
				{loading ? <h1>Loading...</h1> : null}
				{posts.length > 0
					? posts.map((post, index) => <Card post={post} key={post.id||index} index={index + 1} />)
					: null}
			</div>
		</div>
	);
};

export default Posts;
