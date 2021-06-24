import React, { useState } from 'react';
import firebase from '../../config/firebaseConfig';

const Register = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const register = () => {
		firebase
			.auth()
			.createUserWithEmailAndPassword(email, password)
			.then(() => {
				resetInput();
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
				<h1>Register</h1>
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
                    id="password"
						type='password'
						value={password}
						className='form-control'
						onChange={(e) => setPassword(e.target.value)}
						placeholder='password'
					/>
				</div>
				<button className="btn btn-primary" onClick={register}>Register</button>
			</div>
		</>
	);
};

export default Register;
