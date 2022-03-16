import { createServer, Model } from 'miragejs';

export default createServer({

    models: {
        transaction: Model
    },

    seeds(server) {
        server.db.loadData({
            transactions: [
                {
                    id: 1,
                    title: 'Restaura JEANS - Integração',
                    amount: 4200,
                    type: 'deposit',
                    category: 'DEV',
                    createdAt: new Date('2022-02-28 09:00:00')
                },
                {
                    id: 2,
                    title: 'Restaura JEANS - LGPD',
                    amount: 21000,
                    type: 'deposit',
                    category: 'DEV',
                    createdAt: new Date('2021-10-28 09:00:00')
                },
                {
                    id: 3,
                    title: 'ISS - RECEITA',
                    amount: 2700,
                    type: 'withdraw',
                    category: 'TAX',
                    createdAt: new Date('2021-10-28 09:00:00')
                },
            ]
        })
    },

    routes() {
        this.namespace = 'api';

        this.get('/transactions', () => {
            return this.schema.all('transaction')
        })
        this.post('/transactions', (schema, request) => {
            const data = JSON.parse(request.requestBody);

            return schema.create('transaction', data);
        })
    }
})