'use strict';

console.log()
process.on('exit', () => {
    console.log();
});

if (!process.argv[2]) {
  let error = chalk.red('[重写名]必填.')
  console.error(error);
  process.exit(1);
}

const path = require('path');
const fs = require('fs');
const chalk = require('chalk');
const overwritename = process.argv[2];
const description = process.argv[3] || '';
console.log('重写描述 => ' + description);
const fileSave = require('file-save');
const filePath = path.resolve(__dirname, '../../');
const tmp = {
  _htmltmp_: `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>${description}</title>
    <script src="../modules/my-${overwritename}/${overwritename}.js" charset="utf-8"></script>
  </head>
  <body>

  </body>
  </html>`,
  _mdtmp_: `# ${overwritename}

  >overwrite ${overwritename}() ${description}`,
  _jstmp_: `function ${overwritename}() {
  document.write('${description} success!');
}
${overwritename}();
`
}

fs.exists(`my-${overwritename}`, function (exists) {
  if (!exists) {
    fileSave(path.join(filePath, `my-${overwritename}/${overwritename}.html`))
      .write(tmp._htmltmp_, 'utf8');
    fileSave(path.join(filePath, `my-${overwritename}/README.md`))
      .write(tmp._mdtmp_);
    fileSave(path.join(filePath, `js/my-${overwritename}/${overwritename}.js`))
      .write(tmp._jstmp_);
  }
  else {
    let error = chalk.red('该重写方法已存在，请勿重新创建');
    console.log(error);
    process.exit(1);
  }
})

const success = chalk.green('DONE!')
console.log(success);
