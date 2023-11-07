export const configuration = () => ({
    db: {
      type: process.env.NET_FIDELITY_DATABASE_TYPE,
      host: process.env.NET_FIDELITY_DATABASE_HOST,
      port: +process.env.NET_FIDELITY_DATABASE_PORT,
      database: process.env.NET_FIDELITY_DATABASE_NAME,
      username: process.env.NET_FIDELITY_DATABASE_USER,
      password: process.env.NET_FIDELITY_DATABASE_PASSWORD,
      secretArn: process.env.NET_FIDELITY_AWS_DB_SECRET_ARN,
      resourceArn: process.env.NET_FIDELITY_AWS_DB_RESOURCE_ARN,
      schema: process.env.NET_FIDELITY_DATABASE_SCHEMA,
      region: process.env.NET_FIDELITY_AWS_DB_REGION,
      dropSchema: false,
      logging: false,
      synchronize: true//process.env.NODE_ENV === 'production' ? false : (process.env.NET_FIDELITY_AWS_DB_SYNCHRONIZE || false)
    },
    http: {
      port: process.env.NET_FIDELITY_LOM_HTTP_PORT,
      cors: {
        allowedOrigins: process.env.NET_FIDELITY_LOM_ALLOWED_ORIGINS
          ? process.env.NET_FIDELITY_LOM_ALLOWED_ORIGINS.split(',').map(o => o.trim())
          : []
      },

    },
    auth: {
      secret: process.env.NET_FIDELITY_JWT_SECRET,
    }
    // jobs: {
    //   leads:{
    //     data: {
    //       cron: process.env.LEADS_DATA_CRON_JOB
    //     },
    //     unlocker: {
    //       cron:  process.env.UNLOCKER_CRON_JOB,
    //       minMinutesDifference: 30
    //     }
    //   },
    //   emails: {
    //     cron: process.env.EMAILS_CRON_JOB
    //   }
    // }
})