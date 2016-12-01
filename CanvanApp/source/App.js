import React from "react";
import KanbanBoardContainer from "./KanbanBoardContainer";
import {Router,Route} from "react-router";
import createBrowserHistory from "history/lib/createBrowserHistory";
import KanbanBoard from "./KanbanBoard";
import EditCard from "./EditCard";
import NewCard from "./NewCard";


React.render((
			<Router history={createBrowserHistory()}>
				<Route component={KanbanBoardContainer}>
					<Route path="/" component={KanbanBoard}>
						<Route path="new" component={NewCard}/>
						<Route path="edit/:card_id" component={EditCard}/>
					</Route>
				</Route>
			</Router>
			), document.getElementById("root"));