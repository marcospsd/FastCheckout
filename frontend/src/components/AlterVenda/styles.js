import { style } from "@mui/system";
import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
`

export const Tittle = styled.p`
    text-align: center;
    font-size: 1.3rem;
    font-weight: bold;
`

export const Coluna = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    width: 100%;
`

export const Card = styled.div`
    display: flex;
    flex-direction: column;
    width: 90%;
    height: 100%;
    background-color: #f0f0f0;
    margin: 10px 0; 
    padding: 1rem;
    border-radius: 1rem;
    box-shadow: 3px 2px 22px 1px rgba(0, 0, 0, 0.24);

    > p {
        margin: 1px 0;
        padding: 0;
    }
`