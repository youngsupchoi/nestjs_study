import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as config from 'config';
const dbConfig = config.get('db');

export const typeORMConfig: TypeOrmModuleOptions = {
  type: dbConfig.type,
  host: process.env.RDS_HOSTNAME || dbConfig.host,
  port: process.env.RDS_PORT || dbConfig.host,
  username: process.env.RDS_USERNAME || dbConfig.username,
  password: process.env.RDS_PASSWORD || dbConfig.password,
  database: process.env.RDS_DB_NAME || dbConfig.database,
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  //배포시에는 false로 true값을 주면 애플리케이션을 다시 실행할때 엔티티 안에서 수정된 컬럼의 길이 타입 변경값 등을 해당 테이블을 Drop한 후 다시 생성합니다.
  synchronize: dbConfig.synchronize,
};
