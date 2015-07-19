# sigh-postcss

[![Circle CI](https://circleci.com/gh/PatrikLythell/sigh-postcss.svg?style=svg)](https://circleci.com/gh/PatrikLythell/sigh-postcss)

Sigh plugin for [postcss](https://github.com/postcss/postcss). Use in your Sigh.js pipelines and send in whatever postcss-plugins you like.

Does NOT run in the Sigh process pool because of plugin injection functionality.

## Example

`npm install --save-dev sigh-postcss` then add something like this to your `sigh.js`:

```javascript
	pipeline.js = [
		glob({ basePath: 'src' }, '**/*.css'),
		postcss( [require('postcss-simple-vars')] ),
		write('build/assets')
	]
```
