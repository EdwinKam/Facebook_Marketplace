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
  setWidth(950);
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
// mobile filter
test('mobile filter', async ()=>{
  const history = createMemoryHistory();
  render(
    <Router history={history}>
      <Categories/>,
    </Router>,
  );
  setNarrow();
  fireEvent.click(screen.getAllByTestId('mobile filter pop')[0]);
  fireEvent.click(screen.getAllByTestId('mobile filter pop close')[0]);
});
// mobile filter
test('mobile condition new', async ()=>{
  const history = createMemoryHistory();
  render(
    <Router history={history}>
      <Categories/>,
    </Router>,
  );
  fireEvent.click(screen.getAllByTestId('mobile filter pop')[0]);
  const down = screen.getAllByTestId('KeyboardArrowDownIcon');
  fireEvent.click(down[2]);
  const radioButton = screen.getAllByTestId('RadioButtonCheckedIcon');
  fireEvent.click(radioButton[1]);
});
test('mobile condition all', async ()=>{
  const history = createMemoryHistory();
  render(
    <Router history={history}>
      <Categories/>,
    </Router>,
  );
  setNarrow();
  fireEvent.click(screen.getAllByTestId('mobile filter pop')[0]);
  const down = screen.getAllByTestId('KeyboardArrowDownIcon');
  fireEvent.click(down[2]);
  const radioButton = screen.getAllByTestId('RadioButtonCheckedIcon');
  fireEvent.click(radioButton[0]);
});
test('mobile condition used', async ()=>{
  const history = createMemoryHistory();
  render(
    <Router history={history}>
      <Categories/>,
    </Router>,
  );
  setNarrow();
  fireEvent.click(screen.getAllByTestId('mobile filter pop')[0]);
  const down = screen.getAllByTestId('KeyboardArrowDownIcon');
  fireEvent.click(down[2]);
  const radioButton = screen.getAllByTestId('RadioButtonCheckedIcon');
  fireEvent.click(radioButton[2]);
});
test('mobile deliver all', async ()=>{
  const history = createMemoryHistory();
  render(
    <Router history={history}>
      <Categories/>,
    </Router>,
  );
  setNarrow();
  fireEvent.click(screen.getAllByTestId('mobile filter pop')[0]);
  const down = screen.getAllByTestId('KeyboardArrowDownIcon');
  fireEvent.click(down[3]);
  const radioButton = screen.getAllByTestId('RadioButtonCheckedIcon');
  fireEvent.click(radioButton[0]);
});
test('mobile deliver shipping', async ()=>{
  const history = createMemoryHistory();
  render(
    <Router history={history}>
      <Categories/>,
    </Router>,
  );
  setNarrow();
  fireEvent.click(screen.getAllByTestId('mobile filter pop')[0]);
  const down = screen.getAllByTestId('KeyboardArrowDownIcon');
  fireEvent.click(down[3]);
  const radioButton = screen.getAllByTestId('RadioButtonCheckedIcon');
  fireEvent.click(radioButton[1]);
});
test('mobile deliver local', async ()=>{
  const history = createMemoryHistory();
  render(
    <Router history={history}>
      <Categories/>,
    </Router>,
  );
  setNarrow();
  fireEvent.click(screen.getAllByTestId('mobile filter pop')[0]);
  const down = screen.getAllByTestId('KeyboardArrowDownIcon');
  fireEvent.click(down[3]);
  const radioButton = screen.getAllByTestId('RadioButtonCheckedIcon');
  fireEvent.click(radioButton[2]);
});
// clicking on all breadcrumbs
// test('click on all breadcrumbs', async ()=>{
//   const history = createMemoryHistory();
//   render(
//     <Router history={history}>
//       <Categories/>,
//     </Router>,
//   );
//   const bread = screen.getAllByTestId('all breadcrumbs');
//   fireEvent.click(bread[0]);
//   const waitTime = (delay) => new Promise( (resolve) =>
//     setTimeout(resolve, delay));
//   await waitTime(2000);
// });
// clicking on electronics cateogry and then breadcrumbs
// clicking on apparel cateogry
// test('clicking on apparel', async ()=> {
//   const history = createMemoryHistory();
//   render(
//     <Router history={history}>
//       <Categories/>,
//     </Router>,
//   );
//   setNarrow();
//   const appa = screen.getAllByTestId('all categories fab');
//   fireEvent.click(appa[0]);
//   const waitTime = (delay) => new Promise( (resolve) =>
//     setTimeout(resolve, delay));
//   await waitTime(2000);
//   fireEvent.click(screen.getAllByTestId('mobile drawer close'));
//   // fireEvent.click(await waitFor(() => screen.getByText(
//   //   screen.getAllByTestId('subcat breadcrumb')[0])));
//   // await waitTime(2000);
// });
// clickingn electronics and then cell phones on mobile
// test('clicking on electronics on mobile', async ()=> {
//   const history = createMemoryHistory();
//   render(
//     <Router history={history}>
//       <App/>,
//     </Router>,
//   );
//   setNarrow();
//   const elec = screen.getAllByTestId('PhoneAndroidIcon');
//   fireEvent.click(elec[1]);
//   const waitTime = (delay) => new Promise( (resolve) =>
//     setTimeout(resolve, delay));
//   await waitTime(2000);
//   fireEvent(screen.getAllByDisplayValue('cell phones'));
// });
// test to see if app renders
test('App renders', async () => {
  const history = createMemoryHistory();
  render(
    <Router history={history}>
      <Categories/>,
    </Router>,
  );
  setNarrow();
});

// clicking on new condition
test('clicking on new condition', async ()=> {
  const history = createMemoryHistory();
  render(
    <Router history={history}>
      <Categories/>,
    </Router>,
  );
  const down = screen.getAllByTestId('KeyboardArrowDownIcon');
  fireEvent.click(down[0]);
  const radioButton = screen.getAllByTestId('RadioButtonCheckedIcon');
  fireEvent.click(radioButton[1]);
});
// clicking on used condition
test('clicking on used condition', async ()=> {
  const history = createMemoryHistory();
  render(
    <Router history={history}>
      <Categories/>,
    </Router>,
  );
  const down = screen.getAllByTestId('KeyboardArrowDownIcon');
  fireEvent.click(down[0]);
  const radioButton = screen.getAllByTestId('RadioButtonCheckedIcon');
  fireEvent.click(radioButton[2]);
});
// clicking on all condition
test('clicking on all condition', async ()=> {
  const history = createMemoryHistory();
  render(
    <Router history={history}>
      <Categories/>,
    </Router>,
  );
  const down = screen.getAllByTestId('KeyboardArrowDownIcon');
  fireEvent.click(down[0]);
  const radioButton = screen.getAllByTestId('RadioButtonCheckedIcon');
  fireEvent.click(radioButton[0]);
});
// clicking on delivery
test('clicking on shipping', async ()=> {
  const history = createMemoryHistory();
  render(
    <Router history={history}>
      <Categories/>,
    </Router>,
  );
  const down = screen.getAllByTestId('KeyboardArrowDownIcon');
  fireEvent.click(down[1]);
  const radioButton = screen.getAllByTestId('RadioButtonCheckedIcon');
  fireEvent.click(radioButton[1]);
});
// clicking on delivery
test('clicking on local pickup', async ()=> {
  const history = createMemoryHistory();
  render(
    <Router history={history}>
      <Categories/>,
    </Router>,
  );
  const down = screen.getAllByTestId('KeyboardArrowDownIcon');
  fireEvent.click(down[1]);
  const radioButton = screen.getAllByTestId('RadioButtonCheckedIcon');
  fireEvent.click(radioButton[2]);
});
// clicking on all shipping
test('clicking on all shipping', async ()=> {
  const history = createMemoryHistory();
  render(
    <Router history={history}>
      <Categories/>,
    </Router>,
  );
  const down = screen.getAllByTestId('KeyboardArrowDownIcon');
  fireEvent.click(down[1]);
  const radioButton = screen.getAllByTestId('RadioButtonCheckedIcon');
  fireEvent.click(radioButton[0]);
});

// clicking on electronics
test('clicking on electronics', async ()=> {
  const history = createMemoryHistory();
  render(
    <Router history={history}>
      <Categories/>,
    </Router>,
  );
  const elec =screen.getAllByTestId('categories button');
  fireEvent.click(elec[0]);
  const waitTime = (delay) => new Promise( (resolve) =>
    setTimeout(resolve, delay));
  await waitTime(2000);
  fireEvent.click(screen.getAllByTestId('all breadcrumbs')[0]);
  // await waitTime(2000);
});
test('clicking on electronics then on cell phones', async ()=> {
  const history = createMemoryHistory();
  render(
    <Router history={history}>
      <Categories/>,
    </Router>,
  );
  const elec =screen.getAllByTestId('categories button');
  fireEvent.click(elec[0]);
  const waitTime = (delay) => new Promise( (resolve) =>
    setTimeout(resolve, delay));
  await waitTime(2000);
  const cellPhones =screen.getAllByTestId('subcat fab cell phones');
  fireEvent.click(cellPhones[0]);
  await waitTime(2000);
  // fireEvent.click(screen.getAllByTestId('all breadcrumbs')[0]);
  // await waitTime(2000);
});
// handle bread test
test('handle bread test', async ()=> {
  const history = createMemoryHistory();
  render(
    <Router history={history}>
      <Categories/>,
    </Router>,
  );
  const elec =screen.getAllByTestId('categories button');
  fireEvent.click(elec[0]);
  const waitTime = (delay) => new Promise( (resolve) =>
    setTimeout(resolve, delay));
  await waitTime(1000);
  const cellPhones =screen.getAllByTestId('subcat fab cell phones');
  fireEvent.click(cellPhones[0]);
  await waitTime(1000);
  fireEvent.click(screen.getAllByTestId('subcat breadcrumb')[0]);
  await waitTime(1000);
});
// search bar test
// test('search bar test', async () => {
//   const history = createMemoryHistory();
//   render(
//     <Router history={history}>
//       <Categories/>,
//     </Router>,
//   );
//   const search = screen.getAllByTestId('desktop search');
//   fireEvent.change(search[0], {target: {value: 'teset'}});
//   const waitTime = (delay) => new Promise( (resolve) =>
//     setTimeout(resolve, delay));
//   await waitTime(2000);
// });
// fast login bypass with correct log in
test('correct fast login bypass', async ()=> {
  server.use(
    rest.post('/authenticate', (req, res, ctx) => {
      return res(
        ctx.status(201),
        ctx.json(
          {
            name: 'John Doe',
            id: 'c8ddb501-dd12-4cbc-8cd7-b630f10020ea',
            accessToken: 'accessSmackshess',
          },
        ),
      );
    },
    ));
  const history = createMemoryHistory();
  render(
    <Router history={history}>
      <Categories/>,
    </Router>,
  );
  // Inputs account information
  const emailInput = screen.getAllByPlaceholderText('Username or email');
  fireEvent.change(emailInput[0], {target: {value: 'JohnDoe@gmail.com'}});
  const passInput = screen.getAllByPlaceholderText('Password');
  fireEvent.change(passInput[0], {target: {value: 'passworddoe'}});
  // Logs in, needs to wait
  fireEvent.click(screen.getAllByText('Log In')[0]);
  // The waiting function IMPORTANT FOR BUTTONS
  const waitTime = (delay) => new Promise( (resolve) =>
    setTimeout(resolve, delay));
  await waitTime(1000);
});
// log out test
test('logout test', async () => {
  const history = createMemoryHistory();
  render(
    <Router history={history}>
      <Categories/>,
    </Router>,
  );
  fireEvent.click(screen.getAllByText('Log Out')[0]);
});
// fast login by-pass with wrong info
test('false fast login bypass', async ()=> {
  server.use(
    rest.post('/authenticate', (req, res, ctx) => {
      return res(
        ctx.status(401),
        ctx.json(),
      );
    },
    ));
  const history = createMemoryHistory();
  render(
    <Router history={history}>
      <Categories/>,
    </Router>,
  );
  // Inputs account information
  const emailInput = screen.getAllByPlaceholderText('Username or email');
  fireEvent.change(emailInput[0], {target: {value: 'JohnDoe@gmail.com'}});
  const passInput = screen.getAllByPlaceholderText('Password');
  fireEvent.change(passInput[0], {target: {value: 'passworddoe'}});
  // Logs in, needs to wait
  fireEvent.click(screen.getAllByText('Log In')[0]);
  // The waiting function IMPORTANT FOR BUTTONS
  const waitTime = (delay) => new Promise( (resolve) =>
    setTimeout(resolve, delay));
  await waitTime(1000);
});

// mobile opening and closing filter testing
// test('mobile opening and closing filter testing', async () => {
//   const history = createMemoryHistory();
//   render(
//     <Router history={history}>
//       <Categories/>,
//     </Router>,
//   );
//   fireEvent.click(screen.getAllByTestId('FilterAltIcon')[0]);
//   const down = screen.getAllByTestId('KeyboardArrowDownIcon');
//   fireEvent.click(down[0]);
// });
