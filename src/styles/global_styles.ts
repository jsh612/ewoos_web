import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export default createGlobalStyle`
  /* @import url('https://fonts.googleapis.com/css?family=Maven+Pro&display=swap'); */
  ${reset}
  @media screen and (max-width: 500px){
    html{
      font-size: 10px;
    }
  }
  * {
	  box-sizing: border-box;
  }
  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    background-color: "#EAEDED"
  }

  a {
	  color: inherit;
	  text-decoration: none;
  }
  input,
  button{
	  &:focus,
	  &:active{outline:none}
  }
  h1,h2,h3,h4,h5,h6{
      font-family:'Maven Pro', sans-serif;
  }
`;
