import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import { AuthProvider } from './Components/Auth/Auth';
import { BrowserRouter as Router } from 'react-router-dom';
import NavBar from './Components/NavBar';

ReactDOM.render(
	<React.StrictMode>
		<AuthProvider>
			<Router>
				<NavBar />
				<App />
			</Router>
		</AuthProvider>
	</React.StrictMode>,
	document.getElementById('root')
);
