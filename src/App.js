import { useEffect, useState } from 'react';
import { Amplify, Auth, Hub, API } from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';
import "@aws-amplify/ui-react/styles.css";
import awsConfig from './aws-exports';
const updatedAwsConfig = {
  ...awsConfig,
  "aws_cognito_identity_pool_id": "us-east-1:f8723b75-0cea-48fe-a891-7d9ad5a1e749",
    "aws_cognito_region": "us-east-1",
    "aws_user_pools_id": "us-east-1_QJ6WZ66Cf",
    "aws_user_pools_web_client_id": "2m5if1r2rf0ne4jj7i8sklofrb",
    "oauth": {},
    "aws_cognito_username_attributes": [],
    "aws_cognito_social_providers": [],
    "aws_cognito_signup_attributes": [
        "EMAIL"
    ],
    "aws_cognito_mfa_configuration": "OFF",
    "aws_cognito_mfa_types": [
        "SMS"
    ],
    "aws_cognito_password_protection_settings": {
        "passwordPolicyMinLength": 8,
        "passwordPolicyCharacters": []
    },
    "aws_cognito_verification_mechanisms": [
        "EMAIL"
    ],
}
Amplify.configure(updatedAwsConfig);
function App({ signOut, user }) {
  // const [user, setUser] = useState(null);
  // const serchparam = new URLSearchParams(document.location.search);
  // const PARENT_USER_POOL_DOMAIN = "paraent-pool-dev.auth.ap-south-1.amazoncognito.com";
  
  // useEffect(() => {
  //   Hub.listen('auth', ({ payload: { event, data } }) => {
  //     switch (event) {
  //       case 'signIn':
  //       case 'cognitoHostedUI':
  //         getUser().then(userData => setUser(userData));
  //         break;
  //       case 'signOut':
  //         setUser(null);
  //         break;
  //       case 'signIn_failure':
  //       case 'cognitoHostedUI_failure':
  //         console.log('Sign in failure', data);
  //         break;
  //     }
  //   });

  //   getUser().then(userData => setUser(userData));
  // }, []);

  // function getUser() {
  //   return Auth.currentAuthenticatedUser()
  //     .then(userData => userData)
  //     .catch(() => console.log('Not signed in'));
  // }


  async function callApi(){
    const apiName = "api73dae09e";
    const path = '/items';
    const myInit = {
        body:{
          "name":"value"
        },
        headers: {
        Authorization: `Bearer ${(await Auth.currentSession())
          .getIdToken()
          .getJwtToken()}`
      }
    };
    try {
        const response = await API.post(apiName, path, myInit);
        console.log(response);
    } catch (error) {
        console.log(error);
    }

  }

  return (
    <div>
      <p>User: {user ? JSON.stringify(user.attributes) : 'None'}</p>
      <button onClick={() => signOut()}>Sign Out</button>
      <button onClick={() => callApi()}>Call Api</button>
      {/* {serchparam.get("code") ? (
        <>
        <p>{serchparam.get("code")}</p>
        <button onClick={() => Auth.signOut()}>Sign Out</button>
        <a href={`https://${PARENT_USER_POOL_DOMAIN}/oauth2/idpresponse/?code=${serchparam.get("code")}`}>go to parent</a>
        </>
      ) : (
        <button onClick={() => Auth.federatedSignIn()}>Federated Sign In</button>
      )} */}
    </div>
  );
}
export default withAuthenticator(App);
