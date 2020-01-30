import React from 'react';
import './SearchInput.css'

class SearchInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {search: undefined, prevSearch: undefined};

    this.handleChange = this.handleChange.bind(this);
    this.onEnter = this.onEnter.bind(this);
    this.onSearch = this.onSearch.bind(this);
  }

  onEnter(e){
    if (e.key === 'Enter')this.onSearch();
  }

  handleChange(event) {
    this.setState({search: event.target.value});
  }
  
  onSearch(){
    if(this.state.prevSearch !== this.state.search){
      this.props.parentCallback(this.state.search);
      this.setState({prevSearch: this.state.search});
    }
  }

  static getDerivedStateFromProps(props, state){
    if(state.search === undefined && state.prevSearch === undefined){
      if(props.value != null) return {search: props.value};
    }
    return {};
  }

  render() {
    return (
      <div className="d-flex flex-grow-1">
        <div className="justify-content-center mr-2 my-auto w-100 d-inline-block order-0">
            <div id="search-div" className="input-group">
                <input id='search-input' className="form-control border border-right-0" value={this.state.search} type="text" placeholder="ethsear.ch" onChange={this.handleChange} onKeyDown={this.onEnter} />
                <span className="input-group-append">
                    <button className="btn btn-outline-light border border-left-0" type="button" onClick={this.onSearch.bind()}>
                      <i className="fa fa-search"></i>
                    </button>
                </span>
            </div>
        </div>
      </div>
    );
  }
}

export default SearchInput;