import React from 'react';
import './App.css';
import SearchInput from './js/components/container/SearchInput.jsx';
import Result from './js/components/container/Result.jsx';
import Query from '../solr-js/solr';
import Gitcoin from '../img/gitcoin.svg'

const fields = ['cache','title','url','content','tstamp','_version_','anchor','digest','host','boost','id'];
class App extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      search: '',
      query: this.initQuery(),
      results: [],
      error: false,
      isLoading: false,
      
    };
    this.updateURLParams = this.updateURLParams.bind(this);
    this.getResults = this.getResults.bind(this);
  }

  initQuery(){
    const url = `https://ethsear.ch:8984`;
    const path = `/solr/nutch/select`;

    let query = new Query(url, path);
    query.fields = fields;
    query.rows = 10;
    query.offset = 0;

    return query;
  }

  onNewSearch (search) {
    this.clearSearchResults();
    this.setState({search: search});
    this.state.query.query = 'content:' + search;
    this.initSearchResults();
  }

  updateURLParams(search){
    var url = new URL([window.location.protocol, '//', window.location.host, location.pathname].join(''));
    url.searchParams.append('search', search);
    window.location.href = url;
  }

  initSearchResults(){
    //need results to fill the page to create a scroll bar, solr queries are limited to 10 results per request
    for(let i = 0; i < 3; i++)this.getResults();
  }

  clearSearchResults(){
    this.setState({
      results: []
    });
  }

  getResults(){
    if(this.state.query.hasNext()){
      this.setState({ isLoading: true });
      this.state.query.next().then((response) => {
        this.setState({
          isLoading: false,
          results: [
            ...this.state.results,
            ...response.response.docs,
          ],
        });
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          error: error.message,
          isLoading: false,
        });
      });
    }
  }

  componentDidMount() {
    //detect when the scroll window has reached the bottom
    window.addEventListener('scroll', (event) => {
      if ((window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 1000)) {
        this.getResults();
      }
    });

    let urlParams = new URLSearchParams(window.location.search);
    let urlParam = urlParams.get('search');
    if(urlParam !== null){
      this.setState({urlParam: urlParam});
      this.onNewSearch(urlParam);
    }
  }

  render() {
    return (
      <div className="App">
        <div className="form-row justify-content-center">
          <a href="https://gitcoin.co/grants/240/ethsearch">
            <img className='grants' src={Gitcoin}/>
          </a>
        </div>
        <SearchInput value={this.state.urlParam} parentCallback = {this.updateURLParams}/>
        {
          this.state.results.map((item, index) => (
            <Result key={index} result={item} fields={fields}/>
          ))
        }
       </div>
    );
  }
}

export default App;
