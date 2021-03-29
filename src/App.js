import React, { Component } from 'react';
import TodoContact from './components/TodoContact';
import ContactsList from './components/ContactsList';
import Filter from './components/Filter';

import shortid from 'shortid';

class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    // name: '',
    // number: '',
    filter: '',
  };

  addContact = (name, number) => {
    const todo = {
      id: shortid.generate(),
      name,
      number,
    };
    const { contacts } = this.state;
    const alreadyInContacts = contacts.find(
      contact => contact.name === todo.name,
    );
    if (alreadyInContacts) {
      alert(`${alreadyInContacts.name} is already in contacts.`);
      return;
    }

    this.setState(prevState => ({
      contacts: [todo, ...prevState.contacts],
    }));
  };

  ChangeFilter = e => {
    const { value } = e.currentTarget;

    this.setState({ filter: value });
  };

  deleteContact = todoId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(todo => todo.id !== todoId),
    }));
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);

    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('Add componentDidUpdate');

    if (this.state.contacts !== prevState.contact) {
      console.log('Обновились контакты');

      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  render() {
    const normalizedFilter = this.state.filter.toLowerCase();
    const visibleTodos = this.state.contacts.filter(todo =>
      todo.name.toLowerCase().includes(normalizedFilter),
    );

    return (
      <>
        <TodoContact onSubmit={this.addContact} />
        <Filter value={this.state.filter} onChange={this.ChangeFilter} />
        <ContactsList
          contacts={visibleTodos}
          onDeleteContact={this.deleteContact}
        />
      </>
    );
  }
}

export default App;
