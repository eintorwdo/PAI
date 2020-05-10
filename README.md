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
