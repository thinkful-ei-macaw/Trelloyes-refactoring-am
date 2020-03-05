import React, { Component } from 'react';
import List from './List/List';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      store: props.store
    }
  }

  static defaultProps = {
    store: {
      lists: [],
      allCards: {},
    }
  };

  onDelete(idToDelete) {
    const { store } = this.state;
    store.lists.forEach(list => {
      list.cardIds = list.cardIds.filter(id => id !== idToDelete)
    });
    
    delete store.allCards[idToDelete];
    
    this.setState({ store });
  }

  render() {
    const { store } = this.state
    return (
      <main className='App'>
        <header className='App-header'>
          <h1>Trelloyes!</h1>
        </header>
        <div className='App-list'>
          {store.lists.map(list => (
            <List
              key={list.id}
              header={list.header}
              cards={list.cardIds.map(id => store.allCards[id])}
              onDelete={id => this.onDelete(id)}
            />
          ))}
        </div>
      </main>
    );
  }
}

export default App;
