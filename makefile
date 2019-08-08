INDEX = "index.js"
ESLINT_FILES = "**/*.js"
PRETTIER_FILES = "**/*.{js,json,md}"

DONE = echo [fresh] ✓ $@ done

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
	npm run eslint -- $(ESLINT_FILES)
	$(DONE)

format:
	npm run prettier -- --write $(PRETTIER_FILES)
	$(DONE)

test:
	npm run jest
	$(DONE)

start:
	node $(INDEX)
	$(DONE)
