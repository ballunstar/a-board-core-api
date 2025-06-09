import _ from 'config';
import { ConfigInterface } from './config.interface';

const config: ConfigInterface = {
  database: _.get('database'),
  redis: _.get('redis'),
  mongo: _.get('mongo'),
  inboundInterceptor: _.get('inboundInterceptor'),
  credential: _.get('credential'),
  storage: _.get('storage'),
  serviceAccount: _.get('serviceAccount'),
};

function get() {
  return config;
}

export default { get };
