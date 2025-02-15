# PAI

Repozytorium zawiera projekt zespołowy na przedmiot "Projektowanie Aplikacji Internetowych".

## Cele projektu

Aplikacja udostępni administratorowi system obsługi parkingu, lub strefy płatnego parkowania, umożliwiający m.in. pobieranie opłat za postój i kontrolowanie ilości wolnych miejsc parkingowych.
Po stronie klienta system umożliwi dodanie posiadanych samochodów do systemu, opłacenie postoju w formie subskrypcji, rezerwację konkretnego miejsca, czy też sprawdzenie ilości wolnych miejsc na różnych parkingach.
Klient po zalogowaniu będzie posiadał graficzny wykaz aktywnych subskrypcji i pozostały czas do końca ich aktywności.

## Wymagania systemowe i funkcjonalne

Aplikacja będzie się składać z RESTowego API napisanego w Node.js i frameworku Express. Do autoryzacji wykorzystana będzie biblioteka passport.js.
Frontowa część aplikacji będzie oparta na frameworku React.js
Wykorzystana zostania baza MongoDB hostowana w chmurze Atlas. Konieczne będzie stworzenie modeli użytkowników, samochodów, oraz parkingów.
Aplikacja do uruchomienia będzie wymagała systemu z zainstalowanym środowiskiem Node.js i npm.

## Harmonogram prac

### Etapy:
- Konfiguracja serwera
	- Utworzenie serwera http w środowisku node.js  
	- Czas: 1 dzień
	- Kamień milowy: Działający lokalnie serwer
- Podłączenie bazy danych oraz stworzenie podstawowych encji
  - Konfiguracja bazy Mongodb w serwisie Atlas
  - Utworzenie podstawowych encji w bazie danych
  - Konfiguracja oraz podłączenie bazy danych do naszego serwera
  - Czas: 2 dzień
  - Kamień milowy: Utworzone połączenie z bazą danych na serwerze atlas i naszym serwerem
- Utworzenie pierwszych widoków aplikacji
  - Utworzenie podstawowych widoków, takich jak ekran główny, ekran logowania oraz rejestracji
  - Kamień milowy: Możliwie przeklikanie pierwszych podstron aplikacji
  - Czas: 3 dni
- Implementacja podstawowych endpointów
  - Implementacja funkcji odpowiedzialnych za logowanie, rejestracja, zarezerwowanie miejsca na parkingu, dodanie samochodu oraz opłacenie postoju na parkingu
  - Czas: 4 dni
  - Kamień milowy: Możliwe dodanie nowego użytkownika do systemu za pomoc komendy curl
- Zaimplementowanie autoryzacji użytkownika
  - Dodanie autoryzacji użytkownika, tylko zalogowany użytkownik może dodać samochód, lub opłacić postój na parkingu
  - Czas: 3 dni
  - Kamień milowy: Tylko zalogowany użytkownik może dodać samochód do bazy, oraz zapłacić za miejsce parkingowe
- Implementacja widoków dla poszczególnych endpointów
  - Dodawanie widoków dla poszczególnych endpointów, takich jak dodanie samochodu oraz opłacenie miejsca postojowego
  - Czas: 7 dni
  - Kamień milowy: Możliwy happy path, rejestracja użytkownika dodanie samochodu oraz rezerwacja miejsca parkingowego
- Testowanie aplikacji 
	- Przetestowanie aplikacji  pod względem działania oraz user experience
  - Czas 3dni
  - Kamień milowy: W pełni działająca aplikacja
  
#### Wykres Gantta
![Czas rozpoczęcia i Czas trwania ](https://user-images.githubusercontent.com/48072394/83982686-da088980-a928-11ea-8f96-a7c7b8d5d832.png)

## Schemat modeli bazodanowych i metod interakcji między obiektami
![Untitled Diagram-Page-1](https://user-images.githubusercontent.com/48072394/83982880-5cde1400-a92a-11ea-93bb-5393b458a868.png)
