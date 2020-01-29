init:
	npm install
	git clone https://github.com/ethsearch/solr-js.git

update:
	git fetch origin master
	git rebase origin/master

dev: clean init
	npm run dev

prod: clean init
	npm run build
	ln -s dist/index.html index.html
	ln -s dist/main.js main.js

clean:
	rm -rf solr-js
	rm -rf dist
	rm -f index.html main.js