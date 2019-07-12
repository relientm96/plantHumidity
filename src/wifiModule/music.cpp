#include "music.h"
#include "mario.h"
#include "pirates.h"
#include "alert.h"

void initMusic(){
    pinMode(MUSIC_LED, OUTPUT);
    pinMode(ALERT_LED, OUTPUT);
}

void singMario() {
  digitalWrite(MUSIC_LED, HIGH);
  // iterate over the notes of the melody:
  for (int thisNote = 0; thisNote < marioLen; thisNote++) {
    int noteDuration = 1000 / mario_tempo[thisNote];
    tone(melodyPin, mario_melody[thisNote], noteDuration);

    // to distinguish the notes, set a minimum time between them.
    // the note's duration + 30% seems to work well:
    int pauseBetweenNotes = noteDuration * 1.30;
    delay(pauseBetweenNotes);

    // stop the tone playing:
    noTone(melodyPin);
  }
  digitalWrite(MUSIC_LED, LOW);
}

void singPirates() {
  digitalWrite(MUSIC_LED, HIGH);
  for (int i = 0 ; i < piratesLen ; i++) {
    int wait = pirates_tempo[i] * pirateSongSpeed;
    tone(melodyPin, pirates_melody[i], wait);
    delay(wait);
  }
  digitalWrite(MUSIC_LED, LOW);
}

void playAlert(){
  digitalWrite(ALERT_LED, HIGH);
  // iterate over the notes of the melody:
  for (int thisNote = 0; thisNote < alertLen; thisNote++) {
    int noteDuration = 1000 / alert_tempo[thisNote];
    tone(melodyPin, alert_melody[thisNote], noteDuration);

    // to distinguish the notes, set a minimum time between them.
    // the note's duration + 30% seems to work well:
    int pauseBetweenNotes = noteDuration * 1.30;
    delay(pauseBetweenNotes);

    // stop the tone playing:
    noTone(melodyPin);
  }
  digitalWrite(ALERT_LED, LOW);
}

void playMusic() {
  singMario();
  delay(1000);
  singPirates();
  delay(1000);
  //singSong(underworld_melody, underworld_tempo, underworldLen);
  //delay(1000);
}


