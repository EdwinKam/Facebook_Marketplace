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
  rest.post('/v0/users', (req, res, ctx) => {
    return res(
      ctx.status(201),
    );
  },
  ));

beforeAll(() => server.listen());
afterAll(() => server.close());
// MOCK DATA SET UP END

// Register route testing
test('Register Route renders', async () =>{
  const history = createMemoryHistory();
  history.push('/register');
  render(
    <Router history={history}>
      <App />
    </Router>,
  );
  screen.getByText('Already have an account?');
});

test('Register Succeeds', async () =>{
  const history = createMemoryHistory();
  history.push('/register');
  render(
    <Router history={history}>
      <App />
    </Router>,
  );
  fireEvent.click(screen.getByText('Register'));
  const waitTime = (delay) => new Promise( (resolve) =>
    setTimeout(resolve, delay));
  await waitTime(1000);
});

test('Register InputFields', async () =>{
  const history = createMemoryHistory();
  history.push('/register');
  render(
    <Router history={history}>
      <App />
    </Router>,
  );
  const firstNameInput = screen.getByTestId('firstName-input');
  fireEvent.change(firstNameInput, {target: {value: 'wakawowa'}});
  const lastNameInput = screen.getByTestId('lastName-input');
  fireEvent.change(lastNameInput, {target: {value: 'wakawaka'}});
  const emailInput = screen.getByTestId('email-input');
  fireEvent.change(emailInput, {target: {value: 'woaowa@gmail.com'}});
  const passInput = screen.getByTestId('password-input');
  fireEvent.change(passInput, {target: {value: 'passworddoe'}});
  const waitTime1 = (delay) => new Promise( (resolve) =>
    setTimeout(resolve, delay));
  await waitTime1(1000);
  // Click on register and wait for a while
  fireEvent.click(screen.getByText('Register'));
  const waitTime = (delay) => new Promise( (resolve) =>
    setTimeout(resolve, delay));
  await waitTime(1000);
});

test('Register Fails', async () =>{
  server.use(
    rest.post('/v0/users', (req, res, ctx) => {
      return res(
        ctx.status(400),
      );
    },
    ));

  const history = createMemoryHistory();
  history.push('/register');
  render(
    <Router history={history}>
      <App />
    </Router>,
  );
  fireEvent.click(screen.getByText('Register'));
  const waitTime = (delay) => new Promise( (resolve) =>
    setTimeout(resolve, delay));
  await waitTime(1000);
});
