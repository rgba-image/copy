import * as assert from 'assert'
import * as fs from 'fs'
import { createImage } from '@rgba-image/create-image'
import { copy } from '..'

const patternData = new Uint8ClampedArray( fs.readFileSync( './src/test/fixtures/pattern.bin' ) )
const patternCopyData = new Uint8ClampedArray( fs.readFileSync( './src/test/fixtures/pattern-copy.bin' ) )

const pattern = createImage( 8, 8, patternData )
const patternCopy = createImage( 10, 10, patternCopyData )

describe( 'copy', () => {
  it( 'copies whole image', () => {
    const dest = createImage( 8, 8 )
    copy( pattern, dest )

    assert.deepEqual( dest, pattern )
  })

  it( 'copies regions', () => {
    const sourceTopLeft = [
      0, 0, 4, 4
    ]
    const sourceTopRight = [
      4, 0, 4, 4
    ]
    const sourceBottomLeft = [
      0, 4, 4, 4
    ]
    const sourceBottomRight = [
      4, 4, 4, 4
    ]
    const destTopLeft = [
      1, 1
    ]
    const destTopRight = [
      5, 1
    ]
    const destBottomLeft = [
      1, 5
    ]
    const destBottomRight = [
      5, 5
    ]

    const dest = createImage( 10, 10 )

    copy( pattern, dest, ...sourceTopLeft, ...destBottomRight )
    copy( pattern, dest, ...sourceTopRight, ...destBottomLeft )
    copy( pattern, dest, ...sourceBottomLeft, ...destTopRight )
    copy( pattern, dest, ...sourceBottomRight, ...destTopLeft )

    assert.deepEqual( dest, patternCopy )
  })

  it( 'does not try to copy outside of source bounds', () => {
    const dest = createImage( 8, 8 )

    copy( pattern, dest, 0, 0, 10, 10 )

    assert.deepEqual( dest, pattern )
  })

  it( 'does not try to copy outside of dest bounds', () => {
    const dest = createImage( 8, 8 )

    copy( pattern, dest )
    copy( pattern, dest, 0, 0, 8, 8, 10, 10 )

    assert.deepEqual( dest, pattern )
  } )
})