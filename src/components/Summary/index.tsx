import inputIcon from '../../assets/svg/input.svg';
import outputIcon from '../../assets/svg/output.svg';
import inputTotalIcon from '../../assets/svg/total.svg';
import { useTransactions } from '../../hooks/useTransactions';

import { Container } from './styles';

const Summary: React.FC = () => {

  const { transactions } = useTransactions();
  
  const summary = transactions.reduce((obj, transaction) => {
    return { 
      deposits: transaction.type === 'deposit' ? obj.deposits += transaction.amount : obj.deposits,
      withdraws: transaction.type === 'withdraw' ? obj.withdraws += transaction.amount : obj.withdraws,
      balance: transaction.type === 'deposit' ? obj.balance += transaction.amount : obj.balance -= transaction.amount
    }
   }, { 
    deposits: 0,
    withdraws: 0,
    balance: 0
  }) 

  return (<Container>
    <div>
      <header>
        <p>Entradas</p>
        <img src={inputIcon} alt="Entradas" />
      </header>
      <strong>{new Intl.NumberFormat('pt-BR', {
                                style: 'currency',
                                currency: 'BRL',
      }).format(summary.deposits)}</strong>
    </div>
    <div>
      <header>
        <p>Saídas</p>
        <img src={outputIcon} alt="Saídas" />
      </header>
      <strong  className='text-red'>- {new Intl.NumberFormat('pt-BR', {
                                style: 'currency',
                                currency: 'BRL',
                        }).format(summary.withdraws)}</strong>
    </div>
    <div className='hightlight-background'>
      <header>
        <p>Total</p>
        <img src={inputTotalIcon} alt="Total" />
      </header>
      <strong>{new Intl.NumberFormat('pt-BR', {
                                style: 'currency',
                                currency: 'BRL',
                        }).format(summary.balance)}</strong>
    </div>
  </Container>);
}

export default Summary;