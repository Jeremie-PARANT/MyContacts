import './Auth.css'
import { useForm } from "react-hook-form";

function App() {
  const { register, handleSubmit } = useForm();

  async function login(data) {
    try {
      console.log(data)
      const response = await fetch("http://localhost:3000/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const result = await response.json();
      localStorage.setItem("token", JSON.stringify(result));
      console.log(localStorage.getItem("token"));
    } catch (error) {
      console.error(error.message);
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
export default App
