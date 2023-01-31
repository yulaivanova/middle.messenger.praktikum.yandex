// eslint-disable-next-line no-shadow
enum METHODS {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

interface RequestOptions {
  headers?: {[key: string]:string};
  timeout?: number;
  method?:string;
  data?:{[key: string]:string};
}

function queryStringify(data: any = {}) {
  if (typeof data !== 'object') {
    throw new Error('Data must be object');
  }

  const keys = Object.keys(data);
  return keys.reduce((result, key, index) => {
    return `${result}${key}=${data[key]}${index < keys.length - 1 ? '&' : ''}`;
  }, '?');
}

type HTTPMethod = (url: string, options: RequestOptions) => Promise<unknown>;

export class HTTPTransport {
  get: HTTPMethod = (url, options) => {
    return this.request(url, {...options, method: METHODS.GET}, options.timeout);
  };

  post: HTTPMethod = (url, options) => {
    return this.request(url, {...options, method: METHODS.POST}, options.timeout);
  };

  put: HTTPMethod = (url, options) => {
    return this.request(url, {...options, method: METHODS.PUT}, options.timeout);
  };

  delete: HTTPMethod = (url, options) => {
    return this.request(url, {...options, method: METHODS.DELETE}, options.timeout);
  };

  request = (url:string, options:RequestOptions = {}, timeout = 5000) => {
    const {headers = {}, method, data} = options;

    return new Promise(function (resolve, reject) {
      if (!method) {
        reject('No method');
        return;
      }

      const xhr = new XMLHttpRequest();
      xhr.withCredentials = true;
      const isGet = method === METHODS.GET;

      xhr.open(
          method,
          isGet && !!data
            ? `${url}${queryStringify(data)}`
            : url,
          true
      );

      Object.keys(headers).forEach((key) => {
        xhr.setRequestHeader(key, headers[key]);
      });

      xhr.onload = function () {
        if (xhr.getResponseHeader('Content-Type')?.includes('image')) {
          resolve(xhr.responseURL);
        } else {
          const isJson = xhr.response !== 'OK';
          const response = isJson ? JSON.parse(xhr.response) : null;
          resolve(response);
        }
      };

      xhr.onabort = reject;
      xhr.onerror = reject;

      xhr.timeout = timeout;
      xhr.ontimeout = reject;

      if (isGet || !data) {
        xhr.send();
      } else {
        xhr.send(data);
      }
    });
  };
}
