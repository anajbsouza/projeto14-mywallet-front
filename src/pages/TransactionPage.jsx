import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import styled from "styled-components"

export default function TransactionsPage() {
  const { tipo } = useParams();
  const form = {value:"", type:"", title:""}
  const valueRef = useRef("");
  const titleRef = useRef("");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false)


  useEffect(()=>{
  if (!token) return navigate("/");
  },[navigate,token])

  const buttonClick = () =>{
    form.value = valueRef.current.value.toString();
    form.title = titleRef.current.value;
    form.type = tipo==="saída"?"saida":tipo;
  }
  const request = () => {
    setLoading(true)
    const url = "https://digitalwallet-api.onrender.com/transacao";
    const config = {headers: {Authorization: `Bearer ${token}`}}

    axios.post(url, form, config)
      .then(()=>{
        console.log("transação feita");
        setLoading(false)
        navigate("/home")
      })
      .catch((err)=>{
        console.log(err)
        setLoading(false)
        alert("Erro ao fazer transação, tente novamente!")
      })
  }
  const transaction = (e) =>{
    e.preventDefault();
    buttonClick();
    if(form.value===""||form.title==="")return alert("Todos os campos devem ser preenchidos")
    
    request();
  }
  if(loading){
    return(
      <TransactionsContainer>
        <div className="center">
          <span className="loader"></span>
        </div>
      </TransactionsContainer>
    )
  }
  return (
    <TransactionsContainer>
      <h1>Nova {tipo}</h1>
      <form onSubmit={transaction}>
        <input placeholder="Valor" type="number" min={"0.01"} step={"0.01"} ref={valueRef}/>
        <input placeholder="Descrição" type="text" ref={titleRef}/>
        <button type="submit">Salvar {tipo}</button>
      </form>
    </TransactionsContainer>
  )
}

const TransactionsContainer = styled.main`
  height: calc(100vh - 50px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  h1 {
    align-self: flex-start;
    margin-bottom: 40px;
  }
`
