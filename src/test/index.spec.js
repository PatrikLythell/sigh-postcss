import _ from 'lodash'
import Promise from 'bluebird'
import { Bacon } from 'sigh-core'
import Event from 'sigh/lib/Event'

import postcss from '../'

require('source-map-support').install()
require('chai').should()

describe('sigh-test', () => {
  it('should parse a css file', () => {
    var data = ".blue { color: blue; }"
    var event = new Event({
      basePath: 'root',
      path: 'root/subdir/file.css',
      type: 'add',
      data
    })
    var stream = Bacon.constant([ event ])
    return postcss({ stream }).toPromise(Promise).then(events => {
      event.data.should.equal( ".blue { color: blue; " )
    })
  })

  it('should accept plugins', () => {
    var data = "$blue: #056ef0; .blue { color: $blue; }"
    var simplevars = require('postcss-simple-vars');
    var event = new Event({
      basePath: 'root',
      path: 'root/subdir/file.css',
      type: 'add',
      data
    })
    var stream = Bacon.constant([ event ])
    return postcss({ stream }, simplevars).toPromise(Promise).then(events => {
      event.data.should.equal( ".blue { color: #056ef0; " )
    })
  })
})
