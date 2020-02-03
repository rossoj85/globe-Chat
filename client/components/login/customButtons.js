import React from "react";
import {createButton} from "react-social-login-buttons";
 
const configFB = {
  text: "Signup with Facebook",
  icon: "facebook",
  iconFormat: name => `fa fa-${name}`,
  style: { background: "#3b5998" },
  activeStyle: { background: "#293e69" }
};

const configGoog ={
    text: "Signup with Google",
    icon: "google",
    iconFormat: name => `fa fa-${name}`,
    style: { background: "#CB4023" },
    activeStyle: { background: "#A33422" }
  };
/** My Facebook login button. */
export const FacebookSignupButton = createButton(configFB);
export const GoogleSignupButton = createButton(configGoog)
// export default MyFacebookLoginButton;