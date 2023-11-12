Napisz aplikację korzystając z frameworka React (w wersji nie mniejszej niż 16.8)
Aplikacja powinna być napisana z wykorzystaniem TypeScripta oraz Material UI.
1. Aplikacja powinna zaczynać od przywitania użytkownika wraz z prostym dropdownem/selectem, który umożliwia wybór roku, w którym została przyznana nagroda (zakres 1901-1905). Zakres powinien być dynamicznie generowany na podstawie danych.
2. Poniżej dropdowna powinien znajdować się przycisk „wyszukaj nagrody”. Przycisk powinien być zablokowany, dopóki użytkownik nie wskaże roku (np. poprzez jego wyszarzenie). Po wybraniu roku i kliknięciu przycisku, należy przekierować użytkownika do kolejnej podstrony naszej aplikacji - /nagrody/rok – proszę pamiętać, że także wpisanie tego linka „z palca” w pasku wyszukiwania przeglądarki, powinno dać taki sam rezultat. (Przy pomocy Routing )
3. Powyższe powinno pokazać tabelę, w której będą znajdywały się następujące dane:
• Rok przyznania
• Kategoria (proszę użyć wersji w języku angielskim)
• Data przyznania nagrody (W formacie DD.MM.RRRR)
• Kwota nagrody - sformatowana, tak aby grupy 3 cyfr były rozdzielane spacją, np. 900 to
900, 1200 to 1 200, 148500 to 148 500, a 1250000, to 1 250 000
4. W wykorzystywanym api kategoria dostępna jest w 3 językach. Na stronie głównej oprócz
dropdowna, należy w dowolny sposób zrealizować wybór języka angielskiego, norweskiego lub
szwedzkiego (en/no/se), np. poprzez kliknięcie flagi. Następnie należy rozszerzyć endpoint
/nagrody/rok na /nagrody/język/rok np. /nagrody/se/1901 – wtedy w tabeli zamiast nazwy
kategorii w języku angielskim, powinna pokazywać się w szwedzkim
5. Dodaj możliwość różnorakiego sortowania tabeli, ew. filtracji