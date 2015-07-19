import _ from 'lodash'
import Promise from 'bluebird'
import { Bacon } from 'sigh-core'
import { mapEvents } from 'sigh-core/lib/stream'

var postcss = require('postcss');

export default function(op, opts = []) {
  if (_.isFunction(opts)) opts = [opts];
  opts.filter(function(plugin) {
    return _.isFunction(plugin)
  })
  return mapEvents(op.stream, function(event) {
    if (event.type !== 'add' && event.type !== 'change')
      return event

    if (event.fileType !== 'css')
      return event

    var processor = postcss(opts)
    var result = processor.process(event.data, {
        from: event.path,
        map: {inline: false}
    });

    event.data = result.css
    event.map = result.map.toString()

    return event

  })
}
