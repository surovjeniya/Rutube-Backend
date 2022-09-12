import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const getPostgresConfig = async (
  configService: ConfigService,
): Promise<TypeOrmModuleOptions> => ({
  type: 'postgres',
  host: 'localhost',
  password: configService.get('PG_PASSWORD'),
  username: configService.get('PG_USERNAME'),
  port: Number(configService.get('PG_PORT')),
  database: configService.get('PG_DATABASE'),
  autoLoadEntities: true,
  synchronize: true,
});
