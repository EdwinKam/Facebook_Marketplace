import {render, fireEvent} from '@testing-library/react';
import {screen} from '@testing-library/react';
import {setupServer} from 'msw/node';
import {createMemoryHistory} from 'history';
import {Router} from 'react-router-dom';
import {rest} from 'msw';
import {act} from 'react-dom/test-utils';
import App from '../App';

/**
 * @param {number} width
 */
function setWidth(width) {
  global.innerWidth = width;
  act(() => {
    global.dispatchEvent(new Event('resize'));
  });
}
/** */
export function setNarrow() {
  setWidth(550);
}
/** */
export function setWide() {
  setWidth(950);
}
const subCatURL = 'http://localhost/v0/category';

const server = setupServer(
  rest.get(subCatURL, (req, res, ctx)=>{
    return res(
      ctx.status(200),
      ctx.json([
        {
          'subCategory': [
            'cell phones',
            'flash drives',
          ],
          'name': 'electronics',
          'hasParent': false,
        },
        {
          'subCategory': [
            'men',
            'women',
          ],
          'name': 'apparel',
          'hasParent': false,
        },
        {
          'subCategory': [
            'iphone',
            'android',
          ],
          'name': 'cell phones',
          'hasParent': true,
        },
        {
          'subCategory': [],
          'name': 'flash drives',
          'hasParent': true,
        },
        {
          'subCategory': [],
          'name': 'iphone',
          'hasParent': true,
        },
        {
          'subCategory': [],
          'name': 'android',
          'hasParent': true,
        },
        {
          'subCategory': [],
          'name': 'men',
          'hasParent': true,
        },
        {
          'subCategory': [],
          'name': 'women',
          'hasParent': true,
        },
      ]));
  }),
  rest.get('http://localhost/v0/listings',
    (req, res, ctx)=>{
      return res(
        ctx.status(200),
        ctx.json([{
          'id': 'c785afe5-09c1-42d7-98dc-d9ccfd38f51e',
          'category': 'iphone',
          'user': 'c8ddb501-dd12-4cbc-8cd7-b630f10020ea',
          'listing': {
            'pic': [
              'https://cdn.discordapp.com/attachments/901173318592389140/915697088489218118/127133138_406306303887386_5619193443963157235_n.png',
            ],
            'name': 'iPhone 7 Plus',
            'price': '$200',
            'delivery': 'local pickup',
            'condition': 'used',
            'responses': [],
            'description': 'Doneed lacus.',
          },
        }]),
      );
    }),
);

beforeAll(() => server.listen());
afterAll(() => server.close());
afterEach(() => {
  server.resetHandlers();
});

test('try search', async ()=>{
  const history = createMemoryHistory();
  history.push('/');
  render(
    <Router history={history}>
      <App/>,
    </Router>,
  );
  const searchInput = screen.getByTestId('search-input-desktop');
  //   const input = within(searchInput[0]).querySelector('input')
  //   autocomplete.focus()
  fireEvent.change(searchInput, {target: {value: 'abc'}});
  const waitTime = (delay) => new Promise( (resolve) =>
    setTimeout(resolve, delay));
  await waitTime(1000);
});
test('try search empty', async ()=>{
  const history = createMemoryHistory();
  history.push('/');
  render(
    <Router history={history}>
      <App/>,
    </Router>,
  );
  const searchInput = screen.getByTestId('search-input-desktop');
  //   const input = within(searchInput[0]).querySelector('input')
  //   autocomplete.focus()
  fireEvent.change(searchInput, {target: {value: ''}});
  const waitTime = (delay) => new Promise( (resolve) =>
    setTimeout(resolve, delay));
  await waitTime(1000);
});

