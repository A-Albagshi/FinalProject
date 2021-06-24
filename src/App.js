import React, { useContext } from 'react';
import './App.css';
import AddPost from './Components/AddPost';
import { AuthContext } from './Components/Auth/Auth';
import { Route, Switch, Redirect } from 'react-router-dom';
import Login from './Components/Auth/Login';
import Posts from './Components/Posts';
import Register from './Components/Auth/Register';
import PostDetails from './Components/PostDetails';
import UpdatePost from './Components/UpdatePost';

function App() {
	const { currentUser } = useContext(AuthContext);

	return (
		<div className='App'>
			<Switch>
				<Route exact path='/' component={Posts} />
				<Route exact path='/login' component={Login} />
				<Route exact path='/register' component={Register} />
				<Route exact path='/postdetails/:id' component={PostDetails} />
				{currentUser != null ? (
					<>
						<Route exact path='/post/add' component={AddPost} />
						<Route exact path='/postupdate/:id' component={UpdatePost} />
					</>
				) : (
					<Redirect to={{ pathname: '/login' }} />
				)}
			</Switch>
		</div>
	);
}

export default App;
