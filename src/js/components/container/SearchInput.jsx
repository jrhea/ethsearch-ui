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
        <div className="form-row justify-content-center">
            <div id="search-div" className="input-group my-3 w-100">
                <input id='search-input' value={this.state.search} type="text" className="form-control" placeholder="Ethsear.ch" onChange={this.handleChange} onKeyDown={this.onEnter} />
                <div className="input-group-append">
                    <button className="btn btn-primary" type="button" onClick={this.onSearch.bind()}>
                      {'Search'}
                    </button>
                </div>
            </div>
        </div>
    );
  }
}

export default SearchInput;