import React, { useState } from 'react';
import firebase from '../../config/firebaseConfig';
import { useHistory } from 'react-router-dom';

const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const history = useHistory();

	const login = () => {
		firebase
			.auth()
			.signInWithEmailAndPassword(email, password)
			.then(() => {
				resetInput();
				history.push('/');
			})
			.catch((err) => {
				console.error(err);
			});
	};

	const resetInput = () => {
		setEmail('');
		setPassword('');
	};

	return (
		<>
			<div className='container my-3'>
				<h1>Login</h1>
				<div className='mb-3'>
					<label htmlFor='email' className='form-label'>
						Email
					</label>
					<input
						id='email'
						type='email'
						value={email}
						className='form-control'
						onChange={(e) => setEmail(e.target.value)}
						placeholder='email'
					/>
				</div>
				<div className='mb-3'>
					<label htmlFor='password' className='form-label'>
						Password
					</label>
					<input
						id='password'
						type='password'
						value={password}
						className='form-control'
						onChange={(e) => setPassword(e.target.value)}
						placeholder='password'
					/>
				</div>
				<button className='btn btn-primary' onClick={login}>
					Login
				</button>
			</div>
		</>
	);
};

export default Login;
