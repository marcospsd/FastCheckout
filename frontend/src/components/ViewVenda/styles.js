import styled from 'styled-components'


export const Tittle = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    max-width: 100%;
    background-color: #c52f33;
    border-radius: 1.5rem;
    color: white;
`

export const ResumoCliente = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 100%;
    margin-top: 0.5rem;
    background-color: #c52f33;
    border-radius: 1rem;
    justify-content: center;
    color: white;

    > label {
        padding: 0.2rem 0.5rem;
    }
`

export const Linha = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;


`

export const Coluna = styled.div`
    display: flex;
    flex-direction: column;
    padding: 0.5rem;

    > label {
        padding: 0.2rem 0rem;
    }
`

export const FormaPagamento = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 100%;
    margin-top: 0.5rem;
    background-color: #c52f33;
    border-radius: 1rem;
    justify-content: center;
    color: white;

    > p {
        text-align: center;
    }

    > label {
        align-items: center;
        justify-content: center;
    }
    > table {
        padding: 0.5rem
    }

`

export const Produtos = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 100%;
    margin-top: 0.5rem;
    background-color: #c52f33;
    border-radius: 1rem;
    justify-content: center;
    color: white;

    > p {
        text-align: center;
    }

    > label {
        align-items: center;
        justify-content: center;
    }
    > table {
        padding: 0 0.5rem
    }

    #reposicao {
        background-color: white;
        color: red;
        border-radius: 5px;
        animation: bestseller 2s linear infinite;

        @keyframes bestseller {
            0% { opacity: 0.5; }
            50% { opacity: 1;}
            100%{ opacity: 0.5; }
        }
    }

`

export const ButtonList = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;

     .MuiSvgIcon-root {
        font-size: 40px;
    }
`