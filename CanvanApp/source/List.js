import React,{Component, PropTypes} from "react";
import Card from "./Card";
import { DropTarget } from 'react-dnd';

class List extends Component{
	render(){
		const { connectDropTarget } = this.props;
		var cards=this.props.cards.map(
			(card)=>{
				return <Card cardCallbacks={this.props.cardCallbacks} key={card.id} taskCallbacks={this.props.taskCallbacks} {...card}/>
			}
		);

		return connectDropTarget(
			<div className="list">
				<h1>{this.props.title}</h1>
				{cards}
			</div>
			); 
	}
}
const listTargetSpec = {
  	hover(props, monitor) {
    	const draggedId = monitor.getItem().id;
    	props.cardCallbacks.updateStatus(draggedId, props.id)
  	}
};

function collect(connect, monitor) {
  	return {
    	connectDropTarget: connect.dropTarget()
	};
}


List.propTypes={title:PropTypes.string.isRequired,
				cards: PropTypes.arrayOf(PropTypes.object),
				taskCallbacks:PropTypes.object,
				cardCallbacks:PropTypes.object,
				connectDropTarget:PropTypes.func.isRequired
				}
export default DropTarget("card", listTargetSpec, collect)(List);
