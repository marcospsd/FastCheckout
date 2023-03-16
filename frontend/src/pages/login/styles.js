import styled from 'styled-components'


export const Container = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
    align-items: center;
    justify-content: center;
    margin: 0;

    > img {
        width: 300px;
        padding: 1rem;

    }

`

export const ContainerLogin = styled.div`
    display: flex;
    flex-direction: column;
    min-width: 300px;
    max-width: 400px;
    height: 350px;
    background-color: #fbfbf8;
    border-radius: 1.5rem;
    padding: 1.5rem;
    align-items: center;
    justify-content: center;
    box-shadow: 0 10px 10px -5px;
    animation-duration: 3s;
    animation-name: slidein;

    > button {
        background-color: var(--primarycolor);
    }

    > button:hover{
        background-color: whitesmoke;
        color: black
    }

    > img {
        width: 300px;

    }


    @keyframes slidein {
        from {
            margin-bottom: 300%;
        }

        to {
            margin-bottom: 0%;
        }
    }


`

export const Helper = styled.span`
    background-color: red;
    color: black;
    width: 100%;
    margin: 0.5rem;
    border-radius: 1rem;
    text-align: center;
    color: white
`