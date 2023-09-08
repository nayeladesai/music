import { CategoryEntity } from 'src/category/entity/category.entity';
import { PrimaryGeneratedColumn, Column,  CreateDateColumn, Entity, OneToOne, JoinColumn, ManyToOne } from 'typeorm';

@Entity('sub_category')
export  class SubCategoryEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 50 })
    name: string;

    @Column({ type: 'varchar', length: 255 })
    sub_category_image: string;

    @ManyToOne(() => CategoryEntity, (category) => category.subCategorys)
    category: CategoryEntity

    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    updated_at: Date;

    @Column({ default: true })
    is_active: boolean;
   
}