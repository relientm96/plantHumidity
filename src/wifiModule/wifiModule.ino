#include "espModule.h"
#include "music.h"
#include "sonar.h"

#define THRESHOLD 5

void makePulse(){
  
}

void setup() {
  Serial.begin(115200);
  //espInit();
  initMusic();
  sonarInit();
}

// the loop function runs over and over again forever
void loop() {
  int dist = getDistance();
  Serial.println(dist);
  if(getDistance() <= THRESHOLD){
      Serial.println("Short Distance!");
      playMusic();
  }
}
