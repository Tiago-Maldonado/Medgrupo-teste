import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injector } from '@angular/core';
import { RequestMethodEnum } from '../enums/request-method.enum';
import { BackendUrl } from '../constants/localhost.constant';
import { GERAL_MENSAGENS } from '../messages/geral.messages';
import { Router } from '@angular/router';

interface IAdditionalHeaders {
	[key: string]: string;
}

export abstract class ApiBase {
	protected _httpClient: HttpClient;

	protected __router: Router;

	protected _url = BackendUrl.Url;

	constructor(@Inject(Injector) injector: Injector) {
		this._httpClient = injector.get(HttpClient);
		this.__router = injector.get(Router);
	}

	private __urlParams(url: string, params: { [key: string]: string }) {
		let conector = '?';
		for (const key in params) {
			url += conector + key + '=' + params[key];
			conector = '&';
		}
		return url;
	}

	protected _successHandler(res: any): any {
		if (res) {
			return res;
		} else {
			throw new Error(GERAL_MENSAGENS.FalhaRequisição);
		}
	}

	protected _errorHandler(error: any) {
		if (error.error.errors) {
			throw error.error.errors.toString();
		} else {
			throw GERAL_MENSAGENS.FalhaRequisição;
		}
	}

	protected async _request<T>(
		method: string,
		body?: any,
		requestMethod = RequestMethodEnum.POST,
		additionalHeaders?: IAdditionalHeaders,
	): Promise<T> {
		let customHeaders: any = {
			'Content-Type': 'application/json',
		};

		customHeaders = Object.assign({}, additionalHeaders, customHeaders);

		const httpOptions = { headers: new HttpHeaders(customHeaders) };

		let url = `${this._url}/${method}`;

		let request: Promise<any>;

		switch (requestMethod) {
			case RequestMethodEnum.GET:
				url = this.__urlParams(url, body);

				request = this._httpClient.get(url, httpOptions).toPromise();
				break;

			case RequestMethodEnum.DELETE:
				request = this._httpClient.delete(url, httpOptions).toPromise();
				break;

			case RequestMethodEnum.PUT:
				request = this._httpClient.put(url, body, httpOptions).toPromise();
				break;

			case RequestMethodEnum.POST:
				request = this._httpClient.post(url, body, httpOptions).toPromise();
				break;

			default:
				throw new Error('Método ' + requestMethod + ' inválido');
		}

		let response: any;

		try {
			response = await request;
		} catch (error) {
			this._errorHandler(error);
		}

		return this._successHandler(response);
	}

	protected async _get<T>(method: string, body?: any, additionalHeaders?: IAdditionalHeaders): Promise<T> {
		return this._request<T>(method, body, RequestMethodEnum.GET, additionalHeaders);
	}

	protected async _post<T>(method: string, body?: any, additionalHeaders?: IAdditionalHeaders): Promise<T> {
		return this._request<T>(method, body, RequestMethodEnum.POST, additionalHeaders);
	}

	protected async _put<T>(method: string, body?: any, additionalHeaders?: IAdditionalHeaders): Promise<T> {
		return this._request<T>(method, body, RequestMethodEnum.PUT, additionalHeaders);
	}

	protected async _delete<T>(method: string, body?: any, additionalHeaders?: IAdditionalHeaders): Promise<T> {
		return this._request<T>(method, body, RequestMethodEnum.DELETE, additionalHeaders);
	}
}