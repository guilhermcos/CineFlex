import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components"

export default function SuccessPage(props) {
    const { dadosCompra, setDadosCompra } = props;
    const navigate = useNavigate();


    if (dadosCompra === 0) {
        return (
            <PageContainer>
                <h1>Parece que a página foi atualizada</h1>
                <Link onClick={setDadosCompra(0)} to={'/'}><button>Voltar para Home</button></Link>
            </PageContainer>
        )
    }

    return (
        <PageContainer>
            <h1>Pedido feito <br /> com sucesso!</h1>

            <TextContainer data-test="movie-info">
                <strong><p>Filme e sessão</p></strong>
                <p>{dadosCompra.movieInfo.title}</p>
                <p>{dadosCompra.dayInfo.date} - {dadosCompra.sessao}</p>
            </TextContainer>

            <TextContainer data-test="seats-info">
                <strong><p>Ingressos</p></strong>
                {dadosCompra.compradores.map((elemento) => <p key={elemento.assento}>Assento {elemento.assento}</p>)}
            </TextContainer>

            <TextContainer data-test="client-info">
                <strong><p>Compradores:</p></strong>
                {dadosCompra.compradores.map((elemento) => {
                    return (
                        <>
                            <p>Nome: {elemento.nome}</p>
                            <p>CPF: {elemento.cpf}</p>
                        </>
                    )
                })}

            </TextContainer>

            <Link onClick={setDadosCompra(0)} to={'/'}><button data-test="go-home-btn">Voltar para Home</button></Link>
        </PageContainer>
    )
}

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Roboto';
    font-size: 24px;
    color: #293845;
    margin: 30px 20px;
    padding-bottom: 120px;
    padding-top: 70px;
    a {
        text-decoration: none;
    }
    button {
        margin-top: 50px;
    }
    h1 {
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 700;
        font-size: 24px;
        line-height: 28px;
        display: flex;
        align-items: center;
        text-align: center;
        color: #247A6B;
    }
`
const TextContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-top: 30px;
    strong {
        font-weight: bold;
        margin-bottom: 10px;
    }
    div {
        margin-bottom: 15px;
    }
`