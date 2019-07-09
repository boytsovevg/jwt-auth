import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    Unique,
    CreateDateColumn,
    UpdateDateColumn
} from 'typeorm';

import { Length, IsNotEmpty } from 'class-validator';
import * as bcrypt from 'bcryptjs';
import jwtConfig from '../config/jwt-config';

@Entity()
@Unique(["username"])
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Length(4, 20)
    username: string;

    @Column()
    @Length(4, 100)
    password: string;

    @Column()
    @IsNotEmpty()
    role: string;

    @Column()
    @CreateDateColumn()
    createdAt: Date;

    @Column()
    @UpdateDateColumn()
    updatedAt: Date;

    public updatePassword(password: string): void {
        this.password = bcrypt.hashSync(password, 8);
    }

    public passwordValid(unencryptedPassword: string): boolean {
        return bcrypt.compareSync(unencryptedPassword, this.password);
    }
}
