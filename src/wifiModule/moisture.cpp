#include "moisture.h"

int getMoisture(){
  int sensorValue = analogRead(A0);
  int percentageSensorValue = map(sensorValue, 1024, 450, 0, 100);
  return percentageSensorValue;
}

