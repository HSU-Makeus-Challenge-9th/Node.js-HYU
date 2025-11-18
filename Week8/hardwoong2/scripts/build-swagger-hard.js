import swaggerAutogen from 'swagger-autogen';
import yaml from 'js-yaml';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const options = {
  openapi: '3.0.0',
  disableLogs: false, // 빌드 시에는 로그 출력
  writeOutputFile: false,
};

const outputFile = '/dev/null'; // 실제 파일 생성 안 함
const routes = ['../src/index.js']; // 라우트 파일
const doc = {
  info: {
    title: 'UMC 9th Node.js API',
    description: 'UMC 9th Node.js 프로젝트 API 문서입니다.',
    version: '1.0.0',
  },
  host: process.env.API_HOST || 'localhost:3000',
  schemes: process.env.API_SCHEME ? [process.env.API_SCHEME] : ['http'],
};

// 도메인별 태그 매핑
const domainTags = {
  '/api/v1/users/signup': 'Users',
  '/api/v1/users/:userId/reviews': 'Users',
  '/api/v1/users/:userId/missions/ongoing': 'Users',
  '/api/v1/stores': 'Stores',
  '/api/v1/stores/:storeId/missions': 'Stores',
  '/api/v1/missions': 'Missions',
  '/api/v1/missions/:missionId/challenge': 'Missions',
  '/api/v1/missions/success/request': 'Missions',
  '/api/v1/missions/success/confirm': 'Missions',
  '/api/v1/reviews': 'Reviews',
  '/api/v1/reviews/json': 'Reviews',
};

// 태그 정의
const tags = [
  {
    name: 'Users',
    description: '사용자 관련 API - 회원가입, 내 리뷰, 내 미션 조회 등',
  },
  {
    name: 'Stores',
    description: '가게 관련 API - 가게 추가, 가게 미션 조회 등',
  },
  {
    name: 'Missions',
    description: '미션 관련 API - 미션 추가, 도전, 성공 요청/확정 등',
  },
  {
    name: 'Reviews',
    description: '리뷰 관련 API - 리뷰 작성 (이미지 포함/텍스트만)',
  },
];

// 경로 패턴 매칭 함수
function getTagForPath(path) {
  // 정확한 매칭 먼저
  if (domainTags[path]) {
    return domainTags[path];
  }
  
  // 패턴 매칭 (예: /api/v1/users/:userId/reviews)
  for (const [pattern, tag] of Object.entries(domainTags)) {
    const regex = new RegExp('^' + pattern.replace(/:[^/]+/g, '[^/]+') + '$');
    if (regex.test(path)) {
      return tag;
    }
  }
  
  return null;
}

// DTO 기반 스키마 정의
function getSchemas() {
  return {
    // User DTOs
    UserSignupRequest: {
      type: 'object',
      required: ['name', 'gender', 'email', 'password'],
      properties: {
        name: { type: 'string', example: '홍길동' },
        gender: { type: 'string', enum: ['M', 'F', 'NONE'], example: 'M' },
        email: { type: 'string', format: 'email', example: 'test@example.com' },
        password: { type: 'string', minLength: 8, example: 'password123' },
        birth: { type: 'string', format: 'date', example: '1990-01-01', nullable: true },
        address: { type: 'string', example: '서울시 강남구', nullable: true },
        phone: { type: 'string', example: '010-1234-5678', nullable: true },
        preferences: { type: 'array', items: { type: 'number' }, example: [1, 3, 6] }
      }
    },
    UserSignupResponse: {
      type: 'object',
      properties: {
        userId: { type: 'number', example: 1 },
        name: { type: 'string', example: '홍길동' },
        email: { type: 'string', example: 'test@example.com' },
        userStatus: { type: 'string', example: 'ACTIVE' },
        userType: { type: 'string', example: 'GENERAL' },
        createdAt: { type: 'string', format: 'date-time' }
      }
    },
    
    // Store DTOs
    StoreAddRequest: {
      type: 'object',
      required: ['storeName', 'storeAddress', 'storeType'],
      properties: {
        storeName: { type: 'string', example: '맛있는 식당' },
        storeAddress: { type: 'string', example: '서울시 강남구 테헤란로 123' },
        storeType: {
          type: 'string',
          enum: ['KOREAN', 'CHINESE', 'JAPANESE', 'WESTERN', 'CHICKEN', 'SNACK', 'MEAT', 'DOSIRAK', 'YASICK', 'DESSERT', 'FAST_FOOD', 'ASIAN', 'ETC'],
          example: 'KOREAN'
        },
        region: { type: 'string', example: '서울', nullable: true }
      }
    },
    StoreResponse: {
      type: 'object',
      properties: {
        storeId: { type: 'number', example: 1 },
        storeName: { type: 'string', example: '맛있는 식당' },
        storeAddress: { type: 'string', example: '서울시 강남구 테헤란로 123' },
        storeType: { type: 'string', example: 'KOREAN' },
        storeScore: { type: 'number', nullable: true, example: null },
        createdAt: { type: 'string', format: 'date-time' }
      }
    },
    
    // Mission DTOs
    MissionAddRequest: {
      type: 'object',
      required: ['storeId', 'region', 'missionMoney', 'missionPoint'],
      properties: {
        storeId: { type: 'number', example: 1 },
        region: {
          type: 'string',
          enum: ['SEOUL', 'BUSAN', 'DAEGU', 'INCHEON', 'GWANGJU', 'DAEJEON', 'ULSAN', 'GYEONGGI', 'GANGWON', 'CHUNGBUK', 'CHUNGNAM', 'JEONBUK', 'JEONNAM', 'GYEONGBUK', 'GYEONGNAM', 'JEJU'],
          example: 'SEOUL'
        },
        missionMoney: { type: 'number', example: 10000 },
        missionPoint: { type: 'number', example: 100 }
      }
    },
    MissionResponse: {
      type: 'object',
      properties: {
        missionId: { type: 'number', example: 1 },
        storeId: { type: 'number', example: 1 },
        region: { type: 'string', example: 'SEOUL' },
        missionMoney: { type: 'number', example: 10000 },
        missionPoint: { type: 'number', example: 100 },
        createdAt: { type: 'string', format: 'date-time' }
      }
    },
    MissionChallengeRequest: {
      type: 'object',
      required: ['userId'],
      properties: {
        userId: { type: 'number', example: 1 }
      }
    },
    MissionSuccessRequest: {
      type: 'object',
      required: ['challengeMissionId', 'userId'],
      properties: {
        challengeMissionId: { type: 'number', example: 1 },
        userId: { type: 'number', example: 1 }
      }
    },
    MissionSuccessConfirmRequest: {
      type: 'object',
      required: ['verificationCode', 'userId'],
      properties: {
        verificationCode: { type: 'string', example: '123456' },
        userId: { type: 'number', example: 1 }
      }
    },
    MissionSuccessResponse: {
      type: 'object',
      properties: {
        verificationCode: { type: 'string', example: '123456' }
      }
    },
    MissionConfirmResponse: {
      type: 'object',
      properties: {
        challengeMissionId: { type: 'number', example: 1 },
        missionMoney: { type: 'number', example: 10000 },
        missionPoint: { type: 'number', example: 100 }
      }
    },
    MyOngoingMissionItem: {
      type: 'object',
      properties: {
        challengeMissionId: { type: 'number', example: 1 },
        missionId: { type: 'number', example: 1 },
        storeId: { type: 'number', example: 1 },
        storeName: { type: 'string', example: '맛있는 식당' },
        storeAddress: { type: 'string', example: '서울시 강남구' },
        region: { type: 'string', example: 'SEOUL' },
        missionMoney: { type: 'number', example: 10000 },
        missionPoint: { type: 'number', example: 100 },
        status: { type: 'string', example: 'IN_PROGRESS' },
        challengeAt: { type: 'string', format: 'date-time' },
        limitedAt: { type: 'string', format: 'date-time' },
        createdAt: { type: 'string', format: 'date-time' }
      }
    },
    StoreMissionItem: {
      type: 'object',
      properties: {
        missionId: { type: 'number', example: 1 },
        storeId: { type: 'number', example: 1 },
        storeName: { type: 'string', example: '맛있는 식당' },
        storeAddress: { type: 'string', example: '서울시 강남구' },
        region: { type: 'string', example: 'SEOUL' },
        missionMoney: { type: 'number', example: 10000 },
        missionPoint: { type: 'number', example: 100 },
        createdAt: { type: 'string', format: 'date-time' }
      }
    },
    Pagination: {
      type: 'object',
      properties: {
        cursor: { type: 'number', nullable: true, example: 10 }
      }
    },
    MyOngoingMissionsResponse: {
      type: 'object',
      properties: {
        missions: {
          type: 'array',
          items: { $ref: '#/components/schemas/MyOngoingMissionItem' }
        },
        pagination: { $ref: '#/components/schemas/Pagination' }
      }
    },
    StoreMissionsResponse: {
      type: 'object',
      properties: {
        missions: {
          type: 'array',
          items: { $ref: '#/components/schemas/StoreMissionItem' }
        },
        pagination: { $ref: '#/components/schemas/Pagination' }
      }
    },
    
    // Review DTOs
    ReviewAddRequest: {
      type: 'object',
      required: ['rating', 'content', 'challengeMissionId'],
      properties: {
        rating: { type: 'number', minimum: 1, maximum: 5, example: 5, description: '별점 (1-5)' },
        content: { type: 'string', example: '맛있어요!' },
        challengeMissionId: { type: 'number', example: 1 },
        images: {
          type: 'array',
          items: { type: 'string', format: 'binary' },
          description: '이미지 파일 (최대 5개)'
        }
      }
    },
    ReviewAddJsonRequest: {
      type: 'object',
      required: ['rating', 'content', 'challengeMissionId', 'userId'],
      properties: {
        rating: { type: 'number', minimum: 1, maximum: 5, example: 5, description: '별점 (1-5)' },
        content: { type: 'string', example: '맛있어요!' },
        challengeMissionId: { type: 'number', example: 1 },
        userId: { type: 'number', example: 1 }
      }
    },
    ReviewResponse: {
      type: 'object',
      properties: {
        reviewId: { type: 'number', example: 1 },
        storeName: { type: 'string', example: '맛있는 식당' }
      }
    },
    MyReviewItem: {
      type: 'object',
      properties: {
        reviewId: { type: 'number', example: 1 },
        storeName: { type: 'string', example: '맛있는 식당' },
        storeAddress: { type: 'string', example: '서울시 강남구' },
        reviewText: { type: 'string', example: '맛있어요!' },
        score: { type: 'number', example: 5 },
        images: { type: 'array', items: { type: 'string' }, example: ['image1.jpg'] },
        createdAt: { type: 'string', format: 'date-time' }
      }
    },
    MyReviewsResponse: {
      type: 'object',
      properties: {
        reviews: {
          type: 'array',
          items: { $ref: '#/components/schemas/MyReviewItem' }
        },
        pagination: { $ref: '#/components/schemas/Pagination' }
      }
    },
    
    // Common Response DTOs
    SuccessResponse: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 200 },
        message: { type: 'string', example: '요청이 성공적으로 처리되었습니다.' },
        data: { type: 'object' }
      }
    },
    ErrorResponse: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 400 },
        message: { type: 'string', example: '요청 처리 중 오류가 발생했습니다.' },
        error: { type: 'string', example: 'ERROR_CODE' },
        data: { type: 'object', nullable: true, example: null }
      }
    }
  };
}

// API 경로별 스키마 매핑
const apiSchemaMapping = {
  '/api/v1/users/signup': {
    request: 'UserSignupRequest',
    response: 'UserSignupResponse'
  },
  '/api/v1/stores': {
    request: 'StoreAddRequest',
    response: 'StoreResponse'
  },
  '/api/v1/missions': {
    request: 'MissionAddRequest',
    response: 'MissionResponse'
  },
  '/api/v1/missions/:missionId/challenge': {
    request: 'MissionChallengeRequest',
    response: 'MissionResponse'
  },
  '/api/v1/missions/success/request': {
    request: 'MissionSuccessRequest',
    response: 'MissionSuccessResponse'
  },
  '/api/v1/missions/success/confirm': {
    request: 'MissionSuccessConfirmRequest',
    response: 'MissionConfirmResponse'
  },
  '/api/v1/users/:userId/missions/ongoing': {
    response: 'MyOngoingMissionsResponse'
  },
  '/api/v1/stores/:storeId/missions': {
    response: 'StoreMissionsResponse'
  },
  '/api/v1/reviews': {
    request: 'ReviewAddRequest',
    response: 'ReviewResponse'
  },
  '/api/v1/reviews/json': {
    request: 'ReviewAddJsonRequest',
    response: 'ReviewResponse'
  },
  '/api/v1/users/:userId/reviews': {
    response: 'MyReviewsResponse'
  }
};

// Swagger 스펙에 태그 및 스키마 추가
function addTagsToSpec(spec) {
  // 태그 정의 추가
  spec.tags = tags;
  
  // Components 초기화
  if (!spec.components) {
    spec.components = {};
  }
  if (!spec.components.schemas) {
    spec.components.schemas = {};
  }
  
  // DTO 스키마 추가
  const schemas = getSchemas();
  spec.components.schemas = { ...spec.components.schemas, ...schemas };
  
  // 각 경로에 태그 및 스키마 참조 추가
  const paths = spec.paths || {};
  Object.keys(paths).forEach(path => {
    const tag = getTagForPath(path);
    const schemaMapping = apiSchemaMapping[path] || 
      Object.keys(apiSchemaMapping).find(key => {
        const regex = new RegExp('^' + key.replace(/:[^/]+/g, '[^/]+') + '$');
        return regex.test(path);
      }) ? apiSchemaMapping[Object.keys(apiSchemaMapping).find(key => {
        const regex = new RegExp('^' + key.replace(/:[^/]+/g, '[^/]+') + '$');
        return regex.test(path);
      })] : null;
    
    if (tag) {
      Object.entries(paths[path]).forEach(([method, operation]) => {
        if (operation && typeof operation === 'object') {
          // 태그 추가
          operation.tags = [tag];
          
          // Request Body 스키마 추가
          if (schemaMapping?.request) {
            if (!operation.requestBody) {
              operation.requestBody = {};
            }
            if (!operation.requestBody.content) {
              operation.requestBody.content = {};
            }
            const contentType = method === 'post' && path.includes('/reviews') && !path.includes('/json') 
              ? 'multipart/form-data' 
              : 'application/json';
            
            if (!operation.requestBody.content[contentType]) {
              operation.requestBody.content[contentType] = {};
            }
            operation.requestBody.content[contentType].schema = {
              $ref: `#/components/schemas/${schemaMapping.request}`
            };
            operation.requestBody.required = true;
          }
          
          // Response 스키마 추가
          if (schemaMapping?.response) {
            if (!operation.responses) {
              operation.responses = {};
            }
            const statusCode = method === 'post' ? '201' : '200';
            if (!operation.responses[statusCode]) {
              operation.responses[statusCode] = {
                description: '성공 응답',
                content: {
                  'application/json': {
                    schema: {
                      type: 'object',
                      properties: {
                        statusCode: { type: 'number', example: parseInt(statusCode) },
                        message: { type: 'string' },
                        data: { $ref: `#/components/schemas/${schemaMapping.response}` }
                      }
                    }
                  }
                }
              };
            }
          }
        }
      });
    }
  });
  
  return spec;
}

async function buildSwagger() {
  try {
    console.log('Swagger 문서 빌드 시작...\n');
    
    // Swagger JSON 생성
    const result = await swaggerAutogen(options)(outputFile, routes, doc);
    
    if (!result || !result.data) {
      throw new Error('Swagger 문서 생성 실패');
    }

    // 도메인별 태그 추가
    const specWithTags = addTagsToSpec(result.data);

    // JSON을 YAML로 변환
    const yamlContent = yaml.dump(specWithTags, {
      indent: 2,
      lineWidth: 120,
      noRefs: true,
    });

    // 파일 저장 (swagger 폴더에 저장)
    const swaggerDir = join(__dirname, '../swagger');
    if (!fs.existsSync(swaggerDir)) {
      fs.mkdirSync(swaggerDir, { recursive: true });
    }
    
    const outputPath = join(swaggerDir, 'openapi.yml');
    fs.writeFileSync(outputPath, yamlContent, 'utf8');
    console.log(`openapi.yml 파일 생성 완료`);
    console.log(`위치: ${outputPath}\n`);

    // JSON도 함께 저장
    const jsonPath = join(swaggerDir, 'openapi.json');
    fs.writeFileSync(jsonPath, JSON.stringify(specWithTags, null, 2), 'utf8');
    console.log(`openapi.json 파일 생성 완료`);
    console.log(`위치: ${jsonPath}\n`);

    // 통계 출력
    const paths = specWithTags.paths || {};
    const pathCount = Object.keys(paths).length;
    console.log('API 통계:');
    console.log(`   - 총 API 경로: ${pathCount}개`);
    
    // 경로별 메서드 개수
    let methodCount = 0;
    Object.values(paths).forEach(path => {
      methodCount += Object.keys(path).length;
    });
    console.log(`   - 총 HTTP 메서드: ${methodCount}개`);
    
    // 도메인별 통계
    console.log(`\n도메인별 분류:`);
    tags.forEach(tag => {
      const count = Object.keys(paths).filter(path => {
        const pathTag = getTagForPath(path);
        return pathTag === tag.name;
      }).length;
      console.log(`   - ${tag.name}: ${count}개 API`);
    });
    
    // 스키마 통계
    const schemas = specWithTags.components?.schemas || {};
    const schemaCount = Object.keys(schemas).length;
    console.log(`\nDTO 스키마:`);
    console.log(`   - 총 스키마: ${schemaCount}개`);
    console.log(`   - 위치: components/schemas`);
    
    console.log('\n빌드 완료\n');
    
  } catch (error) {
    console.error('Swagger 문서 생성 실패:', error);
    process.exit(1);
  }
}

buildSwagger();
