'use strict';

async function errorHandling (context) {
  let response;
  try {
    response = await context.next();
  } catch (error) {
    console.error(error);
    const res = JSON.stringify({
      error: 'Internal Server Error'
    });
    response = new Response(res, { status: 500 });
  }
  response.headers.set('Content-Type', 'application/json; charset=utf-8');
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Access-Control-Allow-Headers', 'Origin,Content-Type,Accept,X-API-KEY,X-SIGNATURE,X-TIMESTAMP');
  response.headers.set('Access-Control-Allow-Methods', 'GET,OPTIONS');
  return response;
}

function respondUnauthorized () {
  const res = JSON.stringify({
    error: 'Unauthorized'
  });
  return new Response(res, { status: 401 });
}

function authorization (context) {
  const { headers } = context.request;
  const headerTimestamp = headers.get('X-TIMESTAMP');
  const headerSignature = headers.get('X-SIGNATURE');
  if (!headerTimestamp || !headerSignature) {
    return respondUnauthorized();
  }
  return context.next();
}

export const onRequestGet = [
  errorHandling,
  authorization
];
