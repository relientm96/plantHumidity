#include "espModule.h"

//ESP8266 server instance
ESP8266WiFiMulti wifiMulti;    
// Create a webserver object that listens for HTTP request on port 80
ESP8266WebServer server(80);    

//Creating DHT Instance Object from Libray Class
DHT dhtInstance(DHT_PIN,DHT11,1);

/*
//URLS to make HTTP requests to
const char hostDistance[] = "http://5394abdf.ngrok.io/api/data";
const char hostTemperature[] = "http://5394abdf.ngrok.io/api/data";
const char hostHumidity[] = "http://5394abdf.ngrok.io/api/data";


char sensorData[] = "{\"humidity\":{\"time\":\"3141\",\"data\":3.3},\"temperature\":{\"time\":\"313211\",\"data\":23}}";
*/

void espInit() {

  Serial.print("\n");
  Serial.print("MAC: ");
  Serial.println(WiFi.macAddress());
  
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
  server.on("/", HTTP_OPTIONS, []() {
    server.sendHeader("Access-Control-Max-Age", "10000");
    server.sendHeader("Access-Control-Allow-Origin","*");
    server.sendHeader("Access-Control-Allow-Methods", "POST,GET,OPTIONS");
    server.sendHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    server.send(200, "text/plain", "" );
  });    
  server.onNotFound(handleNotFound); 

  //Data Polling Routes
  server.on("/moisture", HTTP_GET, handleMoisture);
  server.on("/temperature", HTTP_GET, handleTemp);  
  server.on("/humidity", HTTP_GET, handleHumidity);  

  //Start Server
  server.begin();                           
  Serial.println("HTTP server started");
  
}

/*
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
*/

void serverHandle(){
  // Listen for HTTP requests from clients
  server.handleClient();                  
}

//Routes to handle requests to ESP8266 server
void handleRoot() {
  server.sendHeader("Access-Control-Allow-Origin","*");
  server.sendHeader("Access-Control-Allow-Methods", "POST,GET,OPTIONS");
  server.sendHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  server.send(200, "text/plain", String(getDistance()));  
}

//Routes to handle requests to ESP8266 server
void handleMoisture() {
  server.sendHeader("Access-Control-Allow-Origin","*");
  server.sendHeader("Access-Control-Allow-Methods", "POST,GET,OPTIONS");
  server.sendHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  server.send(200, "text/plain", String(getMoisture()));  
}

//Temperature Readings
void handleTemp(){

  //Reading Temperature in Celcius
  float tempData = dhtInstance.readTemperature(false,false);
  
  server.sendHeader("Access-Control-Allow-Origin","*");
  server.sendHeader("Access-Control-Allow-Methods", "POST,GET,OPTIONS");
  server.sendHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  server.send(200, "text/plain", String(tempData));  
}

//Humidity Readings
void handleHumidity(){

  //Reading humidity
  float humidData = dhtInstance.readHumidity(false);

  server.sendHeader("Access-Control-Allow-Origin","*");
  server.sendHeader("Access-Control-Allow-Methods", "POST,GET,OPTIONS");
  server.sendHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  server.send(200, "text/plain", String(humidData));  
}


//Musical Functions
void handleMario(){
  server.sendHeader("Access-Control-Allow-Origin","*");
  server.sendHeader("Access-Control-Allow-Methods", "POST,GET,OPTIONS");
  server.sendHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  server.send(202, "text/plain", "Playing Mario...");
  singMario();
}

void handlePirates(){
  server.sendHeader("Access-Control-Allow-Origin","*");
  server.sendHeader("Access-Control-Allow-Methods", "POST,GET,OPTIONS");
  server.sendHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  server.send(202, "text/plain", "Playing Pirates...");
  singPirates();
}

void handleNotFound(){
  server.sendHeader("Access-Control-Allow-Origin","*");
  server.sendHeader("Access-Control-Allow-Methods", "POST,GET,OPTIONS");
  server.sendHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  server.send(404, "text/plain", "404: Not found");
}

