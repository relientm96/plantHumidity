#include "espModule.h"
#include "music.h"
#include "sonar.h"

#define THRESHOLD         5
#define COUNT_THRESHOLD   2

int dist = 0;

void setup() {
  Serial.begin(115200);
  espInit();
  initMusic();
  sonarInit();
}

void loop() {
  dist = getDistance();
  Serial.println(dist);
  
  //Run the ESP8266 server
  serverHandle();
  
  //Check for people around  
  if(dist <= THRESHOLD){
    Serial.println("In loop waiting to confirm");
    delay(10);
    if(getDistance() <= THRESHOLD){
      playAlert();
    }
  } 

}
