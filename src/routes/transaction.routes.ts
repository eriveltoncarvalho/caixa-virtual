import { Router } from 'express';

import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';

const transactionRouter = Router();
const transactionsRepository = new TransactionsRepository();

transactionRouter.get('/categories', (request, response) => {
  const categories = transactionsRepository.getCategories();
 
  return response.json({   
   categories   
 });

})

transactionRouter.post('/categories', (request, response) => {
 try {
   const { title } = request.body;

   const createTransactionService = new CreateTransactionService(
     transactionsRepository
   );

   const category = createTransactionService.executeCategories({
     title
   });
 
   return response.json(category);
 } catch (err) {
   return response.status(400).json({ error: err.message });
 }
});

transactionRouter.get('/', (request, response) => {
  try {
    const movimentacoes = transactionsRepository.all();
    const totais = transactionsRepository.getBalance();
    
    return response.json({
      totais,
      movimentacoes
    });
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});
 
transactionRouter.post('/', (request, response) => {
  try {
    const { id_categoria, data, title, value, type } = request.body;

    const createTransactionService = new CreateTransactionService(
      transactionsRepository
    );

    const transaction = createTransactionService.execute({
      id_categoria,
      data,
      title,
      value,
      type
    });
  
    return response.json(transaction);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default transactionRouter;
