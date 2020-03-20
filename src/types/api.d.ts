/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: login
// ====================================================

export interface login_Login {
  __typename: "LoginResponse";
  ok: boolean;
  error: string | null;
  token: string | null;
  username: string | null;
}

export interface login {
  Login: login_Login;
}

export interface loginVariables {
  userId: string;
  password: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

//==============================================================
// END Enums and Input Objects
//==============================================================
