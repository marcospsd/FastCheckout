import styled from 'styled-components'


export const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;

    p {
        text-align: center;
        color: #fff;
        margin: 0;
        padding: 0;
    }

    #iconprint {
        position: absolute;
        right: 10px;
        top: 0px;
    }

`

export const Coluna = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    width: 90%;

`

export const Bloco = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    width: 100px;
    height: 70px;
    margin: 10px;
    background-color: white;
    border-radius: 1rem;
    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.50), 0 2px 3px rgba(0, 0, 0, 1);

    p {
        text-align: center;
        color: #c52f33;
        margin: 0;
        padding: 0;
    }
`