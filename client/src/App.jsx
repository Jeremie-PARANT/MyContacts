import './App.css'
import { useForm } from "react-hook-form";

function App() {
  const { register, handleSubmit } = useForm();
  const onSubmit = data => console.log(data);
  return (
    <>
      <main>
        <form className="flexCol" onSubmit={handleSubmit(onSubmit)}>
          <h3>Login</h3>
          <input type="text" placeholder="username" {...register("username")} />
          <input type="password" placeholder="password" {...register("password")} />
          <input type="submit" />
        </form>
      </main>
    </>
  )
}
export default App
