import {render, fireEvent} from '@testing-library/react';
import {screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Router} from 'react-router-dom';
import {setupServer} from 'msw/node';
import {rest} from 'msw';
import '@testing-library/jest-dom';

import App from '../App';
// MOCK DATA SET UP
const userToken = {
  'name': 'John Doe',
  'id': 'c8ddb501-dd12-4cbc-8cd7-b630f10020ea',
  'accessToken': 'accessSmackshess',
};
const server = setupServer(
  rest.post('/authenticate', (req, res, ctx) => {
    return res(
      ctx.status(201),
      ctx.json(
        {
          'name': 'John Doe',
          'id': 'c8ddb501-dd12-4cbc-8cd7-b630f10020ea',
          'accessToken': 'accessSmackshess',
        },
      ),
    );
  }),
  rest.get('/v0/category', (req, res, ctx)=>{
    return res(
      ctx.status(204),
      ctx.json([
        {
          'name': 'electronics',
        },
        {
          'name': 'apparel',
        },
      ]),
    );
  }),
  rest.post('/v0/listings', (req, res, ctx) => {
    return res(
      ctx.status(201),
      ctx.json(
        {
          'user': '3fa85f64-5717-4562-b3fc-2c963f66afa6',
          'category': 'apparel',
          'listing': {
            'name': 'haha',
            'price': 'string',
            'pic': [
              'string',
            ],
            'condition': 'string',
            'delivery': 'string',
            'description': 'string',
            'responses': [
              'string',
            ],
          },
        },
      ),
    );
  },
  ),

);

beforeAll(() => server.listen());
afterAll(() => server.close());

test('sell before login', async () =>{
  const history = createMemoryHistory();
  history.push('/sell');
  render(
    <Router history={history}>
      <App />
    </Router>,
  );
  // Inputs account information
  screen.getByText('Create an account');
  // The waiting function IMPORTANT FOR BUTTONS
  const waitTime = (delay) => new Promise( (resolve) =>
    setTimeout(resolve, delay));
  await waitTime(1000);
});

test('sell after login', async () =>{
  const history = createMemoryHistory();
  localStorage.setItem('user', JSON.stringify(userToken));
  history.push('/sell');
  render(
    <Router history={history}>
      <App />
    </Router>,
  );
  // Inputs account information
  server.use(
    rest.get('/v0/category', (req, res, ctx)=>{
      return res(
        ctx.status(204),
        ctx.json([
          {
            'name': 'electronics',
          },
          {
            'name': 'apparel',
          },
        ]),
      );
    }));

  const productInput = screen.getByTestId('productName-input');
  fireEvent.change(productInput, {target: {value: 'product name'}});
  fireEvent.click(screen.getByText('Sell it!'));
  const priceInput = screen.getByTestId('price-input');
  fireEvent.change(priceInput, {target: {value: ''}});
  fireEvent.change(priceInput, {target: {value: 'price'}});
  const catInput = screen.getByTestId('category-input');
  const selectCat = catInput.childNodes[0];
  fireEvent.change(selectCat, {target: {value: 'electronics'}});
  const waitTime1 = (delay) => new Promise( (resolve) =>
    setTimeout(resolve, delay));
  await waitTime1(10);
  const conditionInput = screen.getByTestId('condition-input');
  const selectCon = conditionInput.childNodes[0];
  fireEvent.change(selectCon, {target: {value: 'used'}});
  await waitTime1(10);
  const deliveryInput = screen.getByTestId('delivery-input');
  const selectDelivery = deliveryInput.childNodes[0];
  fireEvent.change(selectDelivery, {target: {value: 'shipping'}});
  await waitTime1(10);
  const descriptionInput = screen.getByTestId('description-input');
  fireEvent.change(descriptionInput, {target: {value: 'haha'}});
  await waitTime1(10);
  fireEvent.click(screen.getByText('add Pics'));
  await waitTime1(10);
  const picInput = screen.getByTestId('pic-input0');
  fireEvent.change(picInput, {target: {value: 'some pic'}});
  await waitTime1(10);
  fireEvent.click(screen.getByText('remove Pic'));
  await waitTime1(10);
  fireEvent.click(screen.getByText('Sell it!'));
  await waitTime1(10);

  //   getClickable('New');
  // The waiting function IMPORTANT FOR BUTTONS
  const waitTime = (delay) => new Promise( (resolve) =>
    setTimeout(resolve, delay));
  await waitTime(1000);
  // screen.getByText('back to the market');
});

// test('all buttons', async () =>{
//   const history = createMemoryHistory();
//   history.push('/sell');
//   render(
//     <Router history={history}>
//       <App />
//     </Router>,
//   );


//   // The waiting function IMPORTANT FOR BUTTONS
//   const waitTime = (delay) => new Promise( (resolve) =>
//     setTimeout(resolve, delay));
//   await waitTime(1000);
// });

// test('Sell should bring u to sell page after login', async () =>{
//   const history = createMemoryHistory();
//   history.push('/sell');
//   render(
//     <Router history={history}>
//       <App />
//     </Router>,
//   );
//   getOnlyVisible('Sell it!');
// });
