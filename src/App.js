import React, { Component } from 'react';
import PageSwitcher from './components/PageSwitcher';

export default class App extends Component {
   constructor(props) {
      super(props);

      this.state = {
         index: 0
      };

      this._onChange = this._onChange.bind(this);
   }

   _onChange(index) {
      this.setState({
         index
      });
   }

   _styleGenerator(ratio) {
      return {
         opacity: 1 - ratio
      };
   }

   render() {
      return (
         <PageSwitcher
            width={ 600 }
            height={ 600 }
            threshold={ 300 }
            onChange={ this._onChange }
            index={ this.state.index }
            loop={ false }
            styleGenerator={ this._styleGenerator }
         >
            <div
               style={{
                  width: '100%',
                  height: '100%',
                  backgroundColor: '#faa'
               }}
            />
            <div
               style={{
                  width: '100%',
                  height: '100%',
                  backgroundColor: '#afa'
               }}
            />
            <div
               style={{
                  width: '100%',
                  height: '100%',
                  backgroundColor: '#aaf'
               }}
            />
         </PageSwitcher>
      );
   }
}
