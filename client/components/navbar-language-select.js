import React, { Component } from 'react';


export default class NavbarLanguageSelect extends Component {

  render () {
    //   console.log("NavbarLanguageSelect PROPS", this.props)
      
    return (
      <div>
        <form>
        <label>Select Your Language</label>
        <select
        onChange={this.props.handleLanguageChange}
                                            >
            <option value='en'>English</option>
            <option value='zh-CN'>Chinese(Simplified)</option>
            <option value='fr'>French</option>
            <option value='de'>German</option>
            <option value='es'>Spanish</option>
            <option value='ja'>Japanese</option>
            <option value='th'>Thai</option>
        </select>
        </form>
      </div>
    );
  }
}



/*
Arabic	ar
Bengali	bn
Chinese (Simplified)	zh-CN
Chinese (Traditional)	zh-TW
English	en
French	fr
German	de
Italian	it
Japanese	ja
Korean	ko
Portuguese	pt
Russian	ru
Spanish	es
Thai	th
Turkish	tr
*/