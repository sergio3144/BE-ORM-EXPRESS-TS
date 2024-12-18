import { Router } from "express"
import { createProduct, deleteProduct, getProductById, getProducts, updateAvailability, updateProduct } from "./handlers/product"
import { body, param } from "express-validator"
import { handleInputErrors } from "./middleware"
const router = Router()

/**
  * @swagger
  * components:
  *   schemas:
  *     Product:
  *       type: object
  *       properties:
  *         id:
  *           type: integer
  *           description: The product ID
  *           example: 1
  *         name:
  *           type: string
  *           description: The product name
  *           example: 'Monitor curvo 45 pulgadas'
  *         price:
  *           type: number
  *           description: The product price
  *           example: 100
  *         availability:
  *           type: boolean
  *           description: The product availability
  *           example: true
*/

/**
  * @swagger
  * /api/products:
  *   get:
  *     summary: Get all products
  *     tags: 
  *       - Products
  *     description: Get all products
  *     responses:
  *       200:
  *         description: Successful response
  *         content:
  *           application/json:
  *             schema:
  *               type: array
  *               items:
  *                 $ref: '#/components/schemas/Product'
  *       '404':
  *         description: Products not found
  *       '500':
  *         description: Internal server error
*/


//Routing
router.get('/', getProducts)
router.get('/:id', 
  param('id').isInt().withMessage('ID no válido'),
  handleInputErrors,
  getProductById
)

router.post('/',
  //Validación desde el router
  body('name')
    .notEmpty()
    .withMessage('El nombre del producto no puede ir vacio'),

  body('price')
    .isNumeric()
    .withMessage('Valor no válido')
    .notEmpty()
    .withMessage('El precio del producto no puede ir vacio')
    .custom( value => value > 0 ).withMessage('El precio no válido'),
  // vamos a checar que name no valla vacio y el mensage y luego corremos el request
  // Para el caso del precio es: Si el price no es númerico me manda el mensaje ('Valor no válido')
  handleInputErrors, // Funcion intermedia, que se ejecutan en cada request HTTP
  createProduct
)

router.put('/:id', 
  param('id').isInt().withMessage('ID no válido'),
  body('name')
    .notEmpty()
    .withMessage('El nombre del producto no puede ir vacio'),

  body('price')
    .isNumeric()
    .withMessage('Valor no válido')
    .notEmpty()
    .withMessage('El precio del producto no puede ir vacio')
    .custom( value => value > 0 ).withMessage('El precio no válido'),
  body('availability')
    .isBoolean().withMessage('Valor para disponibilidad no válido'),
  handleInputErrors,
  updateProduct
)

router.patch('/:id', 
  param('id').isInt().withMessage('ID no válido'),
  handleInputErrors,
  updateAvailability
)

router.delete('/:id',
  param('id').isInt().withMessage('ID no válido'),
  handleInputErrors,
  deleteProduct
)

export default router