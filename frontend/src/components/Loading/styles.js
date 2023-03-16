import styled from 'styled-components'


export const Container = styled.div`
    display: flex;
    align-items: center;
    width: 50px;
    height: 50px;
    animation: slideinfinity 3s infinite;
    border-radius: 50%;

    > img {
        width: 100%;
        height: 100%;
        align-self: center;
        text-align: center;
        
    
        @keyframes slideinfinity {
            to {
                transform: rotate(360deg);
            }
        }
        /* @keyframes carregandodiniz {
            100% { background-image: linear-gradient(180deg, #fff, #fff, #fff, #fff)}
            75% { background-image: linear-gradient(180deg, #fff, #fff, #fff, #c52f33)}
            50% { background-image: linear-gradient(180deg, #fff, #fff, #c52f33, #c52f33)}
            25% { background-image: linear-gradient(180deg, #fff, #c52f33, #c52f33, #c52f33)}
            0% { background-image: linear-gradient(180deg, #c52f33, #c52f33, #c52f33, #c52f33)}
        } */
    };
`