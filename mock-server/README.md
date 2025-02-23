# sample-mock-server

## local dev

```bash
$ # 初回のみ
$ yarn install

$ # サーバー起動
$ yarn dev
```

## run server

```bash
$ docker compose up -d
```

## crud

```bash
$ # create
$ curl -s X POST 'http://localhost:8080/api/user' -H 'Content-Type: application/json' -d '{ "createdAt": "2022-06-23T01:19:50", "updatedAt": "2022-06-23T01:19:50", "version": 1, "firstName": "saburo", "lastName": "yamada", "email": "aaaa@bbbb.com", "tel": "0000000000" }'

$ # read
$ curl -s -X GET 'http://localhost:8080/api/users'
$ curl -s -X POST 'http://localhost:8080/api/users/search'
$ curl -s -X GET 'http://localhost:8080/api/user/1'

$ # update
$ curl -s -X PUT 'http://localhost:8080/api/user/1'- H 'Content-Type: application/json' -d '{ "createdAt": "2022-06-23T01:19:50", "updatedAt": "2023-06-23T01:19:50", "version": 2, "id": 1, "firstName": "taro", "lastName": "yamada", "email": "test2@example.com", "tel": "09011112221" }'

$ # delete
$ curl -s -X DELETE 'http://localhost:8080/api/user/1'
```
