# Controller -> Service -> Repository -> DB 요청 흐름 정리

## 1-2. 가게에 리뷰 추가하기 API

### 1단계: Controller (review.controller.js)

- DTO를 통해 데이터를 알맞은 형식에 맞춰 변환합니다.
- DTO를 통해 변환된 데이터를 Service에 넘겨서 Service를 호출합니다.
- 응답을 생성합니다.

### 2단계 : Service  (review.services.js)

- Repository에 리뷰 추가를 요청합니다.
- DTO로 결과 데이터를 형식을 변환하여 값을 리턴합니다.

### 3단계 : Repository (review.repositories.js)
- 가게 정보를 조회하여, 실제로 존재하는지 확인합니다. 
- 리뷰 데이터를 삽입합니다.

### 4단계 : Database
- review 테이블에 리뷰 정보를 저장합니다.




## 1-3. 가게에 미션 추가하기 API
### 1단계: Controller (mission.controller.js)

- DTO를 통해 데이터를 알맞은 형식에 맞춰 변환합니다.
- DTO를 통해 변환된 데이터를 Service에 넘겨서 Service를 호출합니다.
- 응답을 생성합니다.

### 2단계 : Service (mission.services.js) - missionAdd

- Repository에 미션 추가를 요청합니다.
- 추가가 완료되면 완료된 데이터를 요청하여 받아옵니다.
- 받아온 데이터는 DTO를 통해 변환되어 리턴됩니다.

### 3단계 : Repository (mission.repositories)
- 가게 정보를 조회하여, 실제로 존재하는지 확인합니다. 
- 미션 데이터를 삽입합니다.
- 미션을 조회합니다.

### 4단계 : Database
- mission 테이블에 리뷰 정보를 저장합니다.




## 1-4. 가게의 미션을 도전 중인 미션에 추가(미션 도전하기)API

### 1단계: Controller (mission.controller.js)

- DTO를 통해 데이터를 알맞은 형식에 맞춰 변환합니다.
- DTO를 통해 변환된 데이터를 Service에 넘겨서 Service를 호출합니다.
- 응답을 생성합니다.

### 2단계 : Service (mission.services.js) - missionChallenge

- Repository에 미션 도전을 요청합니다.
- 미션 도전이 완료되면 완료된 도전을 받아옵니다.
- 받아온 도전을 DTO를 통해 포맷팅후 리턴합니다.

### 3단계 : Repository (mission.repositories)
- 도전하려는 미션이 존재하는 미션인지 확인합니다.
- 해당 시점으로부터 7일 후(임의로 7일로 결정)를 계산하여 만료일을 계산합니다.
- user_mission 테이블에 값을 추가합니다

### 4단계 : Database
- user_mission 테이블에 리뷰 정보를 저장합니다.