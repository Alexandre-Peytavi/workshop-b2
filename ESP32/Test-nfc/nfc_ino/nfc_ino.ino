/*
 * This ESP32 code is created by esp32io.com
 *
 * This ESP32 code is released in the public domain
 *
 * For more detail (instruction and wiring diagram), visit https://esp32io.com/tutorials/esp32-rfid-nfc
 */

#include <SPI.h>
#include <MFRC522.h>
#include <WiFi.h>
#include <PubSubClient.h>

#define SS_PIN  5  // ESP32 pin GPIO5 
#define RST_PIN 27 // ESP32 pin GPIO27 

const char* ssid = "WIFI_LABO";
const char* password = "EpsiWis2018!";

const char* mqtt_server = "172.16.99.1";  // ex: 51.178.xxx.xxx
const int mqtt_port = 1883;

WiFiClient espClient;
PubSubClient client(espClient);

MFRC522 rfid(SS_PIN, RST_PIN);

struct ObjetUID{
  const char* nom;
  const byte uid[7];
};

// UID des objets dans la machine
ObjetUID objets[] = {
  { "Rick", {0x53, 0xCC, 0xD2, 0xA2, 0x13, 0x00, 0x01}},
  { "Morty Comcombre", {0x04, 0x93, 0xFF, 0x13, 0x41, 0x02, 0x89}},
  { "Morty", {0x04, 0xE3, 0x72, 0xC5, 0x40, 0x02, 0x89}},
  { "Summer Smith", {0x04, 0x63, 0x07, 0xE5, 0x3A, 0x02, 0x89}},
  { "Vaisseau de Rick et Morty", {0x04, 0x23, 0xC1, 0xB4, 0x3D, 0x02, 0x89}}
};

bool comparerUID(const byte uidLu[7], const ObjetUID objet) {
  for (int i = 0; i < 5; i++) {
    if (uidLu[i] != objet.uid[i]) return false;
  }
  return true;
}

void afficherInfoObjet(const char* nom) {
  Serial.print("Objet détecté : ");
  Serial.println(nom);
}

void reconnect() {
  while (!client.connected()) {
    Serial.print("Connexion MQTT...");
    if (client.connect("esp32_machine")) {
      Serial.println("OK");
      client.subscribe("webapp/machine/command");
    } else {
      Serial.print("Échec, code=");
      Serial.println(client.state());
      delay(2000);
    }
  }
}

void setup() {
  Serial.begin(9600);

  // Connexion WiFi
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("WiFi connecté");

  // MQTT
  client.setServer(mqtt_server, mqtt_port);
  reconnect();   

  // NFC
  SPI.begin();
  rfid.PCD_Init();

  Serial.println("Tap an RFID/NFC tag on the RFID-RC522 reader");
}


void loop() {
  /// MQTT
  if (!client.connected()) {
    reconnect();
  }

  client.loop();    

  /// NFC
  if (rfid.PICC_IsNewCardPresent()) { // new tag is available
    if (rfid.PICC_ReadCardSerial()) { // NUID has been readed
      MFRC522::PICC_Type piccType = rfid.PICC_GetType(rfid.uid.sak);
      Serial.print("RFID/NFC Tag Type: ");
      Serial.println(rfid.PICC_GetTypeName(piccType));

      // print UID in Serial Monitor in the hex format
      Serial.print("UID:");
      for (int i = 0; i < rfid.uid.size; i++) {
        Serial.print(rfid.uid.uidByte[i] < 0x10 ? " 0" : " ");
        Serial.print(rfid.uid.uidByte[i], HEX);
      }
      Serial.println();
      
     bool trouve = false;

      for (int i = 0; i < 5; i++) {
        if (comparerUID(rfid.uid.uidByte, objets[i])) {
          afficherInfoObjet(objets[i].nom);

          client.publish("esp32/machine/nfc", objets[i].nom);
          trouve = true;
          break;
        }
      }

      if (!trouve) {
        Serial.println("UID inconnu.");
        client.publish("esp32/machine/nfc", "inconnu");        
      }

      rfid.PICC_HaltA(); // halt PICC
      rfid.PCD_StopCrypto1(); // stop encryption on PCD
    }
  }
}