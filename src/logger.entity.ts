import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class RequestLog {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  timestamp: Date;

  @Column()
  method: string;

  @Column()
  endpoint: string;

  @Column()
  responseStatus: number;

  @Column({ nullable: true })
  user: string;

  @Column()
  ipAddress: string;

  @Column({ type: 'text', nullable: true })
  userAgent: string;

  @Column({ type: 'text', nullable: true })
  requestBody: string;

  @Column({ type: 'text', nullable: true })
  responseBody: string;

  @Column({ default: false })
  isError: boolean;

  @Column({ type: 'text', nullable: true })
  errorMessage: string;

  @Column({ type: 'float', nullable: true })
  durationMs: number;
}
