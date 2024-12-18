import { Table, Column, Model, DataType, Default } from "sequelize-typescript";

@Table({
  tableName: 'products'
})

class Product extends Model {
  @Column({
    type: DataType.STRING(100)
  })
  declare name: string

  @Column({
    type: DataType.FLOAT(6, 2)
  })
  declare price: number

  @Default(true)    // Tener valores por default para que no tengamos nesecidad de pasarlos

  @Column({
    type: DataType.BOOLEAN
  })
  declare availability: boolean
}

export default Product

