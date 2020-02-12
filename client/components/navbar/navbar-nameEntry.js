
// DEAD CODE, REPLACED WITH SIGNIN AND AUTH




// import React, {Component} from 'react'
// import {connect} from 'react-redux';
// import store, {writeName, setUserNameAndId} from '../store'

// class NameEntry extends Component {
//     constructor(){
//         super()
//         this.state={
//           localName: ''
//         }
//         this.handleBlur=this.handleBlur.bind(this)
//       }
        
//      handleBlur(evt){
//          console.log("FOCUS LOST")
//          const finalName=evt.target.value
//          const action=setUserNameAndId(finalName)
//          store.dispatch(action)
//      } 
//     render(){
//         const {name} = this.props
//         // console.log("NAME FORM NAME ENTRY",name)
//         // console.log("NAME ENTRY PROPS", this.props)
//         // console.log("NAME", name)
//         console.log('NAVBAR NAME ENTRY MOUNTED!!!!@@#!')
//         return(
//             <div>
            
//             <form className="form-inline" ref="nameSubmit"
//             onSubmit={(evt) => evt.preventDefault()}
            
//             >
//                 <label htmlFor="name">Your name</label>
//                 <input
//                     onChange={this.props.handleChange}
//                     onBlur={this.handleBlur}
//                     value={name}
//                     type="text"
//                     name="name"
//                     placeholder="Enter your name"
//                     className = "form-control"
//                 />
//             </form>
            
//             </div>
//         )
//     }
// }

// const mapState = (state, ownProps)=>{
//     // console.log("OWN PROPS", ownProps)
//     return{
//         name: state.navbar.name
//     }
// }
// const mapDispatch=(dispatch)=>{
//     return{
//         handleChange(evt){
//             evt.preventDefault()
//             evt.stopPropagation();
//             const nameValue = evt.target.value
//             const action = writeName(nameValue)
//             dispatch(action)
//         },
//     }
// }

// export default connect(mapState, mapDispatch)(NameEntry)

