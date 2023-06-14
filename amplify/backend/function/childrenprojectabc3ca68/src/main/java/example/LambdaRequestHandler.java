
package example;

import java.util.Map;

import com.amazonaws.services.lambda.runtime.Context; 
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyRequestEvent;
import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyResponseEvent;

public class LambdaRequestHandler implements RequestHandler<APIGatewayProxyRequestEvent, APIGatewayProxyResponseEvent>{   
    APIGatewayProxyResponseEvent response = new APIGatewayProxyResponseEvent();
    Map<String, String> headers = Map.of("Content-Type", "application/json", 
                                        "Access-Control-Allow-Origin", "*",
                                        "Access-Control-Allow-Methods", "*");
    public APIGatewayProxyResponseEvent handleRequest(APIGatewayProxyRequestEvent request, Context context){
        String greetingString = String.format("Hello %s auth %s", request.getBody(),request.getRequestContext().getAuthorizer().get("claims"));
        return response.withBody(greetingString)
                        .withHeaders(headers).withStatusCode(200);
    }
}