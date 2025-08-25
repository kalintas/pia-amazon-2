import { test, expect, request } from '@playwright/test';
// Avoid requiring @types/node by declaring process for env access in tests
declare const process: any;

// API base URL used by ApiService in the frontend. Can be overridden via env var for CI.
const API_BASE_URL = process.env.API_BASE_URL ?? 'http://localhost:8080/api';

test.describe('ApiService microservices', () => {
  test.beforeAll(async function ({}, testInfo) {
    const context = await request.newContext();
    try {
      // Probe the API by hitting a non-existent UID. Any HTTP response means the server is reachable.
      const probe = await context.get(`${API_BASE_URL}/signIn/__e2e_probe__`);
      // If network fails entirely, skip the suite.
      if (!probe) {
        testInfo.skip(true, 'API not reachable');
      }
    } catch {
      testInfo.skip(true, `API not reachable at ${API_BASE_URL}`);
    } finally {
      await context.dispose();
    }
  });

  test('signUp creates a user (or is idempotent)', async ({ request }) => {
    const uid = `e2e-${Date.now()}-${Math.floor(Math.random() * 100000)}`;
    const newUser = {
      uid,
      name: 'E2E',
      surname: 'Tester',
      email: `${uid}@example.com`,
      phoneNumber: '+10000000000'
    };

    const res = await request.post(`${API_BASE_URL}/signUp/${uid}`, {
      data: newUser
    });

    expect(res.ok()).toBeTruthy();
  });

  test('signIn returns user with expected shape', async ({ request }) => {
    const uid = `e2e-${Date.now()}-${Math.floor(Math.random() * 100000)}`;
    const userPayload = {
      uid,
      name: 'E2E',
      surname: 'Tester',
      email: `${uid}@example.com`,
      phoneNumber: '+10000000000'
    };

    // Ensure user exists first
    const create = await request.post(`${API_BASE_URL}/signUp/${uid}`, {
      data: userPayload
    });
    expect(create.ok()).toBeTruthy();

    // Then sign in
    const res = await request.get(`${API_BASE_URL}/signIn/${uid}`);
    expect(res.ok()).toBeTruthy();

    const json = await res.json();
    // Validate minimal shape expected by the frontend's User interface
    expect(json).toMatchObject({
      uid,
      name: userPayload.name,
      surname: userPayload.surname,
      email: userPayload.email,
      phoneNumber: userPayload.phoneNumber
    });
  });
});
