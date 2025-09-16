import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common'
import { ImoveisService } from '../services/imoveis.service'
import { ImovelDto } from '../dto/imoveis.dto'
import { ImovelComodoDto } from '../dto/imoveis-comodo.dto'

@Controller('imoveis')
export class ImoveisController {
	constructor(private readonly imoveisService: ImoveisService) {}

	@Get()
	async findAll() {
		return this.imoveisService.findAll()
	}

	@Get(':id')
	async findOne(@Param('id') id: number) {
		return this.imoveisService.findOne(id)
	}

	@Post()
	async create(@Body() createImovelDto: ImovelDto) {
		return this.imoveisService.create(createImovelDto)
	}

	@Put('/addComodo/:id')
	async addComodo(
		@Param('id') id: number,
		@Body() novoImovelComodoDto: ImovelComodoDto
	) {
		return this.imoveisService.addComodo(id, novoImovelComodoDto)
	}

	@Put('/removeComodo/:id')
	async removeComodo(
		@Param('id') id: number,
		@Body() novoImovelComodoDto: ImovelComodoDto
	) {
		return this.imoveisService.removeComodo(id, novoImovelComodoDto)
	}

	@Put(':id')
	async update(@Param('id') id: number, @Body() updateImovelDto: ImovelDto) {
		return this.imoveisService.update(id, updateImovelDto)
	}

	@Delete(':id')
	async remove(@Param('id') id: number) {
		return this.imoveisService.remove(id)
	}
}
