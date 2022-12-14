# goit-js-hw-10

Создан репозиторий `goit-js-hw-10`.

При посещении живой страницы задания в консоли нет ошибок и предупреждений.

Проект собран с помощью parcel-project-template. Код отформатирован Prettier.

## Задание - поиск стран

Создана фронтенд часть приложения поиска данных о стране по её частичному или полному имени. 

## HTTP-запросы

Использован публичный API Rest Countries, а именно ресурс name, возвращающий массив объектов стран удовлетворивших критерий поиска.
Написана функция fetchCountries(name), которая делает HTTP-запрос на ресурс name и возвращает промис с массивом стран - результатом запроса. Она вынесена в отдельный файл fetchCountries.js и сделан именованный экспорт.

## Фильтрация полей

В ответе от бэкенда возвращаются объекты, большая часть свойств которых нам не пригодится. Чтобы сократить объем передаваемых данных, добавим строку параметров запроса - так этот бэкенд реализует фильтрацию полей. 

Нам нужны только следующие свойства:

name.official - полное имя страны
capital - столица
population - население
flags.svg - ссылка на изображение флага
languages - массив языков

## Поле поиска

Название страны для поиска пользователь вводит в текстовое поле input#search-box. HTTP-запросы выполняются при наборе имени страны, то есть по событию input. Но, делать запрос при каждом нажатии клавиши нельзя, так как одновременно получится много запросов и они будут выполняться в непредсказуемом порядке.
Применен приём Debounce на обработчике события и делается HTTP-запрос спустя 300мс после того, как пользователь перестал вводить текст. Использован пакет lodash.debounce.
Если пользователь полностью очищает поле поиска, то HTTP-запрос не выполняется, а разметка списка стран или информации о стране пропадает.
Выполнена санитизацию введенной строки методом `trim()`. Это решает проблему, когда в поле ввода только пробелы или они есть в начале и в конце строки.

## Интерфейс

Если в ответе бэкенд вернул больше чем 10 стран, в интерфейсе пояляется уведомление о том, что имя должно быть более специфичным. Для уведомлений используем библиотеку notiflix и выводи такую строку "Too many matches found. Please enter a more specific name.".
![image](https://user-images.githubusercontent.com/106475100/201645894-1a1c7c63-aec8-43dc-84ae-51ec1728c2d6.png)

Если бэкенд вернул от 2-х до 10-х стран, под текстовым полем отображается список найденных стран. Каждый элемент списка состоит из флага и имени страны.
![image](https://user-images.githubusercontent.com/106475100/201646001-dbc214f1-4a64-4f27-878f-378903081312.png)

Если результат запроса - это массив с одной страной, в интерфейсе отображается разметка карточки с данными о стране: флаг, название, столица, население и языки.
![image](https://user-images.githubusercontent.com/106475100/201646065-87244f5a-1cf7-42f5-bffc-47650a5eabd0.png)

![image](https://user-images.githubusercontent.com/106475100/201645894-1a1c7c63-aec8-43dc-84ae-51ec1728c2d6.png)

## Обработка ошибки

Если пользователь ввёл имя страны, которой не существует, бэкенд вернёт не пустой массив, а ошибку со статус кодом 404 - не найдено. Если это не обработать, то пользователь никогда не узнает о том, что поиск не дал результатов. Добавлено уведомление "Oops, there is no country with that name" в случае ошибки, используя библиотеку notiflix.
![image](https://user-images.githubusercontent.com/106475100/201646253-fb1d8fa3-755a-4bb6-855e-1bbafa8eb6cf.png)
Не забываем о том, что fetch не считает 404 ошибкой, поэтому необходимо явно отклонить промис чтобы можно было словить и обработать ошибку.
