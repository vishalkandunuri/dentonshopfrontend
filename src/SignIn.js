// src/SignIn.js
import React from "react";
import {
  AmplifyAuthenticator,
  AmplifySignIn,
  AmplifySignUp,
} from "@aws-amplify/ui-react";

const SignIn = () => {
  return (
    <AmplifyAuthenticator>
      <div>
        <h1>Sign In</h1>
        <AmplifySignIn />
        <AmplifySignUp slot="sign-up" />
      </div>
    </AmplifyAuthenticator>
  );
};

export default SignIn;
