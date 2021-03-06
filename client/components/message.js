import React, {Component} from 'react';
import {Tabs, Tab} from 'react-bootstrap'

export default class Message extends Component {
  constructor(){
    super()
    this.state={
      messageDisplayed:false
    }
    this.showOriginalMessage=this.showOriginalMessage.bind(this)
  }
    

  showOriginalMessage(){
    var displayed = this.state.messageDisplayed
    // console.log("oldState", displayed)
    // console.log("not displayed", !displayed)
    this.setState({
      messageDisplayed:!displayed
    })
  }

    render(){
    const message = this.props.message;
    const translatedMessage =this.props.translatedMessage
    const id =this.props.id
    const name = this.props.author.name
    const image = this.props.author.image
    const showOriginalMessage = this.props.showOriginalMessage
    const userId = this.props.userId
    const author=this.props.author
    const authorId =this.props.author.id
    // console.log("the USER ID OF THIS Page",userId)
    // console.log("The AuthorID of this message", authorId)
    // console.log('T H E  M E S S A G E', message)
    // console.log("ORIGINAL NON-TRANLATED MESSAGE DISPLAYED",this.state.messageDisplayed)
    // console.log(showOriginalMessage)

    return (
      <li className="media">
        <div className="media-left">
          <a href="#">
            <img className="media-object" src={image}  alt="image" />
          </a>
        </div>
        <div className="media-body">
          <h4 className="media-heading">{name}</h4>
          {
            +userId===+authorId? 
              <strong>{message}</strong>
            :
              <div>
                <strong>{translatedMessage}</strong>
                <br/>
                <a onClick={(e)=>this.showOriginalMessage(e)} style={{cursor:'pointer'}}>
                <small>Show Original Message</small>
                </a>
                  {
                  this.state.messageDisplayed?
                    <div id="originalMessageDiv" >
                      <small>Original Message: {message}</small>
                    </div>
                    :
                    null
                  }
              </div>
          }
            {/*<strong>{translatedMessage}</strong>*/}
            {/*
              +userId===+authorId? null:
                <div>
                  <br/>
                  <a onClick={(e)=>this.showOriginalMessage(e)} style={{cursor:'pointer'}}>
                  <small>Show Original Message</small>
                  </a>
                  {
                    //displays the original  messages only when user clicks, else, nothing 
                  this.state.messageDisplayed?
                    <div id="originalMessageDiv" >
                      <small>Original Message: {message}</small>
                    </div>
                    :null
                  }
      
                </div>
                */}
          {/*<br/>
          <a onClick={(e)=>this.showOriginalMessage(e)} style={{cursor:'pointer'}}>
          <small>Show Original Message</small>
          </a>
          {
            //displays the original  messages only when user clicks, else, nothing 
          this.state.messageDisplayed?
            <div id="originalMessageDiv" >
              <small>Original Message: {message}</small>
            </div>
            :null
          }
        */}
        </div>
      </li>
    );
}
  // return (
  //   <li className="media" className="col-md-6"  style={{border: "3px solid black"}}>
  //     <div className="media-left">
  //       <a href="#">
  //         <img className="media-object"  alt="image" />
  //       </a>
  //     </div>
  //     <div className="media-body">
  //       <h4 className="media-heading">AUTHOR NAME</h4>

  //       <Tabs defaultActiveKey={2} className="col-md-6" id="uncontrolled-tab-example">
  //       <Tab eventKey={1} title="Tab 1">{translatedMessage}</Tab>
  //       <Tab eventKey={2} title="Original Text">{message}</Tab>
  //       </Tabs>
  //     </div>
  //   </li>
  // );






}