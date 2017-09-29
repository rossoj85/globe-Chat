import React from 'react';
import {Tabs, Tab} from 'react-bootstrap'

export default function Message (props) {

  const message = props.message;
  const translatedMessage =props.translatedMessage
  const id =props.id
  const name = props.author.name
  const image = props.author.image

  return (
    <li className="media">
      <div className="media-left">
        <a href="#">
          <img className="media-object" src={image}  alt="image" />
        </a>
      </div>
      <div className="media-body">
        <h4 className="media-heading">{name}</h4>

     
        <small>Original Message: {message}</small>
        <br />


        <strong>{translatedMessage}</strong>
      </div>
    </li>
  );

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