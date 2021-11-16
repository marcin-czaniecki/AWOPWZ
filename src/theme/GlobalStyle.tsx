import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    *,*::after,*::before{
        box-sizing: border-box;
        font-family: ${({ theme }) => theme.font.family.primary};
        margin-top:0;
    }

    body{
        height: 100vh;
        margin: 0;
        color:${({ theme }) => theme.color.text};
    }
    #root{
        height: 100%;
    }
    /* width */
    ::-webkit-scrollbar {
    width: 10px;
    }

    /* Track */
    ::-webkit-scrollbar-track {
    background: #f1f1f1;
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.color.primary};
    }

    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.color.secondary};;
    }
`;

export default GlobalStyle;
