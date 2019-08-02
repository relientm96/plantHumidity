#include "Arduino.h"
#include <ESP8266WiFi.h>
#include <WiFiClient.h>
#include <ESP8266WiFiMulti.h> 
#include <ESP8266WebServer.h>
#include <ESP8266HTTPClient.h>

#include "music.h"
#include "sonar.h"
#include "moisture.h"

//Constants
#define WIFI_NAME       "Belong3D3DC4"
#define WIFI_PASS       "tkab4pau6uqx"
#define DELAY_INTERVAL  5000

void espInit();
void sendSensorData(char sensorData[]);
void serverHandle();

//Server Routing
void handleRoot();
void handleMario();
void handlePirates();
void handleNotFound();
void handleMoisture();

