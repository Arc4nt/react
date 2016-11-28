import React,{Component} from "react";
import About from "./About";
import Home from "./Home";
import Repos from "./Repos";
import { Router, Route, IndexRoute, Link } from 'react-router';
import ReposDetails from './ReposDetails';
import ServerError from "./ServerError";
import createBrowserHistory from 'history/lib/createBrowserHistory';

class App extends Component{
	render(){ 
		var Child;

		return ( 
			<div>
				<header> App</header>
				<menu>
					<ul>
						<li><Link to="/about" activeClassName="active">About</Link></li>
						<li><Link to="/repos" activeClassName="active">Repos</Link></li>
					</ul>
				</menu>
				{this.props.children}
			</div>
		)
	}
}
React.render((<Router history={createBrowserHistory()}>
				<Route path="/" component={App}>
					<IndexRoute component={Home}/>
					<Route path="about" component={About} title={"About Us"}></Route>
					<Route path="repos" component={Repos}>
						<Route path="/repo/:repo_name" component={ReposDetails}/>
					</Route>
					<Route path="error" component={ServerError}/>
				</Route>
			</Router>), document.getElementById("root"));