const fs = require('fs');
const chalk = require('chalk');
const { prompt } = require('inquirer');
const { exec } = require('child_process');

const filename = process.argv[2]

const files = {
  html_file: `src/my-${filename}/${filename}.html`,
  md_file: `src/my-${filename}/README.md`,
  js_file: `modules/my-${filename}/${filename}.js`,
}
const dirs = {
  view_dir: `src/my-${filename}`,
  js_dir: `modules/my-${filename}`
}

prompt([{
  type: 'confirm',
  name: 'cmd',
  message: 'Are you sure delete this overwrite file →',
}]).then(function (ans) {
  console.log(ans.cmd);
  if (ans.cmd) {
    deleteFile()
  }
  else {
    process.exit(0)
  }
});

function deleteFile () {
  Object.keys(files).forEach(key => {

    fs.exists(`${files[key]}`, function (exists) {

      if (exists) {
        let existFile = chalk.green(`项目中存在 ${files[key]}文件`)
        let delFile = chalk.red(`项目已删除 ${files[key]}文件`)
        console.log();
        console.log(existFile + '\n');
        console.log("delete begins...");
        // fs.unlink(files[key])
        exec(`rm ${files[key]}`, function (error, stdout, stderr) {
          if (error) {
            console.error(`exec error: ${error}`);
            return;
          }
          console.log(delFile);
        })
      }
    })
  });
  setTimeout(function () {
    deleteDirectory()
  }, 1000)

}

function deleteDirectory () {
  Object.keys(dirs).forEach(key => {
    fs.exists(`${dirs[key]}`, function (exists) {
      if (exists) {
        fs.rmdir(dirs[key], function (error) {
          if (error) {
            console.error(`exec error: ${error}`);
            return;
          }
          else {
            console.log(`delete: 100% finished`);
          }
        })
        // exec(`rmdir ${dirs[key]}`, function (error, stdout, stderr) {
        //   if (error) {
        //     console.error(`exec error: ${error}`);
        //     return;
        //   }
        //   console.log(`delete: ${stdout}100% finished`);
        // })
      }
    })
  })
}
