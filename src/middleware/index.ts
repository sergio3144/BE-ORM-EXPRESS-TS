import { Request, Response, NextFunction } from "express"
import { validationResult } from "express-validator"

export const handleInputErrors = (req: Request, res: Response, next: NextFunction) => {

  let errors = validationResult(req)
  if(!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  // Lo que estamos realizando es crear una variable de errores y vamos a validar el request
  // luego decimos si no existe algo vacio entonces me retorna el status 400 con un json fomateado a array
  // En caso de un error: 
  /* 
  {
    "errors": [
        {
            "type": "field",
            "value": "",
            "msg": "El nombre del producto no puede ir vacio",
            "path": "name",
            "location": "body"
        },
        {
            "type": "field",
            "value": "",
            "msg": "El precio del producto no puede ir vacio",
            "path": "price",
            "location": "body"
        }
    ]
  }
  */

  next()  // Le decimos: Vete al siguiente middleware
}