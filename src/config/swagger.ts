import swaggerJSDoc from 'swagger-jsdoc'

const swaggerOptions: swaggerJSDoc.Options = {
    swaggerDefinition: {
        openapi: '3.0.2',
        tags: [
            {
                name: 'Products',
                description: 'API operations to products'
            }
            //Pueden ir mas tags, ejm: 'Users', 'Orders', 'Categories', Auth, etc
        ],
        info: {
            title: 'REST API Node.js, Express, TypeScript',
            version: '1.0.0',
            description: 'API Docs for products'
        }
    },
    apis: ['./src/router.ts']
}

const swaggerSpec = swaggerJSDoc(swaggerOptions)
export default swaggerSpec