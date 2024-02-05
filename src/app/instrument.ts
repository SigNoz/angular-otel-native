import { registerInstrumentations } from '@opentelemetry/instrumentation';
import {
    WebTracerProvider,
    ConsoleSpanExporter,
    SimpleSpanProcessor,
    BatchSpanProcessor,
} from '@opentelemetry/sdk-trace-web';
import { getWebAutoInstrumentations } from '@opentelemetry/auto-instrumentations-web';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { B3Propagator } from '@opentelemetry/propagator-b3';
 
const provider = new WebTracerProvider();
 
provider.addSpanProcessor(new SimpleSpanProcessor(new ConsoleSpanExporter()));
 
provider.addSpanProcessor(
    new BatchSpanProcessor(
        new OTLPTraceExporter({
            url: 'http://127.0.0.1:4318/v1/traces',
        }),
    ),
);
 
provider.register({
    propagator: new B3Propagator()
    
});
 
registerInstrumentations({
    instrumentations: [
        getWebAutoInstrumentations({
            '@opentelemetry/instrumentation-document-load': {},
            '@opentelemetry/instrumentation-user-interaction': {},
            '@opentelemetry/instrumentation-fetch': {
                propagateTraceHeaderCorsUrls: /.+/,
            },
            '@opentelemetry/instrumentation-xml-http-request': {
                propagateTraceHeaderCorsUrls: /.+/,
            },
        }),
    ],
});