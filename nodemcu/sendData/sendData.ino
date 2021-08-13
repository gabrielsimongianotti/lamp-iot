#include <ESP8266HTTPClient.h>
#include <ESP8266WiFi.h>
#include <ArduinoJson.h>

int rele = 15;

const char* ssid = "Gatao 2.4 Ghz"; //Aqui o nome da sua rede local wi fi
const char* password =  "saginmoi"; // Aqui a senha da sua rede local wi fi

void setup() {
  Serial.begin(115200);
  pinMode(rele, OUTPUT);
  
  WiFi.begin(ssid, password);  
  
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.println("Waiting for connection");
  }
}

void loop() {
   String responseLamp = "";
   if (WiFi.status() == WL_CONNECTED) {
    WiFiClient wifiClient;
    HTTPClient http; 
    DynamicJsonDocument doc(1024);
    http.begin(wifiClient, "http://iot-lamp1223.herokuapp.com"); 
           
    int httpCode = http.GET();
    responseLamp = http.getString();
    deserializeJson(doc, responseLamp);
    JsonObject lamp = doc.as<JsonObject>();
    http.end(); 
  
    if(lamp["light"]){
      digitalWrite(rele, HIGH);
      Serial.println(responseLamp+"true");
    }
    else{
      Serial.println(responseLamp+"false");
      digitalWrite(rele, LOW);
    }

  } else {
 
    Serial.println("Error in WiFi connection");
 
  }
 
  delay(1000);
}
