import { defineEnvSchema } from 'typed-env-safe';

const Env = defineEnvSchema({
    NODE_ENV: {
        type: 'enum',
        values: ['development', 'production'],
        default: 'development',
    },
    PORT: {
        type: 'number',
        default: 3000,
    }
});

export default Env;