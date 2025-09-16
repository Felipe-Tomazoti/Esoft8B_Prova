import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { ComodoDto } from '../dto/comodos.dto'
import { Comodo } from '../entities/comodo.entity'

@Injectable()
export class ComodosService {
	constructor(
		@InjectRepository(Comodo)
		private readonly comodoRepository: Repository<Comodo>
	) {}

	async findAll() {
		return await this.comodoRepository.find()
	}

	async findOne(id: number) {
		return await this.comodoRepository.findOneBy({ id })
	}

	async create(data: ComodoDto) {
		return await this.comodoRepository.save(data)	
	}

	async update(id: number, data: ComodoDto) {
		await this.comodoRepository.update(id, data)
		return await this.findOne(id)
	}

	async remove(id: number) {
		await this.comodoRepository.delete(id)
	}
}
