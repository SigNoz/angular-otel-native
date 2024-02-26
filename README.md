# SignozAngularSample

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.1.2.

The angular 17 by default installs `Standalone` component.

`ng new signoz-angular-sample`

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Setting up Open-Telemetry Instrumentation

Install `@jufab/opentelemetry-angular-interceptor` which will help us configure the open telemetry SDK. (https://github.com/jufab/opentelemetry-angular-interceptor)

The interceptor helps us intercept all the HTTP calls from the system using `HttpClient` from Angular

To configure the tracer

````imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    OpenTelemetryInterceptorModule.forRoot({
      commonConfig: {
      console: true,
      production: false,
      logBody: true,
      serviceName: 'signoz-angular-app',
      probabilitySampler: '0.7',
    },
    otelcolConfig: {
      url: 'http://127.0.0.1:4318/v1/traces', //URL of opentelemetry collector
    }
    }),
    OtelColExporterModule,
    CompositePropagatorModule,
  ]```


Why the interceptor ?

This helps us avoid the task of manually setting up the Trace Provider / Samplers / Propagators / Trace Exporters

````
