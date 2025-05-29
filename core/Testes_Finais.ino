#include <WiFi.h>
#include <HTTPClient.h>
#include <time.h>
#include <ThreeWire.h>
#include <RtcDS1302.h>
#include <Adafruit_Sensor.h>
#include <DHT.h>
#include <DHT_U.h>
#include <Arduino.h>
#include <LiquidCrystal_I2C.h>
#include <Wire.h>

const int pinoLDR = 34; // Pino analógico Sensor de Luz
#define GAS 35  // Pino analógico Sensor de Gás
#define LEDs 13 // Pino digital dos LEDs

// variáveis para controle dos tempos
unsigned long ultimaLeituraHora = 0;
unsigned long ultimaLeituraGasAr = 0;
unsigned long ultimaLeituraSolo = 0;

// Intervalos em milissegundos
const unsigned long intervaloHora = 10000;    
const unsigned long intervaloGasAr = 5000;      
const unsigned long intervaloSolo = 4000;      
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
LiquidCrystal_I2C lcd(LCD_ADDRESS, LCD_COLUMNS, LCD_ROWS);

static bool bomba1Ligada = false;
static bool bomba2Ligada = false;

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


// **************** Condições do LED **************** //

unsigned long tempoInicioLED = 0;   // Marca o momento em que os LEDs foram ligados
unsigned long tempoTotalLEDms = 0;  // Total de tempo com LEDs ligados (em ms)
int minutosDeLuzNatural = 0;
bool ledsLigados = false;
int ultimaHoraVerificada = -1;

// **************** Fim condições do LED *************** //


// ****************** Envio de Dados para o Firebase ******************* //

/* 

  conectarWiFi(ssid, password); // Chama a função para se conectar ao WiFi
  void enviarDados(float temperatura, float valor_pH, int waterLevel) 
    {
      if (WiFi.status() == WL_CONNECTED) 
        {
          HTTPClient http;
          const char* serverName = "http://172.20.10.4:3000/api/postData"; // URL do servidor
          http.begin(serverName);
          http.addHeader("Content-Type", "application/json");
          String completo = (waterLevel == LOW) ? "true" : "false"; // Define o valor de "completo" com base no nível de água
          String jsonData = "{\"nome\":\"Tanque15\",\"completo\":" + completo + ",\"funcionando\":true,\"temperatura\":" + String(temperatura) + 
            ",\"ph\":" + String(valor_pH) + ",\"nivelAgua\":" + String(waterLevel == LOW ? 100 : 0) + "}"; // Convertendo os dados para JSON

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
    }

  WiFi.disconnect(true);
  WiFi.mode(WIFI_OFF);
*/

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
 
// ********************* 1 - Imprimir hora a cada 2 minutos ***************** //

  if (tempoAtual - ultimaLeituraHora >= intervaloHora) 
  {
    ultimaLeituraHora = tempoAtual;

    char dateStr[25];
    snprintf(dateStr, sizeof(dateStr),
             "%02u/%02u/%04u %02u:%02u:%02u",
             now.Day(), now.Month(), now.Year(),
             now.Hour(), now.Minute(), now.Second());

    Serial.println(dateStr);
    
  }

  // ********************* Fim - 1 - Imprimir hora a cada 2 minutos ***************** //


// ***************** 2 - Sensores de gás, temperatura e umidade do ar e luz a cada 1 minuto ************** //

  if (tempoAtual - ultimaLeituraGasAr >= intervaloGasAr) 
  {
    ultimaLeituraGasAr = tempoAtual;

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

    bool condicaoGas = leitura_gas > 100;
    bool condicaoTempUmidade = temp > 35 || umi > 80;
    bool condicaoDesligar = temp < 35 && umi < 80 && leitura_gas <= 100;

    if (condicaoGas || condicaoTempUmidade) 
    {
      digitalWrite(COOLERS, LOW);
      Serial.println(" -> Coolers LIGADOS");
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
    }


// ***************** Fim - 2 - Sensores de gás, temperatura e umidade do ar a cada 1 minuto ************** //


// *********************** 3 - Sensor umidade do solo a cada 5 minutos ******************** //

  if (tempoAtual - ultimaLeituraSolo >= intervaloSolo) 
  {
    ultimaLeituraSolo = tempoAtual;

    int leitura1 = analogRead(sensorPin1);
    int leitura2 = analogRead(sensorPin2);

    int porcentagem1 = map(leitura1, seco1, molhado1, 0, 100);
    int porcentagem2 = map(leitura2, seco2, molhado2, 0, 100);
    porcentagem1 = constrain(porcentagem1, 0, 100);
    porcentagem2 = constrain(porcentagem2, 0, 100);

   // digitalWrite(BOMBA1, LOW);
    digitalWrite(BOMBA2, LOW);
    //millis(100);

 /* if (!bomba1Ligada && porcentagem1 < 30) 
  {
    digitalWrite(BOMBA1, LOW);
    bomba1Ligada = true;
    Serial.println("BOMBA1 LIGADA");
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
    bomba2Ligada = true;
    Serial.println("BOMBA2 LIGADA");
  } 
  else if (bomba2Ligada && porcentagem2 > 75) 
  {
    digitalWrite(BOMBA2, HIGH);
    bomba2Ligada = false;
    Serial.println("BOMBA2 DESLIGADA");
  } */

    Serial.print("Solo Sensor 1: ");
    Serial.print(porcentagem1);
    Serial.print("% | Solo Sensor 2: ");
    Serial.print(porcentagem2);
    Serial.println("%");
  }


// *********************** Fim - 3 - Sensor umidade do solo a cada 5 minutos ******************** //


// ******************** Sensor de Luz ********************************* //

int hora = now.Hour();
int minuto = now.Minute();
static unsigned long ultimaContagemLuzNatural = 0;

// Reset diário às 5h
if (hora == 5 && ultimaHoraVerificada != hora) 
  {
    minutosDeLuzNatural = 0;
    tempoTotalLEDms = 0;
    ledsLigados = false;
    tempoInicioLED = 0;
    Serial.println("Reset diário às 05:00");
  }

if (millis() - ultimaContagemLuzNatural >= 60000) { // a cada 60s
  ultimaContagemLuzNatural = millis();

  if (luminosidade >= 20) {
    minutosDeLuzNatural++;
    Serial.print("Luz natural detectada. Minutos acumulados: ");
    Serial.println(minutosDeLuzNatural);
  }
}

// Após 18h, verificar se é necessário completar luz com LEDs
unsigned long tempoLEDAtual = ledsLigados ? millis() - tempoInicioLED : 0;
int minutosTotais = minutosDeLuzNatural + ((tempoTotalLEDms + tempoLEDAtual) / 60000);

if (hora >= 18 && minutosTotais < 360) 
  {

    if (!ledsLigados) 
      {
        digitalWrite(LEDs, HIGH);
        ledsLigados = true;
        tempoInicioLED = millis();
        Serial.println("LEDs ligados para completar luz.");
      }

} 

  else 
    {
      // Se completou 6h totais ou não precisa mais, desligar LEDs
      if (ledsLigados) 
        {
          digitalWrite(LEDs, LOW);
          ledsLigados = false;
          tempoTotalLEDms += millis() - tempoInicioLED;
          Serial.println("LEDs desligados. Luz diária completa ou encerrada.");
        }

    }

  // Segurança extra: desliga se por algum motivo ultrapassar o tempo
  if ((minutosDeLuzNatural + (tempoTotalLEDms / 60000)) >= 360 && ledsLigados)
    {
      digitalWrite(LEDs, LOW);
      ledsLigados = false;
      tempoTotalLEDms += millis() - tempoInicioLED;
      Serial.println("Desligando LEDs: 6h de luz alcançadas.");
    }

// ****************** Fim Sensor de Luz *************************** //

// Light Sleep: reduz consumo de energia enquanto espera
esp_sleep_enable_timer_wakeup(1000000); // 1 segundo (1.000.000 microssegundos)
esp_light_sleep_start();

}
