import './Contact.css'
import { useForm } from "react-hook-form";

function UpdateContact() {
  const { register, handleSubmit } = useForm();
  async function save(data) {
    try {
      const localToken = JSON.parse(localStorage.getItem("token")).token;
      const response = await fetch("http://localhost:3000/contact", {
        method: "POST",
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
        <form className="flexCol" onSubmit={handleSubmit(save)}>
          <h3>Update Contact</h3>
          <input type="text" placeholder="Firstname" {...register("firstName")} />
          <input type="text" placeholder="Lastname" {...register("lastName")} />
          <input type="text" placeholder="Phone" {...register("phone")} />
          <input type="text" placeholder="id" {...register("id")} />
          <input type="submit" />
        </form>
      </main>
    </>
  )
}
export default UpdateContact
