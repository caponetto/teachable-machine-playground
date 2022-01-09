# Teachable Machine Playground

[![CI](https://github.com/caponetto/teachable-machine-playground/actions/workflows/ci.yml/badge.svg)](https://github.com/caponetto/teachable-machine-playground/actions/workflows/ci.yml)
[![License](https://img.shields.io/github/license/caponetto/teachable-machine-playground.svg)](https://github.com/caponetto/teachable-machine-playground/blob/main/LICENSE)

## Requirements

- Node `16+`
- Yarn `1.22.10` (`npm install -g yarn@1.22.10`)
- Podman (optional)

## Install dependencies

`$ yarn install`

## Build for development

`$ yarn build:dev`

## Running for development

`$ yarn start` and then access https://localhost:9001

## Bulid for production

`$ yarn build:prod`

Artifacts will be available in the `dist` directory.

## Build the container image

`$ yarn build:prod && yarn build:image`

## License

This code is released under Apache License.

Check [LICENSE](LICENSE) file for more information.
