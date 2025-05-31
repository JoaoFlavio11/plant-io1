#include <WiFi.h>
#include <HTTPClient.h>
#include <time.h>
#include <ThreeWire.h>
#include <RtcDS1302.h>
#include <Adafruit_Sensor.h>
#include <DHT.h>
#include <DHT_U.h>
#include <Arduino.h>
#include <LCDI2C_Latin_Symbols.h>
#include <Wire.h>

const int pinoLDR = 34; // Pino analógico Sensor de Luz
#define GAS 35  // Pino analógico Sensor de Gás
#define LEDs 13 // Pino digital dos LEDs


// Definição dos pinos dos relés
#define BOMBA1 26      // Pino digital 12 - Bomba 01
#define BOMBA2 23      // Pino digital 26 - Bomba 02
#define COOLERS 14      // Pino digital 14 - Coolers

// Endereço do display LCD 16x2 I2C
#define LCD_ADDRESS 0x27

// Número de colunas e linhas do display LCD
#define LCD_COLUMNS 16
#define LCD_ROWS 2

// Inicializa o objeto do display LCD
LCDI2C_Latin_Symbols lcd(LCD_ADDRESS, LCD_COLUMNS, LCD_ROWS);

static bool bomba1Ligada = false;
static bool bomba2Ligada = false;
int qtdbomba1=0;
int qtdbomba2=0;
int qtdcooler=0;
int ultimaHoraVerificada = -1;

// **************** WIFI ******************* //

const char* ssid = "Andreizs";
const char* password = "engenharia";
const char* serverName = "http://172.20.10.4:3000/gravarDados";

void conectarWiFi(const char* ssid, const char* password)
{
  Serial.print("Conectando a rede ");
  Serial.println(ssid);

  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED)
  {
    delay(500);
    Serial.print(".");
  }

  Serial.println(" ");
  Serial.println("WiFi Conectado");
  Serial.println(WiFi.localIP());
}

// ******************* FIM WIFI ********************* //


// ********************* Sensor Umidade Solo ******************** //

const int sensorPin1 = 36; // Pino analógico do sensor
const int sensorPin2 = 39; // Pino analógico do sensor

const int seco1 = 2900;   // valor lido quando o solo está bem seco
const int molhado1 = 1350; // valor lido quando o solo está bem úmido
const int seco2 = 3000;   // valor lido quando o solo está bem seco
const int molhado2 = 1600; // valor lido quando o solo está bem úmido

// ************************ Fim Sensor Umidade Solo ********************** //


// **************** RTC ******************** //

// ---- CONFIG RTC DS1302 ----
#define PIN_IO   16
#define PIN_SCLK 25
#define PIN_RST  17

ThreeWire myWire(PIN_IO, PIN_SCLK, PIN_RST);
RtcDS1302<ThreeWire> Rtc(myWire);

void sincronizarComNTP() 
{
  conectarWiFi(ssid, password); // Chama a função para se conectar ao WiFi

  // Configurar NTP
  configTime(-3 * 3600, 0, "pool.ntp.org");  // -3h fuso de Brasília

  // Esperar sincronização
  struct tm timeinfo;

  while (!getLocalTime(&timeinfo)) 
    {
      Serial.println("Esperando NTP...");
      delay(1000);
    }

  // Atualizar RTC
  RtcDateTime ntpTime(
    timeinfo.tm_year + 1900,
    timeinfo.tm_mon + 1,
    timeinfo.tm_mday,
    timeinfo.tm_hour,
    timeinfo.tm_min,
    timeinfo.tm_sec
  );

  Rtc.SetDateTime(ntpTime);
  Serial.println("RTC atualizado com data/hora da internet");
  WiFi.disconnect(true);
  WiFi.mode(WIFI_OFF);
}

// ************** Fim RTC ******************** //


// *********************** Sensor Umidade e Temperatura ********************* //

#define DHTPIN 27
#define DHTTYPE DHT11  // Tipo do sensor

DHT dht(DHTPIN, DHTTYPE); // Criando o objeto DHT

// ************************* Fim Sensor Umidade e Temperatura ******************* //


// ****************** Envio de Dados para o Firebase ******************* //


void enviarDados(float umi, float temp, int qtdcooler, int qtdbomba1, int qtdbomba2, int porcentagem1, int porcentagem2) 
{
  conectarWiFi(ssid, password);

  if (WiFi.status() == WL_CONNECTED) 
  {
    HTTPClient http;
    http.begin(serverName);
    http.addHeader("Content-Type", "application/json");

    String jsonData = "{";
    jsonData += "\"umidade\":" + String(umi, 1) + ",";
    jsonData += "\"temperatura\":" + String(temp, 1) + ",";
    jsonData += "\"qtdcooler\":" + String(qtdcooler) + ",";
    jsonData += "\"qtdbomba1\":" + String(qtdbomba1) + ",";
    jsonData += "\"qtdbomba2\":" + String(qtdbomba2) + ",";
    jsonData += "\"solo1\":" + String(porcentagem1) + ",";
    jsonData += "\"solo2\":" + String(porcentagem2);
    jsonData += "}";

    int httpResponseCode = http.POST(jsonData);

    if (httpResponseCode > 0) 
    {
      String response = http.getString();
      Serial.println(httpResponseCode);
      Serial.println(response);
    } 
    else 
    {
      Serial.print("Erro ao enviar POST: ");
      Serial.println(httpResponseCode);
    }

    http.end();
  } 
  else 
  {
    Serial.println("Erro na conexão WiFi");
  }

  WiFi.disconnect(true);
  WiFi.mode(WIFI_OFF);
}


// ****************** Fim do Envio de Dados para o Firebase ******************* //



void setup() 
{
  Serial.begin(115200);
  dht.begin();  // Inicializa o sensor Umidade e Temperatura
  pinMode(GAS, INPUT);  // Define o pino do sensor de gás como entrada
  pinMode(LEDs, OUTPUT);

// ********************** Display LCD ********************** //

  lcd.init();  // Inicializa o display LCD
  lcd.backlight(); // Liga a luz de fundo do display
  lcd.clear(); // Limpa o display
  delay(100);

// ************************* Fim Display LCD ************************ //


// ********************** RTC ************************ //

  Rtc.Begin(); // Inicia o RTC
 
  // Tirar proteção contra escrita e iniciar RTC
  if (Rtc.GetIsWriteProtected()) 
    {
      Rtc.SetIsWriteProtected(false);
    }

  if (!Rtc.GetIsRunning()) 
    {
      Rtc.SetIsRunning(true);
    }

   sincronizarComNTP();

  // acertar a hora manualmente
  //Rtc.SetDateTime(RtcDateTime(2025, 4, 25, 20, 13, 0));  // AAAA, MM, DD, HH, MM, SS

// ****************** Fim RTC ********************** //


// ******************* Reles **************************** //

  // Inicializa os pinos dos relés como saída
  pinMode(BOMBA1, OUTPUT);
  pinMode(BOMBA2, OUTPUT);
  pinMode(COOLERS, OUTPUT);
  
  // Inicializa os relés desligados
  digitalWrite(BOMBA1, HIGH);
  digitalWrite(BOMBA2, HIGH);
  digitalWrite(COOLERS, HIGH);

// *************************** Fim Reles ************************** //


}

void loop() 
{
  
  int valorLDR = analogRead(pinoLDR); // Lê a luminosidade
  int luminosidade = map(valorLDR, 0, 4095, 100, 0); // Converte para porcentagem

  unsigned long tempoAtual = millis();
  RtcDateTime now = Rtc.GetDateTime();
 
// *********************  Hora  ***************** //

    char dateStr[25];
    snprintf(dateStr, sizeof(dateStr),
             "%02u/%02u/%04u %02u:%02u:%02u",
             now.Day(), now.Month(), now.Year(),
             now.Hour(), now.Minute(), now.Second());

    Serial.println(dateStr);
    
  // ********************* Fim Hora ***************** //


// ***************** Sensores de gás, temperatura e umidade do ar e luz ************** //

    // Leitura do sensor gás
    int leitura_gas = analogRead(GAS);
    Serial.print("Valor Bruto do Sensor de Gás: ");
    Serial.println(leitura_gas);

    // Leitura do sensor DHT
    float umi = dht.readHumidity();
    float temp = dht.readTemperature();

    if (isnan(temp) || isnan(umi)) 
    {
      Serial.println("Erro ao ler dados do DHT!");
    } 
    else 
    {
      Serial.print("Umidade: ");
      Serial.print(umi);
      Serial.print("%  Temperatura: ");
      Serial.print(temp);
      Serial.println(" °C");
    }

// ********************* Condições Relés ***************** //

    bool condicaoGas = leitura_gas > 200;
    bool condicaoTempUmidade = temp > 35 || umi > 80;
    bool condicaoDesligar = temp < 35 && umi < 80 && leitura_gas <= 200;

    if (condicaoGas || condicaoTempUmidade) 
    {
      digitalWrite(COOLERS, LOW);
      Serial.println(" -> Coolers LIGADOS");
      qtdcooler++;
    } 
    else if (condicaoDesligar) 
    {
      digitalWrite(COOLERS, HIGH);
      Serial.println(" -> Coolers DESLIGADOS");
    }

// ****************** Fim condições Relés ************** //

   Serial.print("Umidade: ");
  Serial.print(umi);
  Serial.print("%  Temperatura: ");
  Serial.print(temp);
  Serial.println("°C");

  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print("U:");
  lcd.print(umi, 1);   // 1 casa decimal
  lcd.print("% ");

  lcd.print("T:");
  lcd.print(temp, 1);  // 1 casa decimal
  lcd.print("C");

  Serial.print("Luz ambiente: ");
  Serial.print(luminosidade);
  Serial.println("%");

// ***************** Fim Sensores de gás, temperatura e umidade do ar ************** //


// *********************** Sensor umidade do solo ******************** //

    int leitura1 = analogRead(sensorPin1);
    int leitura2 = analogRead(sensorPin2);

    int porcentagem1 = map(leitura1, seco1, molhado1, 0, 100);
    int porcentagem2 = map(leitura2, seco2, molhado2, 0, 100);
    porcentagem1 = constrain(porcentagem1, 0, 100);
    porcentagem2 = constrain(porcentagem2, 0, 100);
    
  if (!bomba1Ligada && porcentagem1 < 30) 
  {
    digitalWrite(BOMBA1, LOW);
    delay(100);
    bomba1Ligada = true;
    Serial.println("BOMBA1 LIGADA");
    qtdbomba1++;
  } 
  else if (bomba1Ligada && porcentagem1 > 35) 
  {
    digitalWrite(BOMBA1, HIGH);
    bomba1Ligada = false;
    Serial.println("BOMBA1 DESLIGADA");
  }

    if (!bomba2Ligada && porcentagem2 < 60) 
  {
    digitalWrite(BOMBA2, LOW);
    delay(100);
    bomba2Ligada = true;
    Serial.println("BOMBA2 LIGADA");
    qtdbomba2++;
  } 
  else if (bomba2Ligada && porcentagem2 > 75) 
  {
    digitalWrite(BOMBA2, HIGH);
    bomba2Ligada = false;
    Serial.println("BOMBA2 DESLIGADA");
  }

    Serial.print("Solo Sensor 1: ");
    Serial.print(porcentagem1);
    Serial.print("% | Solo Sensor 2: ");
    Serial.print(porcentagem2);
    Serial.println("%");

// *********************** Fim Sensor umidade do solo ******************** //


// ******************** Sensor de Luz ********************************* //

  if (luminosidade < 20)
  {
    digitalWrite(LEDs, HIGH);
  }

  else
  {
    digitalWrite(LEDs, LOW);
  }

// ****************** Fim Sensor de Luz *************************** //
int hora = now.Hour();

// Reset diário às 5h
if (hora == 0 && ultimaHoraVerificada != hora) 
  {
    qtdcooler = 0;
    qtdbomba1 = 0;
    qtdbomba2 = false;
    Serial.println("Reset diário às 00:00");
  }

  delay(3000);

enviarDados(umi, temp, qtdcooler, qtdbomba1, qtdbomba2, porcentagem1, porcentagem2);

// Light Sleep: reduz consumo de energia enquanto espera
esp_sleep_enable_timer_wakeup(1000000); // 1 segundo (1.000.000 microssegundos)
esp_light_sleep_start();

}