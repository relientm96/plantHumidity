#include "espModule.h"

const char host[] = "http://5394abdf.ngrok.io/api/data";
char sensorData[] = "{\"humidity\":{\"time\":\"3141\",\"data\":3.3},\"temperature\":{\"time\":\"313211\",\"data\":23}}";

void espInit() {
  WiFi.begin(WIFI_NAME, WIFI_PASS);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
  }
}

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

    /*
      //Print HTTP return code
      Serial.print("HTTP return Code is: ");
      Serial.println(httpCode);
      //Print request response payload
      Serial.print("Request Response Payload: ");
      Serial.println(payload);
      Serial.println("------------");
    */

    //Close connection
    http.end();
  }
  delay(DELAY_INTERVAL);
}


