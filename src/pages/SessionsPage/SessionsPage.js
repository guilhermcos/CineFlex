import { useParams } from "react-router-dom"
import styled from "styled-components"
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function SessionsPage() {
    const { idFilme } = useParams();
    const [sessionData, setSessionData] = useState(undefined);
    const url = `https://mock-api.driven.com.br/api/v8/cineflex/movies/${idFilme}/showtimes`;

    useEffect(() => {
        const promise = axios.get(url);
        promise.then((res) => {
            console.log(res.data);
            setSessionData(res.data);
        });
        promise.catch((err) => {
            console.log(err.response.data)
        });
    }, [])

    if (sessionData === undefined) return (<p>Carregando...</p>);

    return (
        <PageContainer>
            Selecione o horário
            <div>
                {sessionData.days.map((sessionDate) => {
                    return (
                        <SessionContainer data-test="movie-day" key={sessionDate.date}>
                            {sessionDate.weekday} - {sessionDate.date}
                            <ButtonsContainer>
                                {sessionDate.showtimes.map((session) => <Link key={session.id} to={`/assentos/${session.id}`}><button data-test="showtime">{session.name}</button></Link>)}
                            </ButtonsContainer>
                        </SessionContainer>)
                })}

            </div>

            <FooterContainer data-test="footer">
                <div>
                    <img src={sessionData.posterURL} alt="poster" />
                </div>
                <div>
                    <p>{sessionData.title}</p>
                </div>
            </FooterContainer>

        </PageContainer>
    )
}

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    font-family: 'Roboto';
    font-size: 24px;
    text-align: center;
    color: #293845;
    margin-top: 30px;
    padding-bottom: 120px;
    padding-top: 70px;
    div {
        margin-top: 20px;
    }
`
const SessionContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    font-family: 'Roboto';
    font-size: 20px;
    color: #293845;
    padding: 0 20px;
`
const ButtonsContainer = styled.div`
    display: flex;
    flex-direction: row;
    margin: 20px 0;
    button {
        margin-right: 20px;
    }
    a {
        text-decoration: none;
    }
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