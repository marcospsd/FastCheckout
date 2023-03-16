import styled from 'styled-components'


export const ContainerCreate = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;

    > div {
        margin-bottom: 0.6rem;
        width: 100%;
    }

    > hr {
        width: 100%;
    }

    > button {
        color: #c52f33;
    }

`

export const Coluna = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    > button {
        color: #c52f33;
    }
 
    > .MuiTextField-root {
        width: 100%;
    }

`

export const Linha = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`

export const Bloco = styled.div`
    display: flex;
    flex-direction: column;
    width: 100px;
    height: 80px;
    justify-content: center;
    align-items: center;
    border-radius: 1rem;
    background-color: #c52f33;

    > p {
        margin: 0;
        color: white;
    }

`

export const Relative = styled.div`
    display: flex;
    position: absolute;
    right: 1px;
    top: 1px;
`


export const Tittle = styled.div`
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;
    border-radius: 1rem;
    background-color: #c52f33;

    > p {
        color: white;
    }
`