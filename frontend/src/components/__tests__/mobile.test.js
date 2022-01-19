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
// mobile opening and closnig categories
test('mobile opening and closnig cats', async () => {
  doRender();
  setNarrow();
  fireEvent.click(screen.getAllByTestId('all categories fab')[0]);
  fireEvent.click(screen.getAllByTestId('mobile drawer close')[0]);
});

// mobile selecting a category
test('mobile selecting a category', async () => {
  doRender();
  setNarrow();
  fireEvent.click(screen.getAllByTestId('all categories fab')[0]);
  fireEvent.click(screen.getAllByTestId('categories button')[2]);
});

// mobile selection a sub cat
test('mobile selecting a sub cat', async () => {
  doRender();
  setNarrow();
  fireEvent.click(screen.getAllByTestId('all categories fab')[0]);
  fireEvent.click(screen.getAllByTestId('categories button')[2]);
  const waitTime = (delay) => new Promise( (resolve) =>
    setTimeout(resolve, delay));
  await waitTime(2000);
  fireEvent.click(screen.getAllByTestId('subcat fab cell phones')[0]);
});

// clicking "all" breadcrumbs
test('mobile click all breadcrumb', async () => {
  doRender();
  setNarrow();
  fireEvent.click(screen.getAllByTestId('all categories fab')[0]);
  fireEvent.click(screen.getAllByTestId('categories button')[2]);
  const waitTime = (delay) => new Promise( (resolve) =>
    setTimeout(resolve, delay));
  await waitTime(1000);
  fireEvent.click(screen.getAllByTestId('subcat fab cell phones')[0]);
  await waitTime(1000);
  fireEvent.click(screen.getAllByTestId('subcat breadcrumb')[1]);
  fireEvent.click(screen.getAllByTestId('subcat breadcrumb')[0]);
  await waitTime(1000);
});

// clicking cat breadcrumbs
test('mobile click cat breadcrumb', async () => {
  doRender();
  setNarrow();
  fireEvent.click(screen.getAllByTestId('all categories fab')[0]);
  fireEvent.click(screen.getAllByTestId('categories button')[2]);
  const waitTime = (delay) => new Promise( (resolve) =>
    setTimeout(resolve, delay));
  await waitTime(1000);
  fireEvent.click(screen.getAllByTestId('subcat fab cell phones')[0]);
  await waitTime(1000);
  fireEvent.click(screen.getAllByTestId('all breadcrumbs')[0]);
  await waitTime(1000);
});

// opening and then closing the filter table
test('mobile opening and closing filer', async () => {
  doRender();
  setNarrow();
  fireEvent.click(screen.getAllByTestId('mobile filter pop')[0]);
  fireEvent.click(screen.getAllByTestId('mobile filter pop close')[0]);
});

// opening condition and clicking new
test('mobile opening condition and clicking new', async () => {
  doRender();
  setNarrow();
  fireEvent.click(screen.getAllByTestId('mobile filter pop')[0]);
  fireEvent.click(screen.getAllByTestId('KeyboardArrowDownIcon')[2]);
  // console.log(screen.getAllByTestId('RadioButtonCheckedIcon'));
  fireEvent.click(screen.getAllByTestId('RadioButtonCheckedIcon')[1]);
});

// opening condition and clicking all
test('mobile opening condition and clicking all', async () => {
  doRender();
  setNarrow();
  fireEvent.click(screen.getAllByTestId('mobile filter pop')[0]);
  fireEvent.click(screen.getAllByTestId('KeyboardArrowDownIcon')[2]);
  // console.log(screen.getAllByTestId('RadioButtonCheckedIcon'));
  fireEvent.click(screen.getAllByTestId('RadioButtonCheckedIcon')[0]);
});

// opening condition and clicking used
test('mobile opening condition and clicking used', async () => {
  doRender();
  setNarrow();
  fireEvent.click(screen.getAllByTestId('mobile filter pop')[0]);
  fireEvent.click(screen.getAllByTestId('KeyboardArrowDownIcon')[2]);
  // console.log(screen.getAllByTestId('RadioButtonCheckedIcon'));
  fireEvent.click(screen.getAllByTestId('RadioButtonCheckedIcon')[2]);
});

// delivery and clicking shipping
test('mobile opening delivery and clicking shipping', async () => {
  doRender();
  setNarrow();
  fireEvent.click(screen.getAllByTestId('mobile filter pop')[0]);
  fireEvent.click(screen.getAllByTestId('KeyboardArrowDownIcon')[3]);
  // console.log(screen.getAllByTestId('RadioButtonCheckedIcon'));
  fireEvent.click(screen.getAllByTestId('RadioButtonCheckedIcon')[1]);
});

// delivery and clicking local pickup
test('mobile opening delivery and clicking local', async () => {
  doRender();
  setNarrow();
  fireEvent.click(screen.getAllByTestId('mobile filter pop')[0]);
  fireEvent.click(screen.getAllByTestId('KeyboardArrowDownIcon')[3]);
  // console.log(screen.getAllByTestId('RadioButtonCheckedIcon'));
  fireEvent.click(screen.getAllByTestId('RadioButtonCheckedIcon')[2]);
});

// delivery and clicking local pickup
test('mobile opening delivery and clicking all', async () => {
  doRender();
  setNarrow();
  fireEvent.click(screen.getAllByTestId('mobile filter pop')[0]);
  fireEvent.click(screen.getAllByTestId('KeyboardArrowDownIcon')[3]);
  // console.log(screen.getAllByTestId('RadioButtonCheckedIcon'));
  fireEvent.click(screen.getAllByTestId('RadioButtonCheckedIcon')[0]);
});

// mobile selecting a category and then a different category
test('mobile selecting a category and then different category', async () => {
  doRender();
  setWide();
  fireEvent.click(screen.getAllByTestId('categories button')[0]);
  const waitTime = (delay) => new Promise( (resolve) =>
    setTimeout(resolve, delay));
  await waitTime(2000);
  fireEvent.click(screen.getAllByTestId('categories button')[0]);
});

// teting for wrong fetch query
test('wrongn fetch query', async ()=>{
  server.use(
    rest.get(listingURL, (req, res, ctx)=>{
      return res(
        ctx.status(400),
        ctx.json([]),
      );
    }),
  );
  doRender();
});
