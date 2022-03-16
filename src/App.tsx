
import { Dashboard } from "./components/Dashboard";
import { Header } from "./components/Header";
import { GlobalStyle } from "./styles/global";

import './backend';
import NewTransactionModal from "./components/NewTransactionModal";
import { useState } from "react";
import { TransactionsProvider } from "./hooks/useTransactions";


export function App() {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleChangeTransactionModal = () => {
      setModalIsOpen((prevState) => !prevState);
  }
 
  
  return (
    <TransactionsProvider>
      <Header onChangeTransactionModal={handleChangeTransactionModal }/>
      <Dashboard />
      <NewTransactionModal
        isOpen={modalIsOpen}
        onRequestClose={handleChangeTransactionModal}
      />
      <GlobalStyle />
    </TransactionsProvider>
  );
}

