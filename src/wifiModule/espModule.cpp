#include "espModule.h"

//ESP8266 server instance
ESP8266WiFiMulti wifiMulti;    
// Create a webserver object that listens for HTTP request on port 80
ESP8266WebServer server(80);    

//URLS to make HTTP requests to
const char hostDistance[] = "http://5394abdf.ngrok.io/api/data";
const char hostTemperature[] = "http://5394abdf.ngrok.io/api/data";
const char hostHumidity[] = "http://5394abdf.ngrok.io/api/data";

char sensorData[] = "{\"humidity\":{\"time\":\"3141\",\"data\":3.3},\"temperature\":{\"time\":\"313211\",\"data\":23}}";

void espInit() {
  
  //Client Initializations
  Serial.println("Trying to connect to WiFi for HTTP Client");
  WiFi.begin(WIFI_NAME, WIFI_PASS);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("\n----------");
  
  //Server Initializations 
  Serial.println("Trying to connect to WiFi for HTTP Server");
  wifiMulti.addAP(WIFI_NAME,WIFI_PASS);
  // Connect webserver to WiFi network
  while (wifiMulti.run() != WL_CONNECTED) { 
    delay(500);
    Serial.print(".");
  }
  //Print Server Info
  Serial.print("Connected to ");
  Serial.println(WiFi.SSID());             
  Serial.print("IP address:\t");
  Serial.println(WiFi.localIP());

  //Callback functions when routing to ESP Server
  server.on("/", HTTP_GET, handleRoot);  
  server.on("/mario", HTTP_POST, handleMario);  
  server.on("/pirates", HTTP_POST, handlePirates);                  
  server.onNotFound(handleNotFound); 

  //Start Server
  server.begin();                           
  Serial.println("HTTP server started");
  
}

//Make a request to the remote server
void sendSensorData(char sensorData[]) {
  if (WiFi.status() == WL_CONNECTED) {
    //Create http object of class HTTPClient
    HTTPClient http;
    //Specify Request Destination
    http.begin(hostDistance);
    //Add headers in request
    http.addHeader("Content-Type", "application/json");

    //Send the post request
    int httpCode = http.POST(sensorData);
    String payload = http.getString();

    //Print HTTP return code
    Serial.print("HTTP return Code is: ");
    Serial.println(httpCode);
    //Print request response payload
    Serial.print("Request Response Payload: ");
    Serial.println(payload);
    Serial.println("------------");

    //Close connection
    http.end();
  }
}

void serverHandle(){
  // Listen for HTTP requests from clients
  server.handleClient();                    
}

//Routes to handle requests to ESP8266 server
void handleRoot() {
  server.sendHeader("Access-Control-Max-Age", "10000");
  server.sendHeader("Access-Control-Allow-Methods", "POST,GET,OPTIONS");
  server.sendHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  server.send(200, "text/plain", String(getDistance()));  
}

void handleMario(){
  singMario();
}

void handlePirates(){
  singPirates();
}

void handleNotFound(){
   if (server.method() == HTTP_OPTIONS){
       server.sendHeader("Access-Control-Allow-Origin", "*");
       server.sendHeader("Access-Control-Max-Age", "10000");
       server.sendHeader("Access-Control-Allow-Methods", "PUT,POST,GET,OPTIONS");
       server.sendHeader("Access-Control-Allow-Headers", "*");
       server.send(204);
    }
    else{
      server.send(404, "text/plain", "404: Not found");
    }
}

