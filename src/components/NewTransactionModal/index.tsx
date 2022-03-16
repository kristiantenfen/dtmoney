import Modal from 'react-modal';
import { Container, RadioBox, TransactionTypeContainer } from './styles';

import closeIcon from '../../assets/svg/closer.svg';
import inputIcon from '../../assets/svg/input.svg';
import outputIcon from '../../assets/svg/output.svg';
import { FormEvent, useState } from 'react';
import { useTransactions } from '../../hooks/useTransactions';

Modal.setAppElement('#root');
// import { Container } from './styles';

type NewTransactionModalProps = {
    isOpen: boolean,
    onRequestClose: () => void,
}

const NewTransactionModal = ({isOpen, onRequestClose}:NewTransactionModalProps) => {

    const { createNewTransaction } = useTransactions();

    const [type, setType] = useState('deposit');
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [amount, setAmount] = useState(0);


    const handleCreateNewTransaction = async (event: FormEvent) => {
        event.preventDefault();
       await createNewTransaction({
            title,
            amount,
            type,
            category
        });

        onRequestClose();
        setTitle('');
        setCategory('');
        setType('deposit');
        setAmount(0);
    }
    

    return (
        <Modal
        isOpen={isOpen}
            onRequestClose={onRequestClose}
            overlayClassName="react-modal-overlay"
            className="react-modal-content"
        >
            <button onClick={onRequestClose} className="react-modal-close">
                <img src={closeIcon} alt="Fechar" />
            </button>
            <Container onSubmit={handleCreateNewTransaction}>
            <h2>Cadastrar Transação</h2>
                <input
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                    name="title"
                    type="text"
                    placeholder="Titulo"
                />
                <input
                    onChange={(e) => setAmount(Number(e.target.value))}
                    value={amount}
                    name="amount"
                    type="number"
                    placeholder="Valor"
                />
                
                <TransactionTypeContainer>
                    <RadioBox
                        type='button'
                        onClick={() => setType('deposit')}
                        isActive={type === 'deposit'}
                        activeColor="green"
                    >
                        <img src={inputIcon} alt="Entrada" />
                        <span>Entrada</span>
                    </RadioBox>
                    <RadioBox
                        type='button'
                        onClick={() => setType('withdraw')}
                        isActive={type === 'withdraw'}
                        activeColor="red"
                    >
                        <img src={outputIcon} alt="Saída" />
                        <span>Saída</span>
                    </RadioBox>
                </TransactionTypeContainer>

                <input
               onChange={(e) => setCategory(e.target.value)}
                value={category}
                    name="category"
                    placeholder="Categoria"
                />
                
                <button type="submit">Enviar</button>
            </Container>
    </Modal>
  );
}

export default NewTransactionModal;