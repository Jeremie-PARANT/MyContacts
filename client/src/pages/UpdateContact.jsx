import './Contact.css'
import { useForm } from "react-hook-form";
import alertify from "alertifyjs";
import "alertifyjs/build/css/alertify.css";
import "alertifyjs/build/css/themes/default.css";

function UpdateContact() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const { register, handleSubmit } = useForm();

  async function update(data) {
    try {
      const localToken = JSON.parse(localStorage.getItem("token")).token;
      const response = await fetch(`${apiUrl}/contact`, {
        method: "PATCH",
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

      alertify.success("Mise a jour reussi");
      console.log(result);
    }
    catch (error) {
      alertify.Error("Une erreur est survenu");
      console.error(error.message);
    }
  }

  return (
    <>
      <main>
        <form className="flexCol" onSubmit={handleSubmit(update)}>
          <h3>Update Contact</h3>
          <input type="text" placeholder="Firstname" {...register("firstName")} />
          <input type="text" placeholder="Lastname" {...register("lastName")} />
          <input type="text" placeholder="Phone" {...register("phone")} />
          <input type="text" placeholder="id" {...register("id")} />
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
export default UpdateContact
