import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'
import { Comodo } from '../../comodo/entities/comodo.entity'

@Entity('imoveis')
export class Imovel {
	@PrimaryGeneratedColumn('increment')
	id: number

	@Column({ name: 'descricao', nullable: false })
	descricao: string

	@Column({ name: 'dataCompra', nullable: false})
	dataCompra: Date

	@Column({ name: 'endereco', nullable: false })
	endereco: string

	@OneToMany(() => Comodo, comodo => comodo.imovelId)
	comodos: Comodo[]
}
