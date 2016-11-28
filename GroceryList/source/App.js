
 var React=require("react");
 var ReactDom=require("react-dom");
class GroceryList extends React.Component {
  render() {
  	
    return (
	    <ul>
	    	<ListItem quantity="1" name="Bread"/>
	    	<ListItem quantity="3" name="Milk"/>
	    	<ListItem quantity="14" >Butter</ListItem>
	    </ul>
    );
  }
}
class ListItem extends React.Component {
	render(){
		return (
			<li>
				{this.props.quantity} x {this.props.name||this.props.children}
			</li>
		);
	}
}
ReactDom.render(<GroceryList />, document.getElementById('root'));
