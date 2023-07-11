import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Navigate } from "react-router-dom"
import { Link } from "react-router-dom"
import styled from "styled-components"
import MyWalletLogo from "../components/MyWalletLogo"

export default function SignUpPage() {
  const [form, setForm] = useState({name: "", email: "", password: "", confirmPassword: ""})
  const navigate = useNavigate();

  function handleForm(e) {
    setForm({...form, [e.target.name]: e.target.value})
  }

  function submitForm(e) {
    e.preventDefault();

    if (form.password !== form.confirmPassword) return alert("As senhas estão diferentes!");

    delete form.confirmPassword
    axios.post(`${import.meta.env.VITE_API_URL}/cadastro`, form)
    .then(res => navigate("/"))
    .catch(err => {
      if (err.response) {
        alert(err.response.data);
      } else {
        alert(err.message);
      }
  })
  
  }

  return (
    <SingUpContainer>
      <form onSubmit={submitForm}>
        <MyWalletLogo />
        <input placeholder="Nome" required type="text" name="name" value={form.name} onChange={handleForm}/>
        <input placeholder="E-mail" required type="email" autoComplete="username" name="email" value={form.email} onChange={handleForm}/>
        <input placeholder="Senha" required type="password" autoComplete="new-password" name="password" minLength={3} value={form.password} onChange={handleForm}/>
        <input placeholder="Confirme a senha" required type="password" autoComplete="new-password" name="confirmPassword" minLength={3} value={form.confirmPassword} onChange={handleForm}/>
        <button type="submit">Cadastrar</button>
      </form>

      <Link to="/">
        Já tem uma conta? Entre agora!
      </Link>
    </SingUpContainer>
  )
}

const SingUpContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
