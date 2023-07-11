import styled from "styled-components"
import { Link } from "react-router-dom"
import MyWalletLogo from "../components/MyWalletLogo"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function SignInPage() {
  const [form, setForm] = useState({email: "", password: ""})
  const navigate = useNavigate();

  function handleForm(e) {
    setForm({...form, [e.target.name]: e.target.value})
  }

  function submitForm(e) {
    e.preventDefault(); 

    axios.post(`${import.meta.env.VITE_API_URL}/`, form)
    .then(res => console.log(res.data))
    .catch(err => {
      if (err.response) {
        alert(err.response.data);
      } else {
        alert(err.message);
      }
    })  
  }

  return (
    <SingInContainer>
      <form onSubmit={submitForm}>
        <MyWalletLogo />
        <input placeholder="E-mail" required type="email" autoComplete="username" name="email" value={form.email} onChange={handleForm}/>
        <input placeholder="Senha" required type="password" autoComplete="new-password" name="password" minLength={3} value={form.password} onChange={handleForm}/>
        <button type="submit">Entrar</button>
      </form>

      <Link to="/cadastro">
        Primeira vez? Cadastre-se!
      </Link>
    </SingInContainer>
  )
}

const SingInContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
