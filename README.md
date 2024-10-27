# tabcloser-ff
Firefox extension to close tabs

https://addons.mozilla.org/en-US/firefox/addon/tabcloser-ff/

## Development

### Building

There is a default `make` target to build the exension. It will be available at `dist/tabcloser.xpi`. To cleanup, you can run `make clean`.

### Loading Extension

You can install without building by going to <a href="about:debugging#/runtime/this-firefox"about:debugging#/runtime/this-firefox</a> and manually selecting the `manifest.json` file.

Otherwise, you can install the extension from a file by building first. You will need to be using Firefox Developer Edition and change `xpinstall.signatures.required` to False in about:config.
