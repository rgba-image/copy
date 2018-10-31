import { SourceToDest } from '@rgba-image/common'

export const copy: SourceToDest = ( source: ImageData, dest: ImageData, sx = 0, sy = 0, sw = source.width - sx, sh = source.height - sy, dx = 0, dy = 0 ) => {
  sx = sx | 0
  sy = sy | 0
  sw = sw | 0
  sh = sh | 0
  dx = dx | 0
  dy = dy | 0

  const sourceData = new Uint32Array( source.data.buffer )
  const destData = new Uint32Array( dest.data.buffer )
  const sourceSize = source.width * source.height
  const destSize = dest.width * dest.height

  for ( let y = 0; y < sh; y++ ) {
    for ( let x = 0; x < sw; x++ ) {
      const sourceX = sx + x
      const sourceY = sy + y
      const index = sourceY * source.width + sourceX

      if ( index >= sourceSize ) continue

      const destX = dx + x
      const destY = dy + y
      const destIndex = destY * dest.width + destX

      if ( destIndex >= destSize ) continue

      destData[ destIndex ] = sourceData[ index ]
    }
  }
}
