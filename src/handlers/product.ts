import { Request, Response } from 'express'
import { check, validationResult } from 'express-validator'
import Product from '../models/Product.model'

export const getProducts = async (req: Request, res: Response) => {
    /* const products = await Product.findAll({
    order: [
      ['id', 'DESC'] // Nos ordena los ids de mayor a menor y ASC es el normal
    ],
    limit: 2 // Limitar registros,
    attributes: { exclude: ["createdAt", "updatedAt"] } // Omitimos propiedades en nuestra respuesta
  })  */
  const products = await Product.findAll() // Lo que estamos trallendo son TODOS los productos de nuesta DB 
  res.json({
    data: products
  })
}

export const getProductById = async (req: Request, res: Response) => {
  const { id  } = req.params
  const product = await Product.findByPk(id)

  if(!product) {
    return res.status(404).json({
      error: 'Producto no encontrado'
    })
  }

  res.json({ data: product })

}

export const createProduct = async (req: Request, res: Response) => {
  const product = await Product.create(req.body)    // Ponemos el Await porque va a ser algo asíncrono que vamos a enviar, y creamos el producto en la instancia (Clase) y lo mandamos a la DB
  res.status(201).json({ data: product })
}

export const updateProduct = async (req: Request, res: Response) => {
  // Saber si un producto existe
  const { id  } = req.params
  const product = await Product.findByPk(id)

  if(!product) {
    return res.status(404).json({
      error: 'Producto no encontrado'
    })
  }
  
  //Luego procedemos a actualizar
  await product.update(req.body)
  await product.save()
  res.json({data: product})

}

export const updateAvailability = async (req: Request, res: Response) => {
  const { id  } = req.params
  const product = await Product.findByPk(id)

  if(!product) {
    return res.status(404).json({
      error: 'Producto no encontrado'
    })
  }
  
  //Luego procedemos a actualizar (PATCH)
  product.availability = !product.dataValues.availability
  await product.save()
  res.json({data: product})
}

export const deleteProduct = async (req: Request, res: Response) => {
  const { id  } = req.params
  const product = await Product.findByPk(id)

  if(!product) {
    return res.status(404).json({
      error: 'Producto no encontrado'
    })
  }

  await product.destroy()
  res.json({ data: 'Producto Eliminado...' })
}