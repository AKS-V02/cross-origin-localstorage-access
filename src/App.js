import { useEffect, useState } from 'react';
import { Amplify, Auth, Hub, API } from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';
import "@aws-amplify/ui-react/styles.css";
import awsConfig from './aws-exports';
const updatedAwsConfig = {
  ...awsConfig,
  // "aws_cognito_identity_pool_id": "us-east-1:f8723b75-0cea-48fe-a891-7d9ad5a1e749",
  //   "aws_cognito_region": "us-east-1",
  //   "aws_user_pools_id": "us-east-1_QJ6WZ66Cf",
  //   "aws_user_pools_web_client_id": "2m5if1r2rf0ne4jj7i8sklofrb",
  //   "oauth": {},
  //   "aws_cognito_username_attributes": [],
  //   "aws_cognito_social_providers": [],
  //   "aws_cognito_signup_attributes": [
  //       "EMAIL"
  //   ],
  //   "aws_cognito_mfa_configuration": "OFF",
  //   "aws_cognito_mfa_types": [
  //       "SMS"
  //   ],
  //   "aws_cognito_password_protection_settings": {
  //       "passwordPolicyMinLength": 8,
  //       "passwordPolicyCharacters": []
  //   },
  //   "aws_cognito_verification_mechanisms": [
  //       "EMAIL"
  //   ],
  "aws_cognito_identity_pool_id": "us-east-1:f8723b75-0cea-48fe-a891-7d9ad5a1e749",
    "aws_cognito_region": "us-east-1",
    "aws_user_pools_id": "us-east-1_QJ6WZ66Cf",
    "aws_user_pools_web_client_id": "2m5if1r2rf0ne4jj7i8sklofrb",
    "oauth": {
        "domain": "coauthtest-dev.auth.us-east-1.amazoncognito.com",
        "scope": [
            "openid"
        ],
        "redirectSignIn": "https://main.dhtu7f4vmkj8g.amplifyapp.com/",
        "redirectSignOut": "https://main.d3hylets18emzs.amplifyapp.com/",
        "responseType": "code"
    },
    "federationTarget": "COGNITO_USER_POOLS",
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

const listener = (data) => {
  switch (data.payload.event) {
    case 'configured':
      console.info('the Auth module is configured')
      console.info('the Auth module is configured');
      break;
    case 'signIn':
      console.info('user signed in');
      break;
    case 'signIn_failure':
      console.error('user sign in failed');
      break;
    case 'signUp':
      console.info('user signed up');
      break;
    case 'signUp_failure':
      console.error('user sign up failed');
      break;
    case 'confirmSignUp':
      console.info('user confirmation successful');
      break;
    case 'completeNewPassword_failure':
      console.error('user did not complete new password flow');
      break;
    case 'autoSignIn':
      console.info('auto sign in successful');
      break;
    case 'autoSignIn_failure':
      console.error('auto sign in failed');
      break;
    case 'forgotPassword':
      console.info('password recovery initiated');
      break;
    case 'forgotPassword_failure':
      console.error('password recovery failed');
      break;
    case 'forgotPasswordSubmit':
      console.info('password confirmation successful');
      break;
    case 'forgotPasswordSubmit_failure':
      console.error('password confirmation failed');
      break;
    case 'verify':
      console.info('TOTP token verification successful');
      break;
    case 'tokenRefresh':
      console.info('token refresh succeeded');
      break;
    case 'tokenRefresh_failure':
      console.error('token refresh failed');
      break;
    case 'cognitoHostedUI':
      console.info('Cognito Hosted UI sign in successful');
      break;
    case 'cognitoHostedUI_failure':
      console.error('Cognito Hosted UI sign in failed');
      break;
    case 'customOAuthState':
      console.info('custom state returned from CognitoHosted UI');
      break;
    case 'customState_failure':
      console.error('custom state failure');
      break;
    case 'parsingCallbackUrl':
      console.info('Cognito Hosted UI OAuth url parsing initiated');
      break;
    case 'userDeleted':
      console.info('user deletion successful');
      break;
    case 'updateUserAttributes':
      console.info('user attributes update successful');
      break;
    case 'updateUserAttributes_failure':
      console.info('user attributes update failed');
      break;
    case 'signOut':
      console.info('user signed out');
      break;
  }
};

Hub.listen('auth', listener);
Amplify.configure(updatedAwsConfig);





// function App({ signOut, user }) 
function App() {
  const [localStore, setLocalStore] = useState(null);
  const [user, setUser] = useState(null);
  // const serchparam = new URLSearchParams(document.location.search);
  // const PARENT_USER_POOL_DOMAIN = "paraent-pool-dev.auth.ap-south-1.amazoncognito.com";
  // var localStore = null;
  useEffect(() => {
    Hub.listen('auth', ({ payload: { event, data } }) => {
      switch (event) {
        case 'signIn':
        case 'cognitoHostedUI':
          getUser().then(userData => setUser(userData));
          break;
        case 'signOut':
          setUser(null);
          break;
        case 'signIn_failure':
        case 'cognitoHostedUI_failure':
          console.log('Sign in failure', data);
          break;
      }
    });

    getUser().then(userData => setUser(userData));
  }, []);

  function getUser() {
    return Auth.currentAuthenticatedUser({
      bypassCache: true // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
    })
      .then(userData => console.log('signed in'+JSON.stringify(userData)))
      .catch(() => console.log('Not signed in'));
  }
  
  // useEffect(() => {
  //   if(user.username!==""){
  //     setLocalStore(JSON.stringify(window.localStorage));
  //     getUser();
  //     // Auth.currentSession().then(Data => console.log('signed in'+JSON.stringify(Data)))
  //     // .catch(() => console.log('invalid session'));
  //   }else {
  //     setLocalStore({});
  //   }

  // },[user.username]);


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

        // const wind = document.getElementById("iframe").contentWindow;
        // wind.postMassage(JSON.stringify(user),"*")
    } catch (error) {
        console.log(error);
    }

  }

  return (
    <div>
      <p>User: {user ? JSON.stringify(user.attributes) : 'None'}</p>
      <button onClick={() => Auth.signOut({ global: true })}>Sign Out</button>
      <button onClick={() => callApi()}>Call Api</button>
      <a href={`http://localhost:3001/?code=${localStore}`}>go to child</a>
      {/* {serchparam.get("code") ? (
        <>
        <p>{serchparam.get("code")}</p>
        <button onClick={() => Auth.signOut()}>Sign Out</button>
        <a href={`https://${PARENT_USER_POOL_DOMAIN}/oauth2/idpresponse/?code=${serchparam.get("code")}`}>go to parent</a>
        </>
      ) : (
        <button onClick={() => Auth.federatedSignIn()}>Federated Sign In</button>
      )} */}
      <button onClick={() => Auth.federatedSignIn()}>Federated Sign In</button>
    </div>
  );
}
export default App;
