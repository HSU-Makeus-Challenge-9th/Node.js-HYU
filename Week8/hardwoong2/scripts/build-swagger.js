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

async function buildSwagger() {
  try {
    console.log('Swagger 문서 빌드 시작...\n');
    
    // Swagger JSON 생성
    const result = await swaggerAutogen(options)(outputFile, routes, doc);
    
    if (!result || !result.data) {
      throw new Error('Swagger 문서 생성 실패');
    }

    // JSON을 YAML로 변환
    const yamlContent = yaml.dump(result.data, {
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
    fs.writeFileSync(jsonPath, JSON.stringify(result.data, null, 2), 'utf8');
    console.log(`openapi.json 파일 생성 완료`);
    console.log(`위치: ${jsonPath}\n`);

    // 통계 출력
    const paths = result.data.paths || {};
    const pathCount = Object.keys(paths).length;
    console.log('API 통계:');
    console.log(`   - 총 API 경로: ${pathCount}개`);
    
    console.log('빌드 완료\n');
    
  } catch (error) {
    console.error('Swagger 문서 생성 실패:', error);
    process.exit(1);
  }
}

buildSwagger();
