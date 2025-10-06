import './Contact.css'
import { useEffect, useState } from "react";

function GetContacts() {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    fetchContacts();
  }, []);
  async function fetchContacts() {
    try {
      const localToken = JSON.parse(localStorage.getItem("token")).token;
      const response = await fetch("http://localhost:3000/contact", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "token": `${localToken}`
        }
      });
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const result = await response.json();
      setContacts(result);
      console.log(result);
    } catch (error) {
      console.error(error.message);
    }
  }

  return (
    <>
      <main>
        <table>
          <tr>
            <th>firstName</th>
            <th>lastName</th>
            <th>phone</th>
            <th>id</th>
          </tr>
          {contacts.map((c) => (
            <tr key={c._id}>
              <td>{c.firstName}</td>
              <td>{c.lastName}</td>
              <td>{c.phone}</td>
              <td>{c._id}</td>
            </tr>
          ))}
        </table>
      </main>
    </>
  )
}
export default GetContacts
