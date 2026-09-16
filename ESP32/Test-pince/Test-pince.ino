#include <ESP32Servo.h>

Servo servo;

const int SERVO_PIN = 13;

void setup() {
  Serial.begin(115200);

  servo.attach(SERVO_PIN);

  Serial.println("Servo à 0°");
  servo.write(90);
  delay(2000);

  Serial.println("Servo à 90°");
  servo.write(0);
  delay(2000);

}

void loop() {
}