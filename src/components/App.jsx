import '../index.css';
import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { GlobalStyle } from './GlobalStyle';
import { Layout } from './Layout';
import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import ContactList from './ContactList/ContactList';

const initialContacts = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];

export const App = () => {
  const [contacts, setContacts] = useState(() => {
    return (
      JSON.parse(window.localStorage.getItem('contacts')) ?? initialContacts
    );
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = ({ name, number }) => {
    for (const contact of contacts) {
      const normalizeStateName = contact.name.toLowerCase();
      const normalizedReceivedName = name.toLowerCase();

      if (normalizeStateName === normalizedReceivedName) {
        alert(`${name} is already in contacts.`);
        return contacts;
      }
    }
    setContacts(prevState => [...prevState, { id: nanoid(), name, number }]);
  };

  const deleteContact = contactId => {
    setContacts(prevState =>
      prevState.filter(contact => contact.id !== contactId)
    );
  };

  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  return (
    <Layout>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={addContact} />
      <h2>Contacts</h2>
      <Filter
        value={filter}
        onChange={evt => {
          setFilter(evt.currentTarget.value);
        }}
      />
      {contacts.length > 0 && (
        <ContactList items={getVisibleContacts()} onDelete={deleteContact} />
      )}
      <GlobalStyle />
    </Layout>
  );
};