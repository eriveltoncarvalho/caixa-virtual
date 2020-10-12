import Transaction from '../models/Transaction';
import Category from '../models/Category';

interface Balance {
  entrada: number;
  saida: number;
  saldoTotal: number;
}

interface CreateCategoryDTO {
  title: string;
}

interface CreateTransactionDTO {
  id_categoria: string;
  data: Date;
  title: string;
  value: number;
  type: 'Entrada' | 'Saída';
}

class TransactionsRepository {
  private transactions: Transaction[];
  private categories: Category[];

  constructor() {
    this.transactions = [];
    this.categories = [];
  }

  public all(): Transaction[] {
     
    const movimentacoes = this.transactions.map(item => {
      const categoria = this.getCategory(item.id_categoria); 
       
      return {
        data: item.data,
        id:item.id,
        id_categoria: item.id_categoria,
        categoria,
        title: item.title,
        value: item.value,
        type: item.type
      };
    });

    return movimentacoes;
  }
  
  public getBalance(): Balance {
    const { entrada, saida } = this.transactions.reduce(
      (accumulator: Balance, transaction: Transaction) => {
        switch (transaction.type) {
          case 'Entrada':
            accumulator.entrada += transaction.value;
            break; 
          case 'Saída':
            accumulator.saida += transaction.value;
            break; 
          default:
            break;    
        }      
        return accumulator;
    },
    {
      entrada: 0,
      saida: 0,
      saldoTotal: 0
    }
    );

    const saldoTotal = entrada - saida;

    return { entrada, saida, saldoTotal };
  }

  public create({ id_categoria, data, title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ id_categoria, data, title, value, type });
 
    this.transactions.push(transaction);

    return transaction;
  }

  public getCategories(): Category[] {
    return this.categories; 
  }

  public getCategory(id:string): Category | null {
    const categoryFind = this.categories.find(category => category.id == id);

    return categoryFind || null; 
  }

  public createCategories({ title}: CreateCategoryDTO): Category {
    const category = new Category({ title });
 
    this.categories.push(category);

    return category;
  }
}

export default TransactionsRepository;
