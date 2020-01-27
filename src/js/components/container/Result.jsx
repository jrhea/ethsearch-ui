import React from 'react';
import './Result.css'

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

class Result extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

// Example of a result prop below
/*
tstamp: ["2020-01-17T22:47:27.878Z"]
digest: ["dea81b1f71cc20dcef8208f613ff1cfa"]
host: ["ethereum-magicians.org"]
boost: [0.15777731]
id: "https://ethereum-magicians.org/t/council-of-paris-eips-ecosystem-standards/2835"
title: ["[Council of Paris] EIPs & Ecosystem Standards - Council Sessions - Fellowship of Ethereum Magicians"]
url: ["https://ethereum-magicians.org/t/council-of-paris-eips-ecosystem-standards/2835"]
content: ["[Council of Paris] EIPs & Ecosystem Standards - Co… Discourse , best viewed with JavaScript enabled↵"]
_version_: 1656020265091465200
*/

static getDerivedStateFromProps(nextProps, prevState){
  let date = new Date(nextProps.result.tstamp);
  return {date: date};
}

  render() {
    return (
      <div className="row justify-content-center">
        <div className="card w-100 mb-2 shadow-sm">
          <div className="card-body">
            <div id='title' className="entry">
              {(this.props.result.title !== undefined)? this.props.result.title[0] : ''}
            </div>
            <hr/>
            <div className="entry">
              <a target='_blank' href={(this.props.result.url[0])? this.props.result.url[0] : ''}>
                {(this.props.result.url[0])? this.props.result.url[0] : ''}
              </a>
            </div>
            <div className='container-fluid' id='bottom-result'>
                <div className='row'>
                  <div className='col text-left nopadding'>
                    {(this.props.result.host !== undefined)? this.props.result.host[0] : ''}
                  </div>
                  <div className='col nopadding text-right'>
                    {
                      //monthNames[this.state.date.getMonth()] + ' ' + this.state.date.getDate() + ', ' + this.state.date.getFullYear()
                    }
                  </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Result;