import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';
import Category from '../models/Category';

interface Request {
  id_categoria: string;
  data: Date;
  title: string;
  value: number;
  type: 'Entrada' | 'Saída';
}

interface RequestCategories {
  title: string;
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ id_categoria, data, title, value, type }: Request): Transaction {
    const { saldoTotal } = this.transactionsRepository.getBalance();

    const category  = this.transactionsRepository.getCategory(id_categoria);

    if (category == null){
      throw new Error('Categoria não existe no cadastro.'); 
    } 

    if (type=='Saída' && saldoTotal < value){
      throw new Error('Saldo de '+saldoTotal+' é insuficente para o lançamento.');
    }     

    if (type !=='Saída' && type !=='Entrada'){
      throw new Error('Type '+type+' inválido');
    } 
    
    const transaction = this.transactionsRepository.create({
      id_categoria,
      data,
      title, 
      value, 
      type
    });
   
   return transaction; 
  }

  public executeCategories({ title }: RequestCategories): Category {
      
    const category = this.transactionsRepository.createCategories({
      title
    });
   
   return category; 
  }
}

export default CreateTransactionService;
