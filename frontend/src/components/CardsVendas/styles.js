import styled from "styled-components";


export const CardConteiner = styled.div`
    margin-top: 0.7rem;
    border-radius: 0.5rem;
    padding: 0.5rem;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24); 
    width: 90%;
    position: relative;
    background-color: ${props => `${props.color}`};

    :active {
        transform: scale(0.98);
        box-shadow: 3px 2px 22px 1px rgba(0, 0, 0, 0.24);
    }

    > p {
        margin: 10px 0px;
        padding: 0;
    }

    > #edititem {
        position: absolute;
        right: 10px;
        top: 20px;
        > #feedicon {
            font-size: 30px;
        }
    }

    > .row {
        display: flex;
        flex-direction: row;
        padding: none;

        > .col {
            display: flex;
            flex-direction: column;
            padding: 0;
            width: 100%
        }
    }

`

export const StatusCard = styled.label`
    color: ${(props) => props.color}
`