#include "espModule.h"
#include "music.h"
#include "sonar.h"

#define THRESHOLD 5

int dist = 0;

void setup() {
  Serial.begin(115200);
  espInit();
  initMusic();
  sonarInit();
}

void loop() {
  //Run the ESP8266 server
  serverHandle();
  //Check for people around  
  dist = getDistance();
  if(getDistance() <= THRESHOLD){
      playAlert();
  }
  
}
