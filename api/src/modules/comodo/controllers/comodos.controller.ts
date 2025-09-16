import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common'
import { ComodoDto } from '../dto/comodos.dto'
import { ComodosService } from '../services/comodos.service'

@Controller('comodos')
export class ComodosController {
	constructor(private readonly comodosService: ComodosService) {}

	@Get()
	async findAll() {
		return this.comodosService.findAll()
	}

	@Get(':id')
	async findOne(@Param('id') id: number) {
		return this.comodosService.findOne(id)
	}

	@Post()
	async create(@Body() createComodoDto: ComodoDto) {
		return this.comodosService.create(createComodoDto)
	}

	@Put(':id')
	async update(@Param('id') id: number, @Body() updateComodoDto: any) {
		return this.comodosService.update(id, updateComodoDto)
	}

	@Delete(':id')
	async remove(@Param('id') id: number) {
		return this.comodosService.remove(id)
	}
}
