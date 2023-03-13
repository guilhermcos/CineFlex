import styled from "styled-components";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function HomePage() {
    const [filmes, setFilmes] = useState([]);

    useEffect(() => {
        const url = "https://mock-api.driven.com.br/api/v8/cineflex/movies";
        const requisicao = axios.get(url);
        requisicao.then((res) => {
            setFilmes(res.data);
        });
        requisicao.catch((err) => {
            console.log(err.response.data);
        });
    }, []);

    if (filmes.length === 0) {
        return (
            <PageContainer>
                <h1>Carregando...</h1>
            </PageContainer>
        );
    };

    return (
        <PageContainer>
            Selecione o filme
            <ListContainer>
                {filmes.map((filme) => {
                    return (
                        <MovieContainer data-test="movie" key={filme.title}>
                            <Link to={`sessoes/${filme.id}`}> <img src={filme.posterURL} alt="poster" /> </Link>
                        </MovieContainer>
                    );
                })}

            </ListContainer>

        </PageContainer>
    );
};

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Roboto', sans-serif;
    font-size: 24px;
    text-align: center;
    color: #293845;
    margin-top: 30px;
    padding-top: 70px;
    h1 {
        margin-top: 150px;
        font-size: 40px;
    }
`;
const ListContainer = styled.div`
    width: 330px;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    padding: 10px;
`;
const MovieContainer = styled.div`
    width: 145px;
    height: 210px;
    box-shadow: 0px 2px 4px 2px #0000001A;
    border-radius: 3px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 10px;
    img {
        width: 130px;
        height: 190px;
    }
`;