import styled from 'styled-components'


export const BigContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
    width: 100vw;
    align-items: center;
    margin-top: 1rem;
`

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #ffffff;
    border-radius: 1.5rem;
    min-width: 300px;
    width: 100%;
    max-width: 500px;
    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.50), 0 2px 3px rgba(0, 0, 0, 1);
    position: relative;

    > img {
        width: 90%;
        padding-top: 0.5rem;
    }

    > #logouticon {
        position: absolute;
        top: 5px;
        right: 5px;
    }

    #attbutton:focus {
        animation-duration: 2s;
        animation-name: slideon;

        @keyframes slideon {
        0% {
            transform: rotate(5turn)
        }
    }

    }
`

export const MenuAddCard = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 1.5rem;
    width: 95%;
    height: 50px;
    align-items: center;
    justify-content: center;
    background-color: #c52f33;
    border-radius: 1.5rem;
    position: relative;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.50), 0 1px 2px rgba(0, 0, 0, 1);

    > #addvenda {
        color: rgb(255, 255, 255);
        background-color: #c52f33;
        border: solid 10px;
        border-color: #ffffff;
        margin: 15px;
    }

    > #nameuser {
        position: absolute;
        left: 20px;
        color: white
    }
    
    > #tipolist {
        position: absolute;
        right: 20px;
        color: white
    }
`

export const Coluna = styled.div`
    display: flex;
    flex-direction: row;
    align-items: self-start;
    justify-content: space-between;
    width: 90%;

`

export const Coluna2 = styled.div`
    display: flex;
    flex-direction: row;
    align-items: self-start;
    justify-content: space-between;
    width: 90%;

    > button {
        margin: 10px;
    }
`

export const Bloco = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    width: 150px;
    height: 100px;
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

export const ContainerDados = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 90%;
    background-color: #c52f33;
    border-radius: 1rem;
    margin-bottom: 1rem;
    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.50), 0 2px 3px rgba(0, 0, 0, 1);

    > p {
        text-align: center;
        color: white;
        margin-top: 0;
    }
`