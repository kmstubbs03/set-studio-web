const fs = require('fs');
let code = fs.readFileSync('index.html', 'utf8');

code = code.replace(/lash cluster subscriptions/g, 'lash extensions subscriptions');
code = code.replace(/lash clusters/g, 'lash extensions');

fs.writeFileSync('index.html', code);
