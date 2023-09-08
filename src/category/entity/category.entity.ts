import { SubCategoryEntity } from 'src/sub-category/entity/sub-category.entity';
import { PrimaryGeneratedColumn, Column,  CreateDateColumn, Entity, OneToMany } from 'typeorm';

@Entity('category')
export  class CategoryEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 50 })
   name: string;

    @Column({ type: 'varchar', length: 255 })
    category_image: string;

    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    updated_at: Date;


    @Column({ default: true })
    is_active: boolean;

    @OneToMany(() => SubCategoryEntity, (subCategory) => subCategory.category)
    subCategorys: SubCategoryEntity[]
   
}