

import logo from '../../assets/svg/logo.svg';
import { Container, Content } from './styles';

type HeaderProps = {
    onChangeTransactionModal: () => void,
}

export function Header({onChangeTransactionModal} : HeaderProps) {

    return (
        <Container>
            <Content>
                <img src={logo} alt="dt money" />
                <button type="button" onClick={onChangeTransactionModal}>
                    Nova transação
                </button>
            </Content>
           
        </Container>
    )
}