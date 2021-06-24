import React from 'react';
import { Link } from 'react-router-dom';

const Card = ({ post, index }) => {
	return (
		<>
			<div className={`post-${index}`}>
				<Link key={post.id} to={`/postdetails/${post.id}`} className='card'>
					<div
						className='post-img'
						style={{
							backgroundImage: `url("${post.img}")`,
						}}
					></div>
					<article>
						<h1>{post.title}</h1>
						<div className=''>
							<span>{post.creatorEmail}</span>
							<br />
							<span>{post.date}</span>
						</div>
					</article>
				</Link>
			</div>
		</>
	);
};

export default Card;
