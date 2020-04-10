ESLINT_FILES = "**/*.{js,ts}"
PRETTIER_FILES = "**/*.{js,json,md,ts}"
INDEX = "index.js"
BUILD = "lib"

DONE = echo [fresh] ✓ $@

.PHONY: default
default:
	echo "please enter a command..."
	$(DONE)

$(verbose).SILENT:

.PHONY: clean
clean:
	rm -rf $(BUILD)
	$(DONE)

.PHONY: wipe
wipe: clean
	rm -rf node_modules
	$(DONE)

.PHONY: install
install: wipe
	npm install
	$(DONE)

.PHONY: lint
lint:
	npm run eslint -- \
		$(ESLINT_FILES)
	$(DONE)

.PHONY: format
format:
	npm run prettier -- \
		--write $(PRETTIER_FILES)
	$(DONE)

.PHONY: test
test:
	npm run jest
	$(DONE)

.PHONY: dev
dev: clean
	npm run tsc -- \
		--watch
	$(DONE)

.PHONY: build
build: clean
	npm run tsc
	$(DONE)

.PHONY: start
start: build
	node $(INDEX)
	$(DONE)
