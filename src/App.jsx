import { useState } from "react";
import "./App.css";
import conts from "./contacts.json";
import { v4 as uuidv4 } from 'uuid';



function App() {
  
  const [contacts, setContacts] = useState(conts.slice(0,4))

  const addRandomContact = () => {
    const randomNumber = Math.floor(Math.random()*conts.length);
    const randomContact = conts[randomNumber];
  
    setContacts(prevContacts => {

      if (!prevContacts.some(contact => contact.id === randomContact.id)) {
        return [...prevContacts, randomContact];
      } else {
      return prevContacts;
      }
  })
  console.log(contacts)
  }

  const sortContacts= (varName) => {
    
      setContacts(prevContacts => {
        let sortedContacts = [...prevContacts];
        if (varName === "Pop") {
          sortedContacts = prevContacts.sort((c1, c2) => {
            if (c1.popularity < c2.popularity) {
              
              return 1;
              
            }
            if (c2.popularity < c1.popularity)  {
              
              return -1;
            
          }
            return 0;
          })

          
       
      } else if (varName === "Name"){
      
        sortedContacts = prevContacts.sort((c1, c2) => {
          if (c1.name < c2.name) return -1;
          if (c2.name < c1.name) return 1;
          return 0;
        })
        
      }
      return [...sortedContacts];
    }
  )
  }

  const deleteContact = (id) => {
    
    const updatedContact = contacts.filter(item => {
      if (item.id !== id) {
        return true;
      } else {
        return false;
      }
    })
    
    setContacts(updatedContact);
  }
  


  return (
    <div className="App">
      <button onClick={addRandomContact}>Add random Contact</button>
      <button onClick={() => sortContacts("Pop")}>Sort by Popularity</button>
      <button onClick={() => sortContacts("Name")}>Sort by Name</button>
      <table>
        <thead>

          <tr>

            <th>Picture</th>
            <th>Name</th>
            <th>Pop</th>
            <th>Won an Oscar</th>
            <th>Won an Emmy</th>
            <th>Actions</th>

          </tr>

        </thead>

        <tbody>
          {contacts.map( oneContact => {
            return (
              <tr key={uuidv4()}>
                <td>
                  <img src={oneContact.pictureUrl} style={{width: "100px"}} />
                </td>
                <td>
                  <h2>{oneContact.name}</h2>
                </td>
                <td>
                  <h2>{oneContact.popularity}</h2>
                </td>
                <td>
                  <h2>{oneContact.wonOscar ?  "🏆" :null}</h2>
                </td>
                <td>
                  <h2>{oneContact.wonEmmy ?  "🌟" :null}</h2>
                </td>
                <td>
                  <button onClick={() => deleteContact(oneContact.id)} >Delete</button>
                </td>
              </tr>
            )
          })
          }
        </tbody>


      </table>
    </div>
  );
}

export default App;
