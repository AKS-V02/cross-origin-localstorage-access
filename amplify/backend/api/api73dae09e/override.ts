// This file is used to override the REST API resources configuration
import { AmplifyApiRestResourceStackTemplate } from '@aws-amplify/cli-extensibility-helper';

export function override(resources: AmplifyApiRestResourceStackTemplate) {
    // Add our user pool id as a parameter so we can create authorizers with it
  // Note that you have to replace <your auth name here> with the name of your auth!
  // It's the name of the folder in amplify/backend/auth that was created when you
  // added the auth to the project (NOT userPoolGroups). Also make sure you keep
  // the preceding "auth" part of the string before the auth name, it's necessary.
  resources.addCfnParameter(
    {
      type: "String",
      description:
        "The id of an existing User Pool to connect. If this is changed, a user pool will not be created for you.",
      default: "NONE",
    },
    "AuthCognitoUserPoolId",
    "us-east-1_QJ6WZ66Cf"
  );

resources.addCfnParameter(
    {
      type: "String",
      description:
        "The id is Account Id where common Cognito user pool is available",
      default: "NONE",
    },
    "AwsAccountIdOfCognito",
    "197729915410"
  );
  resources.addCfnParameter(
    {
      type: "String",
      description:
        "The id is Account Region where common Cognito user pool is available",
      default: "NONE",
    },
    "AwsCognitoRegion",
    "us-east-1"
  );

  // create the authorizer using the AuthCognitoUserPoolId parameter defined above
  resources.restApi.addPropertyOverride("Body.securityDefinitions", {
    Cognito: {
      type: "apiKey",
      name: "Authorization",
      in: "header",
      "x-amazon-apigateway-authtype": "cognito_user_pools",
      "x-amazon-apigateway-authorizer": {
        type: "cognito_user_pools",
        providerARNs: [
          {
            "Fn::Join": [
              "",
              [
                "arn:aws:cognito-idp:",
                {
                  Ref: "AwsCognitoRegion",
                },
                ":",
                {
                  Ref: "AwsAccountIdOfCognito",
                },
                ":userpool/",
                {
                  Ref: "AuthCognitoUserPoolId",
                },
              ],
            ],
          },
        ],
      },
    },
  });
  // for each path in the rest API, add the authorizer for all methods
  for (const path in resources.restApi.body.paths) {
    // add the Authorization header as a parameter to the rest API for the path
    resources.restApi.addPropertyOverride(
      `Body.paths.${path}.x-amazon-apigateway-any-method.parameters`,
      [
        ...resources.restApi.body.paths[path]["x-amazon-apigateway-any-method"]
          .parameters,
        {
          name: "Authorization",
          in: "header",
          required: false,
          type: "string",
        },
      ]
    );
    // set the security method to use our user pool authorizer
    // TODO: do we need to destructure the other security methods as well?
      resources.restApi.addPropertyOverride(
        `Body.paths.${path}.x-amazon-apigateway-any-method.security`,
        [
          {
            Cognito: [  ],
  
          },
        ]
      );
    
  }
}
