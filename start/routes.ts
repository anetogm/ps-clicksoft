/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

const CustomersController = () => import('#controllers/customers_controller')
const ContactsController = () => import('#controllers/contacts_controller')
const AuthController = () => import('#controllers/auth_controller')

// Rota inicial
router.get('/', async () => {
  return {
    message: 'API Clicksoft - Sistema de Gestão de Clientes',
    version: '1.0.0',
  }
})

// Rotas de autenticação (públicas)
router
  .group(() => {
    router.post('/register', [AuthController, 'register'])
    router.post('/login', [AuthController, 'login'])
  })
  .prefix('/auth')

// Rotas protegidas por autenticação
router
  .group(() => {
    // Auth routes
    router.post('/logout', [AuthController, 'logout'])
    router.get('/me', [AuthController, 'me'])

    // Customers routes
    router.get('/customers', [CustomersController, 'index'])
    router.post('/customers', [CustomersController, 'store'])
    router.get('/customers/:id', [CustomersController, 'show'])
    router.put('/customers/:id', [CustomersController, 'update'])
    router.delete('/customers/:id', [CustomersController, 'destroy'])

    // Contacts routes
    router.get('/customers/:customer_id/contacts', [ContactsController, 'index'])
    router.post('/contacts', [ContactsController, 'store'])
    router.get('/contacts/:id', [ContactsController, 'show'])
    router.put('/contacts/:id', [ContactsController, 'update'])
    router.delete('/contacts/:id', [ContactsController, 'destroy'])
  })
  .prefix('/api')
  .use(middleware.auth())
