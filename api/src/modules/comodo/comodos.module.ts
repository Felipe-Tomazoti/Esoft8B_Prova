import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Comodo } from './entities/comodo.entity'
import { ComodosController } from './controllers/comodos.controller'
import { ComodosService } from './services/comodos.service'

@Module({
	imports: [TypeOrmModule.forFeature([Comodo])],
	controllers: [ComodosController],
	providers: [ComodosService]
})
export class ComodosModule {}
