import {render, fireEvent} from '@testing-library/react';
import {screen} from '@testing-library/react';
import {setupServer} from 'msw/node';
import {createMemoryHistory} from 'history';
import {Router} from 'react-router-dom';
import {rest} from 'msw';
import {act} from 'react-dom/test-utils';
import Categories from '../categories';

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
  setWidth(750);
}
const subCatURL = 'http://localhost/v0/category';
const listingURL = 'http://localhost/v0/listings';

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
  rest.get(listingURL, (req, res, ctx)=>{
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
          'description': 'Donec posuere metus vitae ipsum. Aliquais sed lacus.',
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
const doRender= () => {
  const history = createMemoryHistory();
  render(
    <Router history={history}>
      <Categories/>,
    </Router>,
  );
};

// desktop testing

// desktop selecting a category
test('desktop selecting a category', async () => {
  doRender();
  setWide();
  fireEvent.click(screen.getAllByTestId('categories button')[0]);
});

// desktop selection a sub cat
test('desktop selecting a sub cat', async () => {
  doRender();
  setWide();
  fireEvent.click(screen.getAllByTestId('categories button')[0]);
  const waitTime = (delay) => new Promise( (resolve) =>
    setTimeout(resolve, delay));
  await waitTime(2000);
  fireEvent.click(screen.getAllByTestId('subcat fab cell phones')[0]);
});

// desktop "all" breadcrumbs
test('desktop click all breadcrumb', async () => {
  doRender();
  setWide();
  fireEvent.click(screen.getAllByTestId('categories button')[0]);
  const waitTime = (delay) => new Promise( (resolve) =>
    setTimeout(resolve, delay));
  await waitTime(1000);
  fireEvent.click(screen.getAllByTestId('subcat fab cell phones')[0]);
  await waitTime(1000);
  fireEvent.click(screen.getAllByTestId('subcat breadcrumb')[0]);
  await waitTime(1000);
});

// desktop cat breadcrumbs
test('desktop click cat breadcrumb', async () => {
  doRender();
  setWide();
  fireEvent.click(screen.getAllByTestId('all breadcrumbs')[0]);
});

// desktop condition and clicking new
test('desktop opening condition and clicking new', async () => {
  doRender();
  setWide();
  fireEvent.click(screen.getAllByTestId('KeyboardArrowDownIcon')[0]);
  // console.log(screen.getAllByTestId('RadioButtonCheckedIcon'));
  fireEvent.click(screen.getAllByTestId('RadioButtonCheckedIcon')[1]);
});

// desktop condition and clicking all
test('desktop opening condition and clicking all', async () => {
  doRender();
  setWide();
  fireEvent.click(screen.getAllByTestId('KeyboardArrowDownIcon')[0]);
  // console.log(screen.getAllByTestId('RadioButtonCheckedIcon'));
  fireEvent.click(screen.getAllByTestId('RadioButtonCheckedIcon')[0]);
});

// desktop condition and clicking used
test('desktop opening condition and clicking used', async () => {
  doRender();
  setWide();
  fireEvent.click(screen.getAllByTestId('KeyboardArrowDownIcon')[0]);
  // console.log(screen.getAllByTestId('RadioButtonCheckedIcon'));
  fireEvent.click(screen.getAllByTestId('RadioButtonCheckedIcon')[2]);
});

// desktop and clicking shipping
test('desktop opening delivery and clicking shipping', async () => {
  doRender();
  setWide();
  fireEvent.click(screen.getAllByTestId('KeyboardArrowDownIcon')[1]);
  // console.log(screen.getAllByTestId('RadioButtonCheckedIcon'));
  fireEvent.click(screen.getAllByTestId('RadioButtonCheckedIcon')[1]);
});

// desktop and clicking local pickup
test('desktop opening delivery and clicking local', async () => {
  doRender();
  setWide();
  fireEvent.click(screen.getAllByTestId('KeyboardArrowDownIcon')[1]);
  // console.log(screen.getAllByTestId('RadioButtonCheckedIcon'));
  fireEvent.click(screen.getAllByTestId('RadioButtonCheckedIcon')[2]);
});

// desktop and clicking local pickup
test('desktop opening delivery and clicking all', async () => {
  doRender();
  setWide();
  fireEvent.click(screen.getAllByTestId('mobile filter pop')[0]);
  fireEvent.click(screen.getAllByTestId('KeyboardArrowDownIcon')[1]);
  // console.log(screen.getAllByTestId('RadioButtonCheckedIcon'));
  fireEvent.click(screen.getAllByTestId('RadioButtonCheckedIcon')[0]);
});
