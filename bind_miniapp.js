const { execFileSync } = require('child_process');

const body = '{"EnvId":"haiyuanhui888888-d1eqfjyea6385c6","BindType":"miniApp","MiniAppId":"wx435b0c5955ef168f"}';

const result = execFileSync('npx.cmd', ['tcb', 'api', 'tcb', 'BindEnv', '--body', body, '--json'], {
  cwd: __dirname,
  encoding: 'utf-8'
});
console.log(result);