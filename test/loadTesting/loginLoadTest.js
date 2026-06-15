import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '5s', target: 10 },
    { duration: '20s', target: 30 },
    { duration: '5s', target: 0 },
  ],
  thresholds: {
    http_req_duration: ['p(95)<500'],
  },
};

const BASE_URL = 'http://localhost:3000';

const users = [
  { email: 'john@example.com', password: 'password123' },
  { email: 'jane@example.com', password: 'password456' },
  { email: 'bob@example.com', password: 'password789' },
];

export default function () {
  const user = users[Math.floor(Math.random() * users.length)];

  const payload = JSON.stringify({
    email: user.email,
    password: user.password,
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const response = http.post(`${BASE_URL}/api/login`, payload, params);

  check(response, {
    'status is 200': (r) => r.status === 200,
    'response has token': (r) => JSON.parse(r.body).token !== undefined,
    'response has user': (r) => JSON.parse(r.body).user !== undefined,
    'response message is Login successful': (r) => JSON.parse(r.body).message === 'Login successful',
  });

  sleep(1);
}
