SRC_FILES := manifest.json background.js options.html options.js icons/

.PHONY: all
all: dist/tabcloser.xpi

.PHONY: clean
clean:
	@rm -f dist/tabcloser.zip dist/tabcloser.xpi

dist/tabcloser.xpi: $(SRC_FILES)
	@mkdir -p dist
	@zip -r dist/tabcloser.zip $(SRC_FILES)
	@mv dist/tabcloser.zip dist/tabcloser.xpi
	@ls dist/tabcloser.xpi
