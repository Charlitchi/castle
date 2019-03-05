import React, { Component } from 'react';
import ReactTable from "react-table";
import logo from './logo.svg';
import RCdata from './listComparedWithPrices.json'
import 'react-table/react-table.css'
import './App.css';


class Table extends React.Component {
  render() {
    const columns = [{
      Header: 'Hotel name',
      accessor: 'nameRestaurant'
    }, {
      Header: 'Price',
      accessor: 'price',
      Cell: props => <span className='number'>{props.value} €</span>
    }, {
      Header: 'Chefs',
      accessor: 'nameChef'
    }, {
      Header: 'URL',
      accessor: 'urlHotel',
      Cell: props => <a href={props.value}>{props.value}</a>
    }];
    return(
      <ReactTable
        data={RCdata}
        columns={columns}
      />
    );
  }
}



class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload the new file.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>

        </header>


        <div id='Table'>
          <Table/>

        </div>
      </div>
    );
  }
}

export default App;
