import {
	Column,
	Entity,
	PrimaryGeneratedColumn,
	ManyToOne,
	JoinColumn
} from 'typeorm'
import { Imovel } from '../../imovel/entities/imoveis.entity'

@Entity('comodos')
export class Comodo {
	@PrimaryGeneratedColumn('increment')
	id: number

	@Column({ name: 'nome', nullable: false })
	nome: string

	@Column({ name: 'imovel_id', nullable: true })
	imovelId: number | null

	@ManyToOne(() => Imovel)
	@JoinColumn({ name: 'imovel_id' })
	imovel: Imovel
}
