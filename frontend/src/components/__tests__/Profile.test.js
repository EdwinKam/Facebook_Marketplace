import {render} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Router} from 'react-router-dom';
import '@testing-library/jest-dom';
// import {screen} from '@testing-library/react';
// Server Set up
import {setupServer} from 'msw/node';
import {rest} from 'msw';
// import userEvent from '@testing-library/user-event';

// Importing our files to test
import App from '../App';

const server = setupServer(
  rest.get(`/v0/userposts/c8ddb501-dd12-4cbc-8cd7-b630f10020ea`,
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json(
          {
            name: 'John Doe',
            id: 'c8ddb501-dd12-4cbc-8cd7-b630f10020ea',
            posts: 'FakePosts!',
          },
        ),
      );
    },
  ));

beforeAll(() => server.listen());
afterAll(() => server.close());

// This will also
test('Profile Route renders', async () =>{
  const history = createMemoryHistory();
  history.push('/profile');
  render(
    <Router history={history}>
      <App />
    </Router>,
  );
});

// A correct Auth respose
const authResponse = {
  'name': 'John Doe',
  'id': 'c8ddb501-dd12-4cbc-8cd7-b630f10020ea',
  'accessToken': 'fancyShmancy',
};
test('Profile with local storage user', async () =>{
  // Sets the localStorage to user
  localStorage.setItem('user',
    JSON.stringify(authResponse));

  // Goes to the profile route
  const history = createMemoryHistory();
  history.push('/profile');
  render(
    <Router history={history}>
      <App />
    </Router>,
  );

  // The waiting function IMPORTANT FOR BUTTONS
  const waitTime = (delay) => new Promise( (resolve) =>
    setTimeout(resolve, delay));
  await waitTime(1000);
});

test('Profile with throw error', async () =>{
  // Sets the localStorage to user
  localStorage.setItem('user',
    JSON.stringify(authResponse));
  // Sets the server to something faulty
  server.use(
    rest.get(`/v0/userposts/c8ddb501-dd12-4cbc-8cd7-b630f10020ea`,
      (req, res, ctx) => {
        return res(
          ctx.status(404),
        );
      },
    ),
  );
  // Goes to the profile route
  const history = createMemoryHistory();
  history.push('/profile');
  render(
    <Router history={history}>
      <App />
    </Router>,
  );

  // The waiting function IMPORTANT FOR BUTTONS
  const waitTime = (delay) => new Promise( (resolve) =>
    setTimeout(resolve, delay));
  await waitTime(1000);
});
