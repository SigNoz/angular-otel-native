# SignozAngularSample

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.1.2.

The angular 17 by default installs `Standalone` component.

`ng new signoz-angular-sample`

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Setting up Open-Telemetry Instrumentation

Create an instrument.ts file in the repository

For setting up traces for the application we need the following things :-

1. Trace Provider (this takes care of giving us the tracer factory through which we can generate traces either auto or manual)

2. Trace Exporter (this takes care of exporting the generated data to the destination end points)

3. Auto / Manual Instrumentations to generate OTEL data (actual generation of otel data)

4. Propagators to propagate `traceContext` to the down-stream services if any

In the application we are using :-

1. WebTracerProvider as the `TraceProvider`

2. `ConsoleSpanExporter` (easy debugging in dev mode) & `OTLPTraceExporter` (used in prod envs to export data) as the exporters

3. `getWebAutoInstrumentations` to generate auto instrumentations out of the box
