import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ImoveisController } from './controllers/imoveis.controller'
import { ImoveisService } from './services/imoveis.service'
import { Imovel } from './entities/imoveis.entity'
import { Comodo } from '../comodo/entities/comodo.entity'

@Module({
	imports: [TypeOrmModule.forFeature([Imovel, Comodo])],
	controllers: [ImoveisController],
	providers: [ImoveisService]
})
export class ImoveisModule {}
