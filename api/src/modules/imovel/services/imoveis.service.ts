import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Imovel } from '../entities/imoveis.entity'
import { ImovelDto } from '../dto/imoveis.dto'
import { Comodo } from '../../comodo/entities/comodo.entity'
import { ImovelComodoDto } from '../dto/imoveis-comodo.dto'

@Injectable()
export class ImoveisService {
	constructor(
		@InjectRepository(Imovel)
		private readonly imovelRepository: Repository<Imovel>,
		@InjectRepository(Comodo)
		private readonly comodoRepository: Repository<Comodo>
	) {}

	async findAll() {
		const [imovel, comodos] = await Promise.all([
			this.imovelRepository.find(),
			this.comodoRepository.find()
		])

		const comodosByimovel = comodos.reduce(
			(acc, p) => {
				if (p.imovelId !== null) {
					;(acc[p.imovelId] ||= []).push(p.nome)
				}
				return acc
			},
			{} as Record<number, string[]>
		)

		return imovel.map(imovelE => ({
			...imovelE,
			comodos: comodosByimovel[imovelE.id] || []
		}))
	}

	async findOne(id: number) {
		const [comodos, imovel] = await Promise.all([
			this.comodoRepository.find({ where: { imovelId: id } }),
			this.imovelRepository.findOne({ where: { id } })
		])

		if (!imovel) return null

		return {
			...imovel,
			comodos: comodos.map(p => p.nome) || []
		}
	}

	async create(data: ImovelDto) {
		return await this.imovelRepository.save(data)
	}

	async update(id: number, data: ImovelDto) {
		await this.imovelRepository.update(id, data)
		return this.findOne(id)
	}

	async addComodo(id: number, data: ImovelComodoDto) {
		const { comodos } = data

		if (Array.isArray(comodos)) {
			if (comodos.length > 0) {
				comodos.map(
					async (e: number) =>
						await this.comodoRepository.update(e, { imovelId: id })
				)
			}
		}

		return await this.findOne(id)
	}

	async removeComodo(id: number, data: ImovelComodoDto) {
		const { comodos } = data

		if (Array.isArray(comodos)) {
			if (comodos.length > 0) {
				comodos.map(
					async (e: number) =>
						await this.comodoRepository.update(
							{ id: e, imovelId: id },
							{
								imovelId: null
							}
						)
				)
			}
		}

		return await this.findOne(id)
	}

	async remove(id: number) {
		await this.comodoRepository.delete({ imovelId: id })
		await this.imovelRepository.delete(id)
	}
}
