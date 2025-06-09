import { Global, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import axiosRetry from 'axios-retry';
import { RequestContext } from 'src/infrastructure/request/request.context';
// import { LogService } from 'src/application/services/log/log.service';

axiosRetry(axios, {
  retries: 5,
  shouldResetTimeout: true,
  retryDelay: axiosRetry.exponentialDelay,
  retryCondition(error) {
    console.log('retryCondition', error.code, error);

    if (['ERR_BAD_REQUEST'].includes(error.code)) {
      return false;
    }

    return true;
  },
  onRetry: (retryCount, error, requestConfig) => {
    console.log(`Retrying request attempt ${retryCount}`);
  },
});
@Global()
@Injectable()
export class AxiosService {
  constructor(
    private readonly httpService: HttpService,
    // private readonly logService: LogService, // Inject LogService to handle logging
  ) {}

  // GET method
  get<Res>(url: string, options?: AxiosRequestConfig): Observable<AxiosResponse<Res>> {
    const requestId = this.getRequestId();
    const method = 'GET';
    const query = options?.params; // Example of query params in a GET request

    return this.httpService.get<Res>(url, options).pipe(
      tap((response) => {
        this.logOutbound(requestId, method, url, response, null, null, query);
      }),
    );
  }

  // POST method
  post<Req, Res>(url: string, data: Req, options?: any): Observable<AxiosResponse<Res>> {
    const requestId = this.getRequestId();
    const method = 'POST';

    return this.httpService.post<Res>(url, data, options).pipe(
      tap((response) => {
        this.logOutbound(requestId, method, url, response, data); // Pass the body data
      }),
    );
  }

  // POST method
  postForm<Req, Res>(url: string, data: Req, options?: AxiosRequestConfig): Observable<AxiosResponse<Res>> {
    const requestId = this.getRequestId();
    const method = 'POST_FORM';

    return this.httpService.postForm<Res>(url, data, options).pipe(
      tap((response) => {
        this.logOutbound(requestId, method, url, response, data); // Pass the body data
      }),
    );
  }

  async getAsync<Res>(url: string, options?: AxiosRequestConfig): Promise<AxiosResponse<Res>> {
    const requestId = this.getRequestId();
    const method = 'GET';
    const query = options?.params; // Example of query params in a GET request

    return axios
      .get(url)
      .then((response) => {
        this.logOutbound(requestId, method, url, response, null, null, query);
        return response;
      })
      .catch((error) => {
        this.logOutbound(requestId, method, url, error, query); // Pass the body data
        return error;
      });
  }

  async postAsync<Req, Res>(url: string, data: Req, options?: any): Promise<AxiosResponse<Res>> {
    const requestId = this.getRequestId();
    const method = 'POST';

    try {
      const response = await axios.post(url, data, options);
      this.logOutbound(requestId, method, url, response, data); // Pass the body data
      return response;
    } catch (error) {
      this.logOutbound(requestId, method, url, error, data); // Pass the body data
      throw error;
    }
  }

  // PUT method
  put<Req, Res>(url: string, data: Req, options?: any): Observable<AxiosResponse<Res>> {
    const requestId = this.getRequestId();
    const method = 'PUT';

    return this.httpService.put<Res>(url, data, options).pipe(
      tap((response) => {
        this.logOutbound(requestId, method, url, response, data); // Pass the body data
      }),
    );
  }

  // PATCH method
  patch<Req, Res>(url: string, data: Req, options?: any): Observable<AxiosResponse<Res>> {
    const requestId = this.getRequestId();
    const method = 'PATCH';

    return this.httpService.patch<Res>(url, data, options).pipe(
      tap((response) => {
        this.logOutbound(requestId, method, url, response, data); // Pass the body data
      }),
    );
  }

  // DELETE method
  delete<Res>(url: string, options?: any): Observable<AxiosResponse<Res>> {
    const requestId = this.getRequestId();
    const method = 'DELETE';
    const query = options?.params; // Example of query params in DELETE request

    return this.httpService.delete<Res>(url, options).pipe(
      tap((response) => {
        this.logOutbound(requestId, method, url, response, null, null, query);
      }),
    );
  }

  // Utility method to log outbound requests
  private logOutbound(
    requestId: string,
    method: string,
    url: string,
    response: AxiosResponse<any>,
    requestData?: any, // request data can be body or query
    params?: any,
    query?: any,
  ): void {
    const logMessage = `${method} ${url} - Status: ${response.status}`;
    const logMetadata = {
      requestId,
      timestamp: new Date(),
      message: logMessage,
      url,
      statusCode: response.status,
      response: response.data,
      request: requestData,
      params: params || {}, // Add params if available
      query: query || {}, // Add query if available
    };
    console.log('--- Logging logOutbound() ---');
    console.log(logMetadata);

    // const log = new OutboundLogEntity();
    // log.createOutboundLog(logMetadata);
    // await this.logService.logOutbound(log);
  }

  // Generate a unique requestId
  private getRequestId(): string {
    return RequestContext.get('requestId') || 'unknown-request-id';
  }
}
