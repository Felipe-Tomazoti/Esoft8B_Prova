import { IsString, IsArray, isNumber, IsNumber} from 'class-validator'

export class ImovelComodoDto {
	@IsArray()
	@IsNumber({}, { each: true })
	comodos: number[]
}
