#include "music.h"
#include "mario.h"
#include "pirates.h"

void initMusic(){
    pinMode(MUSIC_LED, OUTPUT);
}

void singSong(int melody[], int noteDurations[], int len) {
  digitalWrite(MUSIC_LED, HIGH);
  // iterate over the notes of the melody:
  for (int thisNote = 0; thisNote < len; thisNote++) {
    int noteDuration = 1000 / noteDurations[thisNote];
    tone(melodyPin, melody[thisNote], noteDuration);

    // to distinguish the notes, set a minimum time between them.
    // the note's duration + 30% seems to work well:
    int pauseBetweenNotes = noteDuration * 1.30;
    delay(pauseBetweenNotes);

    // stop the tone playing:
    noTone(melodyPin);
  }
  digitalWrite(MUSIC_LED, LOW);
}

void singPirates(int len) {
  digitalWrite(MUSIC_LED, HIGH);
  for (int i = 0 ; i < len ; i++) {
    int wait = pirates_tempo[i] * pirateSongSpeed;
    tone(melodyPin, pirates_melody[i], wait);
    delay(wait);
  }
  digitalWrite(MUSIC_LED, LOW);
}

void playMusic() {
  singSong(mario_melody, mario_tempo, marioLen);
  delay(1000);
  singPirates(piratesLen);
  delay(1000);
  //singSong(underworld_melody, underworld_tempo, underworldLen);
  //delay(1000);
}


