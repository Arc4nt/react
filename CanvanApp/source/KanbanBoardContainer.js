import React,{Component} from "react";
import KanbanBoard from "./KanbanBoard";
import "whatwg-fetch";
import "babel-polyfill";
import update from "react-addons-update";
const API_URL="cards.json";
import {throttle} from './utils';


class KanbanBoardContainer extends Component{
	
	constructor(){		
		super(...arguments);
		this.state={cards:[]};
		  // Only call updateCardStatus when arguments change
    this.updateCardStatus = throttle(this.updateCardStatus.bind(this));
    // Call updateCardPosition at max every 500ms (or when arguments change)
    this.updateCardPosition = throttle(this.updateCardPosition.bind(this),500);

	}

	addCard(card){
		let prevState=this.state;
		if(card.id===null){
			let card=Object.assingn({},card,{id:Date.now()});
		}
		let nextState=update(this.state.cards,{$push:[card]});
		this.setState({cards:nextState})
	}

	updateCard(card){
		let prevState=this.state;
		let cardIndex=this.state.cards.findIndex((c)=>c.id==card.id);
		let nextState=update(this.state.cards,{
			[cardIndex]:{
				$set:card
			}
		});
		this.setState({cards:nextState});
	}

	updateCardStatus(cardId,listId){
		let cardIndex=this.state.cards.findIndex((card)=>card.id==cardId);
		let card=this.state.cards[cardIndex];
		if(card.status!==listId){
			this.setState(update(this.state,{
				cards:{
					[cardIndex]:{
						status:{$set:listId}
					}
				}	
			}));
		}
	}

	updateCardPosition(cardId,afterId){
		if(cardId!=afterId){
			let cardIndex=this.state.cards.findIndex((card)=>card.id==cardId);
			let afterIndex= this.state.cards.findIndex((card)=>card.id==afterId);
			let card=this.state.cards[cardIndex];
			this.setState(update(this.state,{
				cards:{
					$splice:[[cardIndex,1],[afterIndex,0,card]]
				}
			}))

		}
	}

	addTask(cardId, taskName){
		let cardIndex=this.state.cards.findIndex((card)=>card.id==cardId);
		let newTask={id:Date.now(),name:taskName,done:false};
		let nextState=update(this.state.cards,{
			[cardIndex]:{
				tasks:{
					$push:[newTask]
				}
			}
		});
		this.setState({cards:nextState});
	}

	deleteTask(cardId,taskId,taskIndex){
		console.log(this);
		let cardIndex=this.state.cards.findIndex((card)=>card.id==cardId);
		let nextState=update(this.state.cards,{
			[cardIndex]:{
				tasks:{
					$splice:[[taskIndex,1]]
				}
			}
		});
		this.setState({cards:nextState});
	}
	
	toggleTask(cardId,taskId,taskIndex){
		let cardIndex=this.state.cards.findIndex((card)=>card.id==cardId);
		let newDoneValue;
		let nextState=update(this.state.cards,{
			[cardIndex]:{
				tasks:{
					[taskIndex]:{
						done:{
							$apply: (done)=>{
								newDoneValue=!done;
								return newDoneValue;
							}
						}
					}
				}
			}
		});
		this.setState({cards:nextState});
	}

	render(){
		let kanbanBoard=this.props.children&&React.cloneElement(this.props.children,{
			cards:this.state.cards,
			taskCallbacks:{
				toggle:this.toggleTask.bind(this),
				delete:this.deleteTask.bind(this),
				add:this.addTask.bind(this)
			},
			cardCallbacks:{
				addCard:this.addCard.bind(this),
				updateCard:this.updateCard.bind(this),
				updateStatus:this.updateCardStatus.bind(this),
				updatePosition:throttle(this.updateCardPosition.bind(this),500)
			}
		})
		return kanbanBoard;
	}

	componentDidMount(){
		fetch(API_URL).
		then((response)=>response.json()).
		then((responseData)=>{
			this.setState({cards:responseData})
		}).
		catch((error)=>{
			console.log("error fetching and parsing the data", error);
		});
	}

}

export default KanbanBoardContainer;