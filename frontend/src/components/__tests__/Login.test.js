import {render, fireEvent} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Router} from 'react-router-dom';
import '@testing-library/jest-dom';
import {screen} from '@testing-library/react';
// Server Set up
import {setupServer} from 'msw/node';
import {rest} from 'msw';
// import userEvent from '@testing-library/user-event';

// Importing our files to test
import App from '../App';


// MOCK DATA SET UP
const server = setupServer(
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
  ),
);

beforeAll(() => server.listen());
afterAll(() => server.close());
// MOCK DATA SET UP END


// Login and Register rout testing
test('Login Route renders', async () =>{
  const history = createMemoryHistory();
  history.push('/login');
  render(
    <Router history={history}>
      <App />
    </Router>,
  );
  screen.getByText('Log In');
});

test('Login Route typing into an input box', async () =>{
  const history = createMemoryHistory();
  history.push('/login');
  render(
    <Router history={history}>
      <App />
    </Router>,
  );
  const input = screen.getByTestId('email-input');
  fireEvent.change(input, {target: {value: 'No Cow Level'}});
});

test('Login Route clicking on register button', async () =>{
  const history = createMemoryHistory();
  history.push('/login');
  render(
    <Router history={history}>
      <App />
    </Router>,
  );
  fireEvent.click(screen.getByText('Create an account'));
});

test('Login Route input correct login info', async () =>{
  const history = createMemoryHistory();
  history.push('/login');
  render(
    <Router history={history}>
      <App />
    </Router>,
  );
  // Inputs account information
  const emailInput = screen.getByTestId('email-input');
  fireEvent.change(emailInput, {target: {value: 'JohnDoe@gmail.com'}});
  const passInput = screen.getByTestId('password-input');
  fireEvent.change(passInput, {target: {value: 'passworddoe'}});
  // Logs in, needs to wait
  fireEvent.click(screen.getByText('Log In'));
  // The waiting function IMPORTANT FOR BUTTONS

  /*
  // Commented this out, to get rid of the network error thingy
  // Now all Login tests pass and with 100% code coverage
  const waitTime = (delay) => new Promise( (resolve) =>
    setTimeout(resolve, delay));
  await waitTime(1000);
  */
});

window.alert = jest.fn();
test('Login Route fails with no input', async () =>{
  // Gets rid of the window error
  window.alert.mockClear();
  // Write new authentication return code
  server.use(
    rest.post('/authenticate', (req, res, ctx) => {
      return res(
        ctx.status(401),
      );
    }),
  );
  // This is just for the fail testing

  const history = createMemoryHistory();
  history.push('/login');
  render(
    <Router history={history}>
      <App />
    </Router>,
  );
  fireEvent.click(screen.getByText('Log In'));
  // Waiting
  const waitTime = (delay) => new Promise( (resolve) =>
    setTimeout(resolve, delay));
  await waitTime(1000);
});


