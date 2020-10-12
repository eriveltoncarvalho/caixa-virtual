import { uuid } from 'uuidv4';

class Transaction {
  id: string;
  id_categoria: string;
  data: Date;
  title: string;
  value: number;
  type: 'Entrada' | 'Saída';

  constructor({ id_categoria, data, title, value, type }: Omit<Transaction, 'id'>) {
    this.id = uuid();
    this.id_categoria = id_categoria;
    this.data = data;
    this.title = title;
    this.value = value;
    this.type = type;
  }
}

export default Transaction;
