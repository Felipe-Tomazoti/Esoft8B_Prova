import { IsString } from 'class-validator'

export class ComodoDto {
	@IsString()
	nome: string
}
