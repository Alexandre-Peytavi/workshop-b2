// Pin joystick

const int JOYSTICK_X = 34;
const int JOYSTICK_Y = 35;


//  Pin Moteur A

const int A_INT1 = 25;
const int A_INT2 = 26;


// Pin Moteur B 

const int B_INT1 = 27;
const int B_INT2 = 14;


// Pin Moteur C

const int C_INT1 = 32;
const int C_INT2 = 33;


// coordonnés centre du joystick

const int CENTRE_X = 2047;
const int CENTRE_Y = 1920;

const int DEAD_ZONE = 250;


// Les deux moteurs à l'arret par défaut  

void glissieres_stop() {
  digitalWrite(A_INT1, LOW);
  digitalWrite(A_INT2, LOW);

  digitalWrite(C_INT1, LOW);
  digitalWrite(C_INT2, LOW);
}


// Sens vers l'avant pour les deux moteurs synchro 

void glissieres_sens1() {
  // Moteur A
  digitalWrite(A_INT1, HIGH);
  digitalWrite(A_INT2, LOW);

  // Moteur C inversé
  digitalWrite(C_INT1, LOW);
  digitalWrite(C_INT2, HIGH);
}

void glissieres_sens2() {
  // Moteur A
  digitalWrite(A_INT1, LOW);
  digitalWrite(A_INT2, HIGH);

  // Moteur C inversé
  digitalWrite(C_INT1, HIGH);
  digitalWrite(C_INT2, LOW);
}


// Moteur c à l'arret

void moteurB_stop() {
  digitalWrite(B_INT1, LOW);
  digitalWrite(B_INT2, LOW);
}


// sens vers l'avant pour le dernier moteur 

void moteurB_sens1() {
  digitalWrite(B_INT1, HIGH);
  digitalWrite(B_INT2, LOW);
}


// =========================
// MOTEUR B : SENS 2
// =========================

void moteurB_sens2() {
  digitalWrite(B_INT1, LOW);
  digitalWrite(B_INT2, HIGH);
}


// =========================
// SETUP
// =========================

void setup() {

  Serial.begin(115200);

  pinMode(A_INT1, OUTPUT);
  pinMode(A_INT2, OUTPUT);

  pinMode(B_INT1, OUTPUT);
  pinMode(B_INT2, OUTPUT);

  pinMode(C_INT1, OUTPUT);
  pinMode(C_INT2, OUTPUT);

  glissieres_stop();
  moteurB_stop();
}


// =========================
// LOOP
// =========================

void loop() {

  int x = analogRead(JOYSTICK_X);
  int y = analogRead(JOYSTICK_Y);

  bool xBouge = abs(x - CENTRE_X) > DEAD_ZONE;
  bool yBouge = abs(y - CENTRE_Y) > DEAD_ZONE;


  // Toujours arrêter tout avant de choisir
  glissieres_stop();
  moteurB_stop();


  // =========================
  // AXE X = HAUT / BAS
  // MOTEUR A + C
  // =========================

  if (xBouge && !yBouge) {

    // HAUT
    if (x > CENTRE_X + DEAD_ZONE) {
      glissieres_sens1();
    }

    // BAS
    else if (x < CENTRE_X - DEAD_ZONE) {
      glissieres_sens2();
    }
  }


  // =========================
  // AXE Y = GAUCHE / DROITE
  // MOTEUR B
  // =========================

  else if (yBouge && !xBouge) {

    // DROITE
    if (y > CENTRE_Y + DEAD_ZONE) {
      moteurB_sens1();
    }

    // GAUCHE
    else if (y < CENTRE_Y - DEAD_ZONE) {
      moteurB_sens2();
    }
  }


  // =========================
  // DIAGONALE OU CENTRE
  // → TOUT ARRÊTÉ
  // =========================

  else {
    glissieres_stop();
    moteurB_stop();
  }


  // =========================
  // MONITEUR SÉRIE
  // =========================

  Serial.print("X : ");
  Serial.print(x);

  Serial.print(" | Y : ");
  Serial.println(y);

  delay(20);
}