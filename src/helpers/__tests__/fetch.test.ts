import sinon, { SinonFakeXMLHttpRequest, SinonFakeXMLHttpRequestStatic } from 'sinon';
import {HTTPTransport} from '../fetch';
import {BASE_URL} from '../../api/vars';

describe('HTTPTransport', () => {
  let xhr: SinonFakeXMLHttpRequestStatic;
  let requests: SinonFakeXMLHttpRequest[] = [];

  beforeEach(() => {
    xhr = sinon.useFakeXMLHttpRequest();
    requests = [];

    xhr.onCreate = ((request: SinonFakeXMLHttpRequest) => {
      requests.push(request);
    });
  });

  afterEach(() => {
    xhr.restore();
  });

  it('.get should send GET request', () => {
    new HTTPTransport().get(`${BASE_URL}/auth/user`, {});

    const [request] = requests;

    expect(request.method).toStrictEqual('GET');
  });

  it('.post should send POST request', () => {
    new HTTPTransport().post(`${BASE_URL}/auth/signin`, {});

    const [request] = requests;

    expect(request.method).toStrictEqual('POST');
  });

  it('.put should send PUT request', () => {
    new HTTPTransport().put(`${BASE_URL}/chats/users`, {});

    const [request] = requests;

    expect(request.method).toStrictEqual('PUT');
  });
});
