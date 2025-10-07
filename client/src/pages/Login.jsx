import { useForm } from "react-hook-form";
import alertify from "alertifyjs";
import "alertifyjs/build/css/alertify.css";
import "alertifyjs/build/css/themes/default.css";

function Login() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const { register, handleSubmit } = useForm();

  async function login(data) {
    try {
      console.log(apiUrl)
      const response = await fetch(`${apiUrl}/user/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const result = await response.json();
      localStorage.setItem("token", JSON.stringify(result));

      alertify.success("Connexion reussi");
    }
    catch (error) {
      console.error(error.message);
      alertify.Error("Une erreur est survenu");
    }
  }

  return (
    <>
      <main>
        <form className="flexCol" onSubmit={handleSubmit(login)}>
          <h3>Login</h3>
          <input type="text" placeholder="email" {...register("email")} />
          <input type="password" placeholder="password" {...register("password")} />
          <input type="submit" />
        </form>
      </main>
    </>
  )
}
export default Login
