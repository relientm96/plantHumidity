#include "pitches.h"

//Mario main theme melody
int alert_melody[] = {
  NOTE_E7, NOTE_E7, 0, NOTE_E7,
  0, NOTE_C7, NOTE_E7, 0,
  NOTE_G7, 0, 0,  0,
  NOTE_G6, 0, 0, 0,
};

//Mario main theme tempo
int alert_tempo[] = {
  12, 12, 12, 12,
  12, 12, 12, 12,
  12, 12, 12, 12,
  12, 12, 12, 12,
};

#define alertLen          sizeof(alert_melody)/sizeof(alert_melody[0])



