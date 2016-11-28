import React, {Component, PropTypes} from "react";


class ContactItem extends Component{
	render(){
		return (
			<li>{this.props.email}-{this.props.name}</li>
			);
	}
}
ContactItem.propTypes={
	name:PropTypes.string.isRequired,
	email:PropTypes.string.isRequired
}
export default ContactItem;