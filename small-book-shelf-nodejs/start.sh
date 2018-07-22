
APP_HOME=/app/demo-bookshelf-nodejs
OUID=./bin/www3003

if [ "`ps -ef |grep $OUID |grep -v grep`" ];then
  kill -9 `ps -ef |grep $OUID |grep -v grep |awk '{print $2}'`
fi

npm install && npm start 1>${APP_HOME}/logs/std.log 2>${APP_HOME}/logs/err.log &
