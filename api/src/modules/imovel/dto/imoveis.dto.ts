import { IsString, IsArray , IsISO8601} from 'class-validator'

export class ImovelDto {

	@IsString()
	descricao: string

	@IsISO8601()
	dataCompra: Date

	@IsString()
	endereco: string
}
