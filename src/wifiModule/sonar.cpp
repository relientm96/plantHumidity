#include "sonar.h"

void sonarInit(){
  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);
}

void sonarPulse(){
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);
}

int getDistance(){
  sonarPulse();
  int distance = 0;
  //Send echo wave
  int duration = pulseIn(echoPin, HIGH);
  //Determine distance from duration
  //343 for speed of sounds
  distance = (duration/2)*0.0343;
  return distance;
}

