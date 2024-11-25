import { ALL_ENV_VARIABLES } from './constants';
export const checkAllEnvVariables = () => {
  const missedVariablesArray = ALL_ENV_VARIABLES.filter((variable) => !process.env[variable]);
  if (missedVariablesArray.length) {
    console.error(`### These env variables are missed: ${missedVariablesArray.join(', ')} ###`);
    process.exit(1);
  }
  console.info('*** All env variables are fine ***');
};
