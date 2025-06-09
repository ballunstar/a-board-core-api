export interface ConfigInterface {
  database: {
    type: any | string;
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
    synchronize: boolean;
    logging: boolean;
  };
  redis: {
    host: string;
    port: number;
    password: string;
    disable: boolean;
  };
  mongo: {
    type: 'mongodb';
    host: string;
    port: number;
    database: string;
    username: string;
    password: string;
    disable: boolean;
  };
  inboundInterceptor: {
    enabled: boolean;
    target: 'mongodb' | 'mysql' | 'redis';
  };
  credential: {
    prefix: string;
    secret: string;
    expiresIn: number;
  };
  storage: {
    gcpServiceAccount: string;
    gcpBucketName: string;
    gcpBucketPath: string;
    localDirectory: string;
  };
  serviceAccount: {
    googleSheet: string;
  };
}
