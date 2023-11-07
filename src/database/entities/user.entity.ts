import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { BaseEntity } from "./base-entities/base.entity";

@Entity({name: 'user'})
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id?: number;

    @Column({ nullable: true})
    firstname: string;

    @Column({ nullable: true})
    lastname: string;

    @Column()
    password: string;

    @Column({ nullable: true })
    username: string;

    @Column({ unique: true })
    email: string;

    @Column({ nullable: true})
    role: string;

    @Column({nullable : true})
    phoneNumber?: string;

    @Column({nullable: true})
    isActive: boolean;

    @Column({nullable: true})
    class: string;

}