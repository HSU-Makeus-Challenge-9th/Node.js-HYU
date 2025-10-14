# Controller → Service → Repository → DB 요청 흐름 정리

## 1. 회원가입 API 흐름 (POST /api/v1/users/signup)

### 1단계: Controller (user-signup.controller.js)

- **역할**: HTTP 요청을 받고 응답을 처리
- **처리 내용**:
  - 요청 데이터 검증 (필수 필드, 이메일 형식, 비밀번호 길이)
  - DTO를 통해 데이터 변환
  - Service 호출
  - 응답 생성 및 에러 처리

### 2단계: Service (user-signup.service.js)

- **역할**: 비즈니스 로직 처리
- **처리 내용**:
  - Repository를 통해 사용자 추가
  - Repository를 통해 사용자 정보 조회
  - DTO를 통해 응답 데이터 변환

### 3단계: Repository (user-signup.repository.js)

- **역할**: 데이터베이스와의 직접적인 상호작용
- **처리 내용**:
  - 이메일 중복 확인
  - 비밀번호 해싱 (bcrypt)
  - 사용자 데이터 INSERT
  - 약관 동의 데이터 INSERT
  - 선호 카테고리 데이터 INSERT
  - 사용자 정보 조회

### 4단계: Database (MySQL)

- **처리 내용**:
  - users 테이블에 사용자 정보 저장
  - agreements 테이블에 약관 동의 정보 저장
  - users_prefer 테이블에 선호 카테고리 저장

---

## 2. 가게 추가 API 흐름 (POST /api/v1/stores)

### 1단계: Controller (store.controller.js)

- 요청 데이터 검증
- DTO를 통해 데이터 변환
- Service 호출
- 응답 생성

### 2단계: Service (store.service.js)

- Repository를 통해 가게 추가
- Repository를 통해 가게 정보 조회
- DTO를 통해 응답 데이터 변환

### 3단계: Repository (store.repository.js)

- 가게 데이터 INSERT
- 가게 정보 조회

### 4단계: Database (MySQL)

- stores 테이블에 가게 정보 저장

---

## 3. 미션 도전 API 흐름 (POST /api/v1/missions/:missionId/challenge)

### 1단계: Controller (mission.controller.js)

- 요청 데이터 검증
- DTO를 통해 데이터 변환
- Service 호출
- 응답 생성

### 2단계: Service (mission.service.js)

- Repository를 통해 미션 도전 처리
- 응답 데이터 생성

### 3단계: Repository (mission.repository.js)

- 이미 도전 중인 미션 확인
- 미션 정보 조회
- 사용자 미션 데이터 INSERT

### 4단계: Database (MySQL)

- user_missions 테이블에 미션 도전 정보 저장

---

## 4. 리뷰 작성 API 흐름 (POST /api/v1/reviews/json)

### 1단계: Controller (review-json.controller.js)

- 요청 데이터 검증 (필수 필드, 권한)
- DTO를 통해 데이터 변환
- Service 호출
- 응답 생성

### 2단계: Service (review-json.service.js)

- Repository를 통해 리뷰 추가
- DTO를 통해 응답 데이터 변환

### 3단계: Repository (review-json.repository.js)

- 완료된 미션 확인
- 사용자 권한 검증
- 중복 리뷰 확인
- 리뷰 데이터 INSERT

### 4단계: Database (MySQL)

- reviews 테이블에 리뷰 정보 저장

---

## 5. 미션 성공 요청 API 흐름 (POST /api/v1/missions/success/request)

### 1단계: Controller (mission-success.controller.js)

- 요청 데이터 검증
- DTO를 통해 데이터 변환
- Service 호출
- 응답 생성

### 2단계: Service (mission-success.service.js)

- Repository를 통해 미션 성공 처리
- DTO를 통해 응답 데이터 변환

### 3단계: Repository (mission-success.repository.js)

- 미션 정보 조회
- 사용자 권한 검증
- 미션 상태 확인
- 인증 코드 생성
- 미션 상태 업데이트
- 사용자 포인트 업데이트

### 4단계: Database (MySQL)

- user_missions 테이블 상태 업데이트
- users 테이블 포인트 업데이트

---

## 📋 전체 아키텍처 요약

```
HTTP Request
    ↓
Controller (요청 검증, 응답 생성)
    ↓
Service (비즈니스 로직)
    ↓
Repository (데이터베이스 상호작용)
    ↓
Database (MySQL)
    ↓
Repository (결과 반환)
    ↓
Service (비즈니스 로직 처리)
    ↓
Controller (응답 생성)
    ↓
HTTP Response
```

## 🔧 각 계층의 역할

- **Controller**: HTTP 요청/응답 처리, 데이터 검증, 에러 처리
- **Service**: 비즈니스 로직, Repository 조합, 데이터 변환
- **Repository**: 데이터베이스 쿼리, 데이터 매핑
- **Database**: 데이터 저장 및 조회
