import { registerInstrumentations } from '@opentelemetry/instrumentation';
import {
  WebTracerProvider,
  ConsoleSpanExporter,
  SimpleSpanProcessor,
  BatchSpanProcessor,
} from '@opentelemetry/sdk-trace-web';
import { getWebAutoInstrumentations } from '@opentelemetry/auto-instrumentations-web';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { Resource } from '@opentelemetry/resources';
import { B3Propagator } from '@opentelemetry/propagator-b3';
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions';

const resource = Resource.default().merge(
  new Resource({
    [SemanticResourceAttributes.SERVICE_NAME]: 'signoz-angular-native',
    [SemanticResourceAttributes.SERVICE_VERSION]: '0.1.0',
  })
);

const provider = new WebTracerProvider({ resource });

provider.addSpanProcessor(new SimpleSpanProcessor(new ConsoleSpanExporter()));

provider.addSpanProcessor(
  new BatchSpanProcessor(
    new OTLPTraceExporter({
      url: 'https://ingest.us.signoz.cloud:443/v1/traces',
      headers: {
        'signoz-access-token': 'XXX',
      },
    })
  )
);

provider.register({
  propagator: new B3Propagator(),
});

registerInstrumentations({
  instrumentations: [
    getWebAutoInstrumentations({
      '@opentelemetry/instrumentation-document-load': {
        enabled: false,
      },
      '@opentelemetry/instrumentation-user-interaction': {
        enabled: false,
      },
      '@opentelemetry/instrumentation-fetch': {
        propagateTraceHeaderCorsUrls: /.+/,
        enabled: false,
      },
      '@opentelemetry/instrumentation-xml-http-request': {
        enabled: false,
        propagateTraceHeaderCorsUrls: /.+/,
      },
    }),
  ],
});
