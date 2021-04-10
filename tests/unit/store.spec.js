import { computed } from 'vue';
import store from '@/store';
import showList from '@/composition/showList';

describe('test cart', () => {
    it('add cart', async () => {
        const item = {
            id: 1,
            category: 'new',
            name: '蘋果',
            price: 30,
            url: 'apple.jpeg',
            orderAmount: 1,
            stock: 10
        };
        const newItem = await store.dispatch('cart/addCartList', item);
        expect(newItem).toStrictEqual(item);
    });
    it('update cart', async () => {
        const cartList = await store.dispatch('cart/updateCartList', { id: 1, num: 2 });
        expect(cartList[0].orderAmount).toBe(2);
    });
    it('remove cart', async () => {
        const cartList = await store.dispatch('cart/removeCartList', { id: 1 });
        expect(cartList).toStrictEqual([]);
    });
    it('clear cart', async () => {
        const cartList = await store.dispatch('cart/clearCartList');
        expect(cartList).toStrictEqual([]);
    });
});

describe('test favorite', () => {
    it('add favorite', async () => {
        const id = 1;
        const newId = await store.dispatch('favorite/addFavoriteProducts', { id });
        expect(newId).toBe(id);
    });
    it('remove favorite', async () => {
        const products = await store.dispatch('favorite/removeFavoriteProducts', { index: 0 });
        expect(products).toStrictEqual([]);
    });
});

describe('test login', () => {
    it('login success', async () => {
        const email = 'test@gmail.com';
        const password = 'test@gmail.com';
        const result = await store.dispatch('login/userLogin', { email, password });
        expect(result.email).toBe(email);
    });
    it('email not fount', async () => {
        const email = 'test@yahoo.com.tw';
        const password = 'test@gmail.com';
        const result = await store.dispatch('login/userLogin', { email, password });
        expect(result.message).toBe('Email 不存在');
    });
    it('invalid password', async () => {
        const email = 'test@gmail.com';
        const password = 'test@yahoo.com.tw';
        const result = await store.dispatch('login/userLogin', { email, password });
        expect(result.message).toBe('密碼錯誤');
    });
    it('sign up success', async () => {
        const email = 'test2@gmail.com';
        const password = 'test2@gmail.com';
        const result = await store.dispatch('login/userSignUp', { email, password });
        expect(result.email).toBe(email);
    });
    it('email exists', async () => {
        const email = 'test2@gmail.com';
        const password = 'test2@gmail.com';
        const result = await store.dispatch('login/userSignUp', { email, password });
        expect(result.message).toBe('Email 重複');
    });
});

describe('test order', () => {
    it('order', async () => {
        const result = await store.dispatch('order/order', {
            uid: 'sQCjrRYN2heGxChb78KmSOdcGTl2',
            content: [{
                id: 1,
                category: 'new',
                name: '蘋果',
                price: 30,
                url: 'apple.jpeg',
                orderAmount: 1,
                stock: 10
            }]
        });
        expect(result.success).toBe(true);
    });
});

describe('test modules', () => {
    it('pagination', () => {
        const fakeData = computed(() => (
            [
                {
                    userId: 1,
                    id: 1,
                    title: 'delectus aut autem',
                    completed: false
                },
                {
                    userId: 1,
                    id: 2,
                    title: 'quis ut nam facilis et officia qui',
                    completed: false
                },
                {
                    userId: 1,
                    id: 3,
                    title: 'fugiat veniam minus',
                    completed: false
                },
                {
                    userId: 1,
                    id: 4,
                    title: 'et porro tempora',
                    completed: true
                },
                {
                    userId: 1,
                    id: 5,
                    title: 'laboriosam mollitia et enim quasi adipisci quia provident illum',
                    completed: false
                },
                {
                    userId: 1,
                    id: 6,
                    title: 'qui ullam ratione quibusdam voluptatem quia omnis',
                    completed: false
                },
                {
                    userId: 1,
                    id: 7,
                    title: 'illo expedita consequatur quia in',
                    completed: false
                },
                {
                    userId: 1,
                    id: 8,
                    title: 'quo adipisci enim quam ut ab',
                    completed: true
                }
            ]
        ));
        const expectData = [
            [
                {
                    userId: 1,
                    id: 1,
                    title: 'delectus aut autem',
                    completed: false
                },
                {
                    userId: 1,
                    id: 2,
                    title: 'quis ut nam facilis et officia qui',
                    completed: false
                },
                {
                    userId: 1,
                    id: 3,
                    title: 'fugiat veniam minus',
                    completed: false
                },
                {
                    userId: 1,
                    id: 4,
                    title: 'et porro tempora',
                    completed: true
                }
            ],
            [
                {
                    userId: 1,
                    id: 5,
                    title: 'laboriosam mollitia et enim quasi adipisci quia provident illum',
                    completed: false
                },
                {
                    userId: 1,
                    id: 6,
                    title: 'qui ullam ratione quibusdam voluptatem quia omnis',
                    completed: false
                },
                {
                    userId: 1,
                    id: 7,
                    title: 'illo expedita consequatur quia in',
                    completed: false
                },
                {
                    userId: 1,
                    id: 8,
                    title: 'quo adipisci enim quam ut ab',
                    completed: true
                }
            ]
        ];
        expect(showList(fakeData).value).toStrictEqual(expectData);
    });
});