#include "espModule.h"

//ESP8266 server instance
ESP8266WiFiMulti wifiMulti;    
// Create a webserver object that listens for HTTP request on port 80
ESP8266WebServer server(80);    

const char host[] = "http://5394abdf.ngrok.io/api/data";
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
  server.on("/", HTTP_POST, handlePost);          
  server.onNotFound(handleNotFound);        

  //Start Server
  server.begin();                           
  Serial.println("HTTP server started");
  
}

//Make a request to the remote server
void sendSensorData() {
  if (WiFi.status() == WL_CONNECTED) {
    //Create http object of class HTTPClient
    HTTPClient http;
    //Specify Request Destination
    http.begin(host);
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
  server.send(200, "text/plain", "Hello world!");  
}

//Handle Button press from external remote client to ESP8266 server
void handlePost(){
  
  playMusic();
  
}

void handleNotFound(){
  server.send(404, "text/plain", "404: Not found");
}

