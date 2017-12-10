MAKEFLAGS = -j1

JS = "**/*.js"
INDEX = "index.js"

DONE = echo ✓ $@ done

.PHONY: default \
	clean \
	wipe \
	install \
	outdated \
	lint \
	format \
	test \
	start

default:
	echo "Please enter a command..."
	$(DONE)

$(verbose).SILENT:

clean:
	rm -rf $(BUILD)
	rm -rf npm-debug.log
	$(DONE)

wipe: clean
	rm -rf node_modules
	$(DONE)

install: wipe
	npm install
	$(DONE)

outdated:
	npm outdated
	$(DONE)

lint:
	npm run eslint -- $(JS)
	$(DONE)

format:
	npm run prettier -- $(JS)
	$(DONE)

test:
	npm run jest
	$(DONE)

start:
	node $(INDEX)
	$(DONE)
