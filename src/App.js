import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import styled from "styled-components";
import HomePage from "./pages/HomePage/HomePage";
import SeatsPage from "./pages/SeatsPage/SeatsPage";
import SessionsPage from "./pages/SessionsPage/SessionsPage";
import SuccessPage from "./pages/SuccessPage/SuccessPage";
import { Link, useLocation,useNavigate } from "react-router-dom";
import BackButton from "./components/BackButton";

export default function App() {
    const [dadosCompra, setDadosCompra] = useState(0);
    const [button, setButton] = useState(false);

    return (
        <BrowserRouter>
            <>
                <NavContainer button={button}>
                    <img
                    data-test="go-home-header-btn"
                    onClick={button ? () => window.history.back() : null} 
                    src="assets/arrow-back-outline.svg" 
                    alt="" />
                    CINEFLEX
                </NavContainer>

                <Routes>
                    <Route path="/" element={<HomePage setButton={setButton} />} />
                    <Route path="/sessoes/:idFilme" element={<SessionsPage setButton={setButton} />} />
                    <Route path="/assentos/:idSessao" element={<SeatsPage setDadosCompra={setDadosCompra} setButton={setButton} />} />
                    <Route path="/sucesso" element={<SuccessPage setDadosCompra={setDadosCompra} dadosCompra={dadosCompra} setButton={setButton} />} />
                </Routes>
            </>
        </BrowserRouter>
    );
};


const NavContainer = styled.div`
                    width: 100%;
                    height: 70px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background-color: #C3CFD9;
                    color: #E8833A;
                    font-family: 'Roboto', sans-serif;
                    font-size: 34px;
                    position: fixed;
                    top: 0;
                    a {
                        text-decoration: none;
                        color: #E8833A;
                    }
                    img {
                        display: ${(props) => props.button ? "initial" : "none"};
                        position: absolute;
                        height: 55%;
                        left: 10px;
                        top: 18px;
                    }
                    `;