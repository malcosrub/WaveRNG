
#include<LiquidCrystal_I2C.h>
#include<Wire.h>

#define sensorPin A0
#define pauseButtonPin 0

unsigned long previousMicValue = 0;
bool paused = false;

LiquidCrystal_I2C lcd(0x27, 16, 2); 

void setup() {
  pinMode(pauseButtonPin, INPUT_PULLUP);
  Serial.begin(9600);

  Wire.begin();
  lcd.init();
  lcd.backlight();
  lcd.setCursor(0,0);
  lcd.print("Resultado:");
}

void loop() {
  int buttonState = digitalRead(pauseButtonPin);

  if (buttonState == LOW) {
    paused = !paused;  // Alternar entre pausado y no pausado
    delay(200); // Antirebote para evitar multiples lecturas de un solo toque
  }

  if (!paused) {
    unsigned long currentMicValue = analogRead(sensorPin);
    unsigned long noiseDifference = abs(currentMicValue - previousMicValue);
    unsigned long randomValue;
    randomSeed(noiseDifference);
    randomValue = random(100);
      

    Serial.println(randomValue);

    lcd.setCursor(0, 1);
    lcd.print("       ");
    lcd.print(randomValue);
    lcd.print("  ");

    previousMicValue = currentMicValue;
    delay(300);
  }
}
