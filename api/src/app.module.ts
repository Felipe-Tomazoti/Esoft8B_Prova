import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { DatabaseConfig } from './shared/database/database.config'
import { DatabaseService } from './shared/database/database.service'
import { ImoveisModule } from './modules/imovel/imoveis.module'
import { ComodosModule } from './modules/comodo/comodos.module'
@Module({
	imports: [
		ConfigModule.forRoot(),
		TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			useFactory: (configService: ConfigService) => {
				return DatabaseConfig.createTypeOrmOptions(configService)
			},
			inject: [ConfigService]
		}),
		ImoveisModule,
		ComodosModule
	],
	controllers: [],
	providers: [DatabaseService]
})
export class AppModule {}
