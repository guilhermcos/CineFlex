import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import styled from "styled-components"

export default function SeatsPage() {
    const { idSessao } = useParams();
    const [assentosData, setAssentosData] = useState(undefined);
    const [selecionados, setSelecionados] = useState([]);
    const [compradores, setCompradores] = useState([])
    const [nomeComprador, setNomeComprador] = useState("");
    const [cpfComprador, setCpfComprador] = useState("");

    useEffect(() => {
        const url = `https://mock-api.driven.com.br/api/v8/cineflex/showtimes/${idSessao}/seats`

        const promise = axios.get(url);
        promise.then((res) => {
            console.log(res.data);
            setAssentosData(res.data);
        })
        promise.catch((err) => {
            console.log(err.response.data);
        })

    }, [])

    function finalizarReserva(e) {
        e.preventDefault();
        const idsAssentos = selecionados.map((assento) => assento.id);
        
        const arrayFinal = [{ids: idsAssentos, compradores: compradores}]
        console.log(arrayFinal);

        const url = `https://mock-api.driven.com.br/api/v8/cineflex/seats/book-many`;
        const promise = axios.post(url,
            {
                ids: idsAssentos,
                compradores: compradores
            }
        )
        promise.then((res) => {
            console.log("sucesso");
            console.log(res.data)
        })
        promise.catch((err) => {
            console.log("erro");
            console.log(err.response.data)
        })


        console.log(nomeComprador);
        console.log(cpfComprador);
    }

    function mudancaInput(id, inputName, inputValue){
        const index = compradores.indexOf(compradores.filter((objeto) => objeto.idAssento === id)[0]);
        const novoCompradores = compradores;
        if (inputName === "nome"){
            novoCompradores[index].nome = inputValue;
            setCompradores(novoCompradores);
        } else if (inputName === "cpf"){
            novoCompradores[index].cpf = inputValue;
            setCompradores(novoCompradores)
        }
    }

    if (assentosData === undefined) { return <p>Carregando...</p> }

    return (
        <PageContainer>
            Selecione o(s) assento(s)

            <SeatsContainer>
                {assentosData.seats.map((seatInfo) => {
                    return (
                        <SeatItem
                            selecionado={selecionados.some((objeto) => objeto.id === seatInfo.id)}
                            onClick={() => {
                                if (!selecionados.some((objeto) => objeto.id === seatInfo.id)) {
                                    seatInfo.isAvailable ? setSelecionados([...selecionados, { id: seatInfo.id, assento: seatInfo.name }]) : alert("Esse assento não está disponível");
                                    setCompradores([...compradores, {idAssento: seatInfo.id, nome: null, cpf: null}])
                                    console.log(compradores)
                                } else {
                                    setSelecionados((selecionados) => selecionados.filter((item) => item.id !== seatInfo.id));
                                    setCompradores((compradores) => compradores.filter((objeto) => objeto.idAssento !== seatInfo.id));
                                }
                            }}
                            key={seatInfo.id} isAvailable={seatInfo.isAvailable}
                        >
                            {seatInfo.name}
                        </SeatItem>
                    )
                })}
            </SeatsContainer>

            <CaptionContainer>
                <CaptionItem>
                    <CaptionCircle />
                    Selecionado
                </CaptionItem>
                <CaptionItem>
                    <CaptionCircle />
                    Disponível
                </CaptionItem>
                <CaptionItem>
                    <CaptionCircle />
                    Indisponível
                </CaptionItem>
            </CaptionContainer>

            <FormContainer>
                <form onSubmit={finalizarReserva}>
                    {selecionados.map((assento) => {
                        return (
                            <div key={Math.random()}>
                                <label>Nome do Comprador Assento {assento.assento}:</label>
                                <input
                                    onChange={e => mudancaInput(assento.id, e.target.name, e.target.value)}
                                    type="text"
                                    name="nome"
                                    placeholder="Digite seu nome..."
                                    required
                                />

                                <label>CPF do Comprador Assento {assento.assento}:</label>
                                <input
                                    onChange={e => mudancaInput(assento.id, e.target.name, e.target.value)}
                                    type="number"
                                    name="cpf"
                                    placeholder="Digite seu CPF..."
                                    required
                                />
                            </div>
                        )
                    })}

                    <button type="submit" disabled={(selecionados.length > 0) ? false : true}>Reservar Assento(s)</button>
                </form>
            </FormContainer>

            <FooterContainer>
                <div>
                    <img src={assentosData.movie.posterURL} alt="poster" />
                </div>
                <div>
                    <p>{assentosData.movie.title}</p>
                    <p>{assentosData.day.weekday} - {assentosData.day.date}</p>
                </div>
            </FooterContainer>

        </PageContainer>
    )
}

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Roboto';
    font-size: 24px;
    text-align: center;
    color: #293845;
    margin-top: 30px;
    padding-bottom: 120px;
    padding-top: 70px;
`
const SeatsContainer = styled.div`
    width: 330px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
`
const FormContainer = styled.div`
    width: calc(100vw - 40px); 
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 20px 0;
    font-size: 18px;
    button {
        align-self: center;
    }
    input {
        width: calc(100vw - 60px);
    }
`
const CaptionContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 300px;
    justify-content: space-between;
    margin: 20px;
    div>div {
        background-color: #C3CFD9;
        border: 1px #7B8B99;
    }
    div:first-of-type>div {
        background-color: #1AAE9E;
        border: 1px #0E7D71;
    }
    div:last-of-type>div {
        background-color: #FBE192;
        border: 1px #F7C52B;
    }
`
const CaptionCircle = styled.div`
    //border: 1px solid blue;         // Essa cor deve mudar
    //background-color: lightblue;    // Essa cor deve mudar
    height: 25px;
    width: 25px;
    border-radius: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;
`
const CaptionItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 12px;
`
const SeatItem = styled.div`
    background-color: ${props => props.selecionado ? "#1AAE9E" : props.isAvailable ? "#C3CFD9" : "#FBE192"};    // Essa cor deve mudar
    border: 1px ${props => props.selecionado ? "#0E7D71" : props.isAvailable ? "#808F9D" : "#F7C52B"};         // Essa cor deve mudar
    height: 25px;
    width: 25px;
    border-radius: 25px;
    font-family: 'Roboto';
    font-size: 11px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;
`
const FooterContainer = styled.div`
    width: 100%;
    height: 120px;
    background-color: #C3CFD9;
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 20px;
    position: fixed;
    bottom: 0;

    div:nth-child(1) {
        box-shadow: 0px 2px 4px 2px #0000001A;
        border-radius: 3px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: white;
        margin: 12px;
        img {
            width: 50px;
            height: 70px;
            padding: 8px;
        }
    }

    div:nth-child(2) {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        p {
            text-align: left;
            &:nth-child(2) {
                margin-top: 10px;
            }
        }
    }
`