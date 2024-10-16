import { trace, metrics } from '@opentelemetry/api';
import { SemanticAttributes } from '@opentelemetry/semantic-conventions';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}
  tracer = trace.getTracer('user service');
  meter = metrics.getMeter('user.service');
  getReqBody() {
    return {
      randomNumber: Math.round(Math.random() * 1000),
    };
  }
  apiGet(url: string) {
    // make sure to check the tracer here is not a noop tracer
    // check the required attributes being present in the console when using a console exporter.
    // make sure to end the span as well!
    return this.tracer.startActiveSpan('get user', (span) => {
      span.setAttribute(SemanticAttributes.CODE_LINENO, 19);
      span.setAttribute(SemanticAttributes.HTTP_METHOD, 'GET');
      span.setAttribute(
        SemanticAttributes.HTTP_USER_AGENT,
        window.navigator.userAgent
      );
      span.end();

      // this is to collect count metrics here
      const getRequestCountMetrics = this.meter.createCounter(
        'user.service.get.button.clicks'
      );
      getRequestCountMetrics.add(1);

      return this.http.get(url);
    });
  }
  apiPost(url: string) {
    return this.http.post(url, this.getReqBody());
  }
  apiPut(url: string) {
    return this.http.put(url, this.getReqBody());
  }
  apiDelete(url: string) {
    return this.http.delete(url);
  }
  apiPatch(url: string) {
    return this.http.patch(url, this.getReqBody());
  }
}
