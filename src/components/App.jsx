import shortid from "shortid";

import ContactList from "./ContactLists/ContactLists";
import Filter from "./Filter/Filter";

import style from './App.module.css';
import { useState, useEffect } from "react";
import ContactForm from "./ContactForm/ContactForm";

export default function App() {

    const [contacts, setContacts] = useState(window.localStorage.getItem('contacts') ?? []);
    const [filter, setFilter] = useState('');

    useEffect(() => {
        window.localStorage.setItem('contacts', JSON.stringify(contacts));
    }, [contacts]);

    // componentDidMount() {

    //     const contacts = localStorage.getItem('contacts');
    //     const parsedContact = JSON.parse(contacts);

    //     if(parsedContact) {
    //         this.setState({ contacts: parsedContact });
    //     }
    // };

    const addContact = ( name, number ) => {
        const newContact = {
            id: shortid.generate(),
            name: name,
            number: number
        }

        const checkedName = contacts.find(contact => 
            contact.name.toLowerCase() === newContact.name.toLowerCase(),
            );

            if(checkedName) {
                alert(`${newContact.name} is already in contact.`)
                return;
            }

            setContacts([newContact, ...contacts]);
    };

        const changeFilter = e => {
            setFilter(e.currentTarget.value.trim())
        };

        const getVisibleContacts = () => {
            const normalizedFilter = filter.toLowerCase();
            return contacts.filter(contact =>
              contact.name.toLowerCase().includes(normalizedFilter)
            );
          };
        
          const deleteContact = contactId => {
            setContacts(contacts.filter(contact => contact.id !== contactId));
          };
        
          const visibleContacts = getVisibleContacts();
        


    return (
        <div className={style.container}>
            <h1>Phonebook</h1>
            <ContactForm onSubmit={addContact} />

            <h2>Contacts</h2>
            {contacts.length > 0 ? (
                <>
                    <Filter value={filter} onChange={changeFilter} />
                    <ContactList contacts={visibleContacts} onDeleteContact={deleteContact} />
                </>
            ): (
                <h1>Contact list is empty</h1>
            )} 

        </div>
    )

};



// class App extends Component {

//     state = {
//         contacts: [],
//         filter: '',
//       }

//       componentDidMount() {
//         console.log('Mount')

//         const contacts = localStorage.getItem('contacts');
//         const parsedContact = JSON.parse(contacts);

//         if(parsedContact) {
//             this.setState({ contacts: parsedContact });
//         }
//       }

//       componentDidUpdate(prevProps, prevState) {
//         console.log('Update');

//         if(this.state.contacts !== prevState.contacts) {
//             console.log('Update file contacts');
//             localStorage.setItem('contacts', JSON.stringify(this.state.contacts));

//         }

//         console.log(prevProps);
//         console.log(prevState);
//       }

//     deteleContact = (contactId) => {

//         this.setState(prevState => ({
//             contacts: prevState.contacts.filter(contact => contact.id !== contactId),
//         }))

//       }

//     addContact = ({ name, number }) => {
//         const { contacts } = this.state;

        
//         const newContact = {
//             id: shortid.generate(),
//             name: name,
//             number: number
//         }

//         const checkedName = contacts.find(contact => 
//             contact.name.toLowerCase() === newContact.name.toLowerCase(),
//             );

//             if(checkedName) {
//                 alert(`${newContact.name} is already in contact.`)
//                 return;
//             }


//         this.setState(prevState => ({
//             contacts: [newContact, ...prevState.contacts]
//         }))

//     }

//     changeFilter = e => {
//         this.setState({filter: e.currentTarget.value})
//     }

//     getFilterContact = () => {
//         const { contacts, filter } = this.state;

//         const normalizedFilter = filter.toLowerCase();

//         return contacts.filter(contact => 
//             contact.name.toLowerCase().includes(normalizedFilter),
//             );
//     }

//   render(){
//     const { filter, contacts } = this.state;

//     const filteredContacts = this.getFilterContact();

//     return (
//         <div className={style.container}>
//             <h1>Phonebook</h1>
//             <ContactForm onSubmit={this.addContact} />

//             <h2>Contacts</h2>
//             {contacts.length > 0 ? (
//                 <>
//                     <Filter value={filter} onChange={this.changeFilter} />
//                     <ContactList contacts={filteredContacts} onDeleteContact={this.deteleContact} />
//                 </>
//             ): (
//                 <h1>Contact list is empty</h1>
//             )} 

//         </div>
//       );
//   }
// };
