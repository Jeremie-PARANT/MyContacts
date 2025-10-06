import './Contact.css'
import { useForm } from "react-hook-form";

function DeleteContact() {
  const { register, handleSubmit } = useForm();
  async function remove(data) {
    try {
      const localToken = JSON.parse(localStorage.getItem("token")).token;
      const response = await fetch("http://localhost:3000/contact", {
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
      console.log(result);
    } catch (error) {
      console.error(error.message);
    }
  }

  return (
    <>
      <main>
        <form className="flexCol" onSubmit={handleSubmit(remove)}>
          <h3>Delete Contact</h3>
          <input type="text" placeholder="id" {...register("id")} />
          <input type="submit" />
        </form>
      </main>
    </>
  )
}
export default DeleteContact
