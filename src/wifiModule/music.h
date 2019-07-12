#include "Arduino.h"

#define melodyPin         5
#define MUSIC_LED         12
#define pirateSongSpeed   1

void initMusic();
void singSong(int melody[], int noteDurations[], int len);
void singPirates(int len);
void playMusic();
