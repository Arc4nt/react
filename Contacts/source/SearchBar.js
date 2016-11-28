import React, {Component, PropTypes} from "react";


class SearchBar extends Component{
	handleChange(event){
		this.props.onUserInput(event.target.value);
	}
	render(){
		return (
			<input type="search" placeholder="search" onChange={this.handleChange.bind(this)} value={this.props.filterText}/>
			);
	}
}

SearchBar.propTypes={
	filterText:PropTypes.string.isRequired,
	onUserInput:PropTypes.func.isRequired
}
export default SearchBar;