### Как запустить код локально: 

1. В репозитории teplo/src/utils/constants нужно поменять Base-url на локальный

2. Клонировать репозиторий фронта и бэка и запустить одну из команд ниже в репозитории бэкенда:
  
  Для загрузки в режиме dev: docker-compose -f docker-compose.yml up -d

  Для загрузки в режиме prod: docker-compose -f docker-compose.prod.yml up
