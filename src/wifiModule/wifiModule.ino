#include "espModule.h"
#include "music.h"
#include "sonar.h"

#define THRESHOLD 5

void setup() {
  Serial.begin(115200);
  espInit();
  initMusic();
  sonarInit();
}

void loop() {

   serverHandle();
    
  /*
  int dist = getDistance();
  Serial.println(dist);
  if(getDistance() <= THRESHOLD){
      Serial.println("Short Distance!");
      playMusic();
  }
  */
}
