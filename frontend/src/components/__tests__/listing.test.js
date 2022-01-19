import {render, fireEvent} from '@testing-library/react';
import {screen, waitFor} from '@testing-library/react';
import {rest} from 'msw';
import {setupServer} from 'msw/node';
import {createMemoryHistory} from 'history';
import {Router} from 'react-router-dom';

import Listing from '../Listing';

const URL = 'http://localhost:3010/v0/comments/99c21182-3a98-4bde-88db-10f92515e585';

const server = setupServer(
  rest.put('/v0/comments/99c21182-3a98-4bde-88db-10f92515e585?user=john'+
    '&comment=abc', (req, res, ctx)=>{
    return res(
      ctx.status(204),
      ctx.json([]),
    );
  }),

);
beforeAll(() => server.listen());
afterAll(() => server.close());

const listings = [{
  'id': '99c21182-3a98-4bde-88db-10f92515e585',
  'category': 'android',
  'user': 'c8ddb501-dd12-4cbc-8cd7-b630f10020ea',
  'listing': {
    'pic': [
      'https://cdn.discordapp.com/attachments/901173318592389140/915695224934776832/260699202_4533738640040561_601682984201426085_n.png',
      'https://cdn.discordapp.com/attachments/901173318592389140/915695657484972113/258770378_6801404799877167_858130111844528878_n.png',
    ],
    'name': 'Samsung Galaxy s12',
    'price': '$400',
    'delivery': 'local pickup',
    'condition': 'used',
    'responses': [],
    'description': 'Vestibulum quam sapien, varius ut, blandit',
  },
}];


afterEach(() => {
  server.resetHandlers();
});
// see if the listing is rendered
test('listing rendered', async ()=>{
  render(
    <Listing listings={listings}/>,
  );
  await waitFor(()=> screen.getByText('Samsung Galaxy s12'));
});

// no user data
test('no user data', async ()=>{
  const history = createMemoryHistory();
  history.push('/listing');
  const empty= [];
  server.use(
    rest.get(URL, (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json(empty));
    }),
  );
  render(
    <Router history={history}>
      <Listing listings={listings}/>
    </Router>,

  );
  fireEvent.click(screen.getByText('Samsung Galaxy s12'));
  // fireEvent.click(screen.getByTestId('ArrowRightIcon'));
  // fireEvent.click(screen.getByTestId('ArrowRightIcon'));
  // fireEvent.click(screen.getByTestId('ArrowLeftIcon'));
  // fireEvent.click(screen.getByTestId('ArrowLeftIcon'));
  // const input = screen.getByPlaceholderText('have something to say?');
  // fireEvent.change(input, {target: {value: 'No Cow Level'}});
  fireEvent.click(screen.getByTestId('comment-button-nologin'));
  // const waitTime = (delay) => new Promise( (resolve) =>
  //   setTimeout(resolve, delay));
  // await waitTime(2000);
  // fireEvent.click(screen.getByTestId('CloseIcon'));
});

const userData = {'name': 'john',
  'id': 'c8ddb501-dd12-4cbc-8cd7-b630f10020ea', 'accessToken': 'somethng'};


// click on the listing, pic next, pic prev,
test('opening the listing and comment', async ()=>{
  localStorage.setItem('user', JSON.stringify(userData));
  render(
    <Listing listings={listings}/>,
  );
  server.use(
    rest.get('http://localhost:3010/v0/comments/99c21182-3a98-4bde-88db-10f92515e585',
      (req, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.json([{'user': 'john', 'comment': 'abc'}]));
      }),
    rest.put('/v0/comments/99c21182-3a98-4bde-88db-10f92515e585?user=john'+
    '&comment=abc', (req, res, ctx)=>{
      return res(
        ctx.status(204),
      );
    }),
  );
  console.log(listings);
  fireEvent.click(screen.getByText('Samsung Galaxy s12'));
  fireEvent.click(screen.getByTestId('ArrowRightIcon'));
  fireEvent.click(screen.getByTestId('ArrowRightIcon'));
  fireEvent.click(screen.getByTestId('ArrowLeftIcon'));
  fireEvent.click(screen.getByTestId('ArrowLeftIcon'));
  const input = screen.getByTestId('comment-input');
  fireEvent.change(input, {target: {value: 'abc'}});
  fireEvent.click(screen.getByTestId('comment-button'));
  const waitTime1 = (delay) => new Promise( (resolve) =>
    setTimeout(resolve, delay));
  await waitTime1(200);

  // fireEvent.click(getClickable('comment-button'));
  screen.getByText('john:abc');
  // screen.getByText('Samsung Galaxy s12');
  const waitTime = (delay) => new Promise( (resolve) =>
    setTimeout(resolve, delay));
  await waitTime(200);
  fireEvent.click(screen.getByTestId('CloseIcon'));
});


const listingsWithOnePic = [{
  'id': '99c21182-3a98-4bde-88db-10f92515e585',
  'category': 'android',
  'user': 'c8ddb501-dd12-4cbc-8cd7-b630f10020ea',
  'listing': {
    'pic': [
      'https://cdn.discordapp.com/attachments/901173318592389140/915695657484972113/258770378_6801404799877167_858130111844528878_n.png',
    ],
    'name': 'Samsung Galaxy s12',
    'price': '$400',
    'delivery': 'local pickup',
    'condition': 'used',
    'responses': [],
    'description': 'Vestibulum quam sapien, varius ut, blandit',
  },
}];
test('open product one pic but no comment', async ()=>{
  const empty =[];
  server.use(
    rest.get(URL, (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json(empty));
    }),
  );
  console.log(URL);
  render(
    <Listing listings={listingsWithOnePic}/>,
  );
  fireEvent.click(screen.getByText('Samsung Galaxy s12'));
});

// // // opening and closing listing
// test('opening and closing listing', async ()=>{
//   server.use(
//     rest.get(URL, (req, res, ctx) => {
//       return res(
//         ctx.status(200),
//         ctx.json(empty));
//     }),
//   );
//   render(
//     <Listing listings={listings}/>,
//   );
//   // fireEvent.click(screen.getByTestId('leftarrow'));
//   fireEvent.click(screen.getByText('Samsung Galaxy s12'));
//   fireEvent.click(screen.getByTestId('CloseIcon'));
// });
// no listing
test('no listing', async ()=>{
  render(
    <Listing listings={'[]'}/>,
  );
});

