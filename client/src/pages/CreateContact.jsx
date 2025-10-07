import './Contact.css'
import { useForm } from "react-hook-form";
import alertify from "alertifyjs";
import "alertifyjs/build/css/alertify.css";
import "alertifyjs/build/css/themes/default.css";

function CreateContact() {
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

      alertify.success("Création reussi");
      console.log(result);
    } catch (error) {
      console.error(error.message);
    }
  }

  return (
    <>
      <main>
        <form className="flexCol" onSubmit={handleSubmit(save)}>
          <h3>Create Contact</h3>
          <input type="text" placeholder="Firstname" {...register("firstName")} />
          <input type="text" placeholder="Lastname" {...register("lastName")} />
          <input type="text" placeholder="Phone" {...register("phone")} />
          <div>
            <label>Favorite : </label>
            <input type="checkbox" placeholder="Favorite" {...register("favorite")} />
          </div>
          <input type="submit" />
        </form>
      </main>
    </>
  )
}
export default CreateContact
