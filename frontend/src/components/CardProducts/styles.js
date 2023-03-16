import styled from "styled-components";


export const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    background-color: #c52f33;
    border-radius: 1rem;
    margin: 0rem;
    padding: 0.5rem;
    position: relative;

    p {
        color: white;
    }

    button {
        color: white;
    }
`

export const Row = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;

    > p {
        margin: 0 1rem 0 0;
    }
`

export const Column = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    margin: 0;

    > p { 
        margin: 0 1rem 0 0;
    }
`

export const DeleteButton = styled.div`
    display: flex;
    position: absolute;
    right: 1px;
    top: 1px;
`