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

  handleDelete(idToDelete) {
    const { store } = this.state;
    store.lists.forEach(list => {
      list.cardIds = list.cardIds.filter(id => id !== idToDelete)
    });
    
    delete store.allCards[idToDelete];
    
    this.setState({ store });
  }

  newRandomCard = () => {
    const id = Math.random().toString(36).substring(2, 4)
      + Math.random().toString(36).substring(2, 4);
    return {
      id,
      title: `Random Card ${id}`,
      content: 'lorem ipsum',
    }
  }

  handleAdd(idToAdd) {
    const newC = this.newRandomCard()
    const { store } = this.state;

    store.lists.find(list => list.id === idToAdd)
      .cardIds.push(newC.id)

    store.allCards[newC.id] = newC

    this.setState({ store })
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
              onDelete={id => this.handleDelete(id)}
              onAdd={() => this.handleAdd(list.id)}
            />
          ))}
        </div>
      </main>
    );
  }
}

export default App;
