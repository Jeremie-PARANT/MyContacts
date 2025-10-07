import './Contact.css'
import star from '../assets/etoile.png'
import { useEffect, useState } from "react";
import alertify from "alertifyjs";
import "alertifyjs/build/css/alertify.css";
import "alertifyjs/build/css/themes/default.css";

function GetContacts() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    fetchContacts();
  }, []);
  async function fetchContacts() {
    try {
      const localToken = JSON.parse(localStorage.getItem("token")).token;
      const response = await fetch(`${apiUrl}/contact`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "token": `${localToken}`
        }
      });
      if (!response.ok) {
        alertify.Error("Une erreur est survenu");
        throw new Error(`Response status: ${response.status}`);
      }

      const result = await response.json();
      setContacts(result);
      console.log(result);
    }
    catch (error) {
      console.error(error.message);
      alertify.Error("Une erreur est survenu");
    }
  }

  async function remove(id) {
    try {
      const data = { id: id };
      const localToken = JSON.parse(localStorage.getItem("token")).token;
      const response = await fetch(`${apiUrl}/contact`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "token": `${localToken}`
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const result = await response.json();

      alertify.success("Supression reussi");
      console.log(result);
    }
    catch (error) {
      console.error(error.message);
      alertify.Error("Une erreur est survenu");
    }
  }

  return (
    <>
      <main className="flexCenter">
        <table>
          <thead>
            <tr>
              <th>firstName</th>
              <th>lastName</th>
              <th>phone</th>
              <th>id</th>
              <th>Favorite</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((c) => (
              <tr key={c._id}>
                <td>{c.firstName}</td>
                <td>{c.lastName}</td>
                <td>{c.phone}</td>
                <td>{c._id}</td>
                <td>
                  {c.favorite ? (<img src={star} className="favorite" alt="Favorite" />) : ""}
                </td>
                <td>
                  <button onClick={() => remove(c._id)}>
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </>
  )
}
export default GetContacts
