import React, {Component} from 'react'
import {connect} from 'react-redux';
import store, {writeName} from '../store'

class NameEntry extends Component {

  
    render(){
        const {name} = this.props
        console.log("NAME FORM NAME ENTRY",name)
        console.log("NAME ENTRY PROPS", this.props)
        return(
            <form className="form-inline">
                <label htmlFor="name">Your name</label>
                <input
                    onChange={this.props.handleChange}
                    onSubmit={this.props.handleSubmit}
                    value={name}
                    type="text"
                    name="name"
                    placeholder="Enter your name"
                    className = "form-control"
                />
            </form>

        )
    }
}

const mapState = (state, ownProps)=>{
    // console.log("OWN PROPS", ownProps)
    return{
        name: state.navbar.name
    }
}
const mapDispatch=(dispatch)=>{
    return{
        handleChange(evt){
            evt.preventDefault()
            const nameValue = evt.target.value
            const action = writeName(nameValue)
            dispatch(action)
        },
        handleSubmit(evt){
            evt.preventDefault()
            const nameValue= evt.target.value
            const action = writeName(nameValue)
            dispatch(action)
        }

    }
}

export default connect(mapState, mapDispatch)(NameEntry)