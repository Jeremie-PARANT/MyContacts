import { useForm } from "react-hook-form";
import alertify from "alertifyjs";
import "alertifyjs/build/css/alertify.css";
import "alertifyjs/build/css/themes/default.css";

function Register() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const { register, handleSubmit } = useForm();

  async function signUp(data) {
    try {
      const response = await fetch(`${apiUrl}/user`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const result = await response.json();

      alertify.success("Inscription reussi");
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
        <form className="flexCol" onSubmit={handleSubmit(signUp)}>
          <h3>Register</h3>
          <input type="text" placeholder="email" {...register("email")} />
          <input type="password" placeholder="password" {...register("password")} />
          <input type="submit" />
        </form>
      </main>
    </>
  )
}
export default Register
