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

clean:
	rm -rf solr-js
	rm -rf dist