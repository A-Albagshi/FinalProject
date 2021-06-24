import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from './Auth/Auth';
import firebase from '../config/firebaseConfig';

const NavBar = () => {
	const { currentUser } = useContext(AuthContext);

	return (
		<nav className='navbar navbar-expand-sm navbar-dark bg-dark'>
			<div className='container'>
				<NavLink className='navbar-brand' to='/'>
					Blog
				</NavLink>
				{currentUser != null ? (
					<ul className='navbar-nav'>
						<li className='nav-item'>
							<NavLink className='nav-link' to='/post/add'>
								Create Post
							</NavLink>
						</li>
						<li className='nav-item'>
							<NavLink
								className='nav-link'
								to='/post/add'
								onClick={() => {
									firebase.auth().signOut();
								}}
							>
								Logout
							</NavLink>
						</li>
					</ul>
				) : (
					<ul className='navbar-nav'>
						<li className='nav-item'>
							<NavLink className='nav-link' to='/login'>
								Login
							</NavLink>
						</li>
						<li className='nav-item'>
							<NavLink className='nav-link' to='/register'>
								Register
							</NavLink>
						</li>
					</ul>
				)}
			</div>
		</nav>
	);
};

export default NavBar;
