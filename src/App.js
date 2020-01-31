import React from 'react';
import './App.css';
import SearchInput from './js/components/container/SearchInput.jsx';
import Result from './js/components/container/Result.jsx';
import Query from '../solr-js/solr';
import Gitcoin from '../img/gitcoin.svg'
import Github from '../img/github.svg'

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
        <nav className="navbar navbar-expand-md fixed-top navbar-dark bg-primary">
            {/* <a href="/" className="navbar-brand">ethsearch</a> */}
            <SearchInput value={this.state.urlParam} parentCallback = {this.updateURLParams}/>
            <div className="navbar-collapse collapse flex-shrink-1 flex-grow-0 order-last" id="navbar7">
              <ul className="navbar-nav">
                  <li className="nav-item">
                      <a className="nav-link " href="https://github.com/ethsearch" target="_blank">
                        <img className='github' src={Github}/>
                        <sub className='github-text text-white'>Github</sub>
                      </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="https://gitcoin.co/grants/240/ethsearch" target="_blank">
                        <img className='gitcoin' src={Gitcoin}/>
                        <sub className='donate-text text-white'>Donate</sub>
                    </a>
                  </li>
              </ul>
            </div>
            <button className="navbar-toggler order-1" type="button" data-toggle="collapse" data-target="#navbar7">
              <span className="navbar-toggler-icon"></span>
            </button>
        </nav>
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
