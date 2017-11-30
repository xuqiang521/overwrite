
.PHONY: test build

default: help

install:
	npm install

install-cn:
	npm install --registry=http://registry.npm.taobao.org

build:
	npm run build

http:
	npm run http

new:
	node build/bin/new.js $(filter-out $@,$(MAKECMDGOALS))

del:
	node build/bin/delete.js $(filter-out $@,$(MAKECMDGOALS))	

dev:
	npm run dev

# clean:
# 	rm ./dist/*.js

help:
	@echo "   \033[35mmake\033[0m \033[1m命令使用说明\033[0m"
	@echo "   \033[35mmake install\033[0m\t\033[0m\t\033[0m\t\033[0m\t---  安装依赖"
	@echo "   \033[35mmake install-cn\033[0m\t\033[0m\t\033[0m\t---  安装淘宝镜像"
	@echo "   \033[35mmake build\033[0m\t\033[0m\t\033[0m\t\033[0m\t---  脚本打包"
	@echo "   \033[35mmake new <overwrite-name> [中文名]\033[0m\t---  创建新重写方法 生成对应文件  例如 'make new test 重写test()'"
	@echo "   \033[35mmake del <overwrite-name> \033[0m\t\033[0m\t---  删除重写方法 删除对应文件  例如 'make del test'"
	@echo "   \033[35mmake dev\033[0m\t\033[0m\t\033[0m\t\033[0m\t---  开发模式"
	@echo "   \033[35mmake http\033[0m\t\033[0m\t\033[0m\t\033[0m\t---  静态服务模式"
