import { ConfigService } from '@nestjs/config'
import { TypeOrmModuleOptions } from '@nestjs/typeorm'
import { join } from 'path'

export class DatabaseConfig {
	static createTypeOrmOptions(
		configService: ConfigService
	): TypeOrmModuleOptions {
		return {
			type: 'postgres',
			url: configService.get('DB_URL'),
			ssl: false,
			useUTC: true,
			entities: [join(__dirname, '../../**/*.entity{.ts,.js}')],
			synchronize: true,
			connectTimeoutMS: 30000,
			logging: false,
			migrationsRun: false,
			migrations: ['src/shared/database/migrations/*.ts']
		}
	}
}
