import styled from "@emotion/styled";
import { backgroundDefault, textDefaultColor } from "./theme";

export const AuthorizationForm = styled.form`
  justify-content: space-between;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  padding: 40px;
  width: 340px;
  position: relative;

  .MuiFormControl-root {
    margin-bottom: 10px;
  }

  button {
    margin-top: 20px;
  }

  h5 {
    margin-bottom: 20px;
  }

  input {
    :-webkit-autofill,
    :-webkit-autofill:active,
    :-webkit-autofill:target,
    :-webkit-autofill:focus-within,
    :-webkit-autofill:focus-visible,
    :-webkit-autofill:visited,
    :-webkit-autofill:hover,
    :-webkit-autofill:focus {
      -webkit-text-fill-color: ${textDefaultColor};
      -webkit-box-shadow: 0 0 0px 40rem ${backgroundDefault} inset;
    }
  }

  .MuiAlert-root {
    margin-bottom: 20px;
  }
`;

export const AuthorizationContainer = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
`;
