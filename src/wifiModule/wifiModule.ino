#include "Arduino.h"
#include <ESP8266WiFi.h>
#include <WiFiClient.h> 
#include <ESP8266WebServer.h>
#include <ESP8266HTTPClient.h>

//Constants
#define WIFI_NAME       "Belong3D3DC4"
#define WIFI_PASS       "tkab4pau6uqx"
#define ESP_BAUD        115200
#define DELAY_INTERVAL  5000

const char host[] = "http://1c7a2ea6.ngrok.io";   
char sensorData[] = "{\"sensor\":\"gps\",\"time\":1351824120,\"data\":[48.756080,2.302038]}";
 
void setup() {
  Serial.begin(ESP_BAUD);                                  
  WiFi.begin(WIFI_NAME, WIFI_PASS);                     
  Serial.println("Waiting for connection");
  while (WiFi.status() != WL_CONNECTED) {                 
    delay(500);
    Serial.print(".");
  }
  Serial.print("\nESP IP Address: ");
  Serial.println(WiFi.localIP());
}
 
void loop() {
  
  if(WiFi.status()== WL_CONNECTED){          
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
 else{
    Serial.println("Error in WiFi connection");   
 }
  delay(DELAY_INTERVAL);  
}
