# Менеджер для работы парсера преподовательского состава

- Парсинг преподов с сайта
- Связь с базой данных
- Методы для оценки, комментариев

##### Установка
`npm i manager-teachers`

##### Пакеты
Sequielize для базы данных, Jest для тестирования

##### Требования
Переменные окружения: .
- DB_DATABASE
- DB_USER
- DB_PASSWORD

##### Функции
- updateTeachers
- getTeachers
- getAverageScore
- getComments
- createComment
- deleteComment
