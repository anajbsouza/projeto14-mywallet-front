import styled from "styled-components"
import { BiExit } from "react-icons/bi"
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai"
import { useEffect, useState } from "react"
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(false);
  
  useEffect(()=>{
    setLoading(true)
    if (!token) return navigate("/");
    const url = "https://my-wallet-api-5kfy.onrender.com";
    const config = { headers: { Authorization: `Bearer ${token}` } }
    axios.get(url, config)
      .then((res) => {
        setLoading(false)
        setData(res.data)
      })
      .catch((err) => {
        console.log(err)
        setLoading(false)
        alert("Erro ao carregar dados, faça login novamente!")
        navigate("/")
      })
  },[token, navigate])

  const logout = () =>{
    localStorage.setItem("token","")
    navigate("/")
  }
  if(loading){
    return(
      <HomeContainer>
        <TransactionsContainer>
          <ul className="ul-empty">
            <span className="loader"></span>
          </ul>
        </TransactionsContainer>
      </HomeContainer>
    )
  }

  return (
    <HomeContainer>
      <Header>
        <h1>Olá, {data===null?"Fulano":data.name}</h1>
        <BiExit onClick={logout}/>
      </Header>

      {data===null?"":
      <TransactionsContainer>
        <ul className={data.transactions.length === 0?"ul-empty":""}>
          {data.transactions.length === 0?
            <p>Não há registros de entrada ou saída</p>:
            data.transactions.map((t, i)=>(
                <ListItemContainer key={i}>
                  <div>
                    <span>{t.date}</span>
                    <strong>{t.title}</strong>
                  </div>
                  <Value color={t.type==="saida"?"negativo":"positivo"}>{t.value}</Value>
                </ListItemContainer>
            ))}

        </ul>

        <article>
          <strong>Saldo</strong>
          <Value color={"positivo"}>{data.totalBalance.toFixed(2).replace(".",",")}</Value>
        </article>
      </TransactionsContainer>}


      <ButtonsContainer>
        <button onClick={()=>navigate("/nova-transacao/entrada")}>
          <AiOutlinePlusCircle />
          <p>Nova <br /> entrada</p>
        </button>

        <button onClick={()=>navigate("/nova-transacao/saída")}>
          <AiOutlineMinusCircle />
          <p>Nova <br />saída</p>
        </button>
      </ButtonsContainer>

    </HomeContainer>
  )
}

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 50px);
  .loader{
    left: -14px;
  }
.loader::after {
  background: #8c11be;
  }
  
`
const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2px 5px 2px;
  margin-bottom: 15px;
  font-size: 26px;
  color: white;
`
const TransactionsContainer = styled.article`
  flex-grow: 1;
  background-color: #fff;
  color: #000;
  border-radius: 5px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  article {
    display: flex;
    justify-content: space-between;   
    strong {
      font-weight: 700;
      text-transform: uppercase;
    }
  }
  .ul-empty{
    width: 100%;
    height: 100vw;
    display: flex;
    align-items: center;
    justify-content: center;
    p{
      width: 180px;
      text-align: center;
    }
  }
`
const ButtonsContainer = styled.section`
  margin-top: 15px;
  margin-bottom: 0;
  display: flex;
  gap: 15px;
  
  button {
    width: 50%;
    height: 115px;
    font-size: 22px;
    text-align: left;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    p {
      font-size: 18px;
    }
  }
`
const Value = styled.div`
  font-size: 16px;
  text-align: right;
  color: ${(props) => (props.color === "positivo" ? "green" : "red")};
`
const ListItemContainer = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  color: #000000;
  margin-right: 10px;
  div span {
    color: #c6c6c6;
    margin-right: 10px;
  }
`