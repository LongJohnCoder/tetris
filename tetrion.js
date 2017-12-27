import Bag from './bag'
import Playfield from './playfield'
import Tetromino from './tetromino'
import Vector from './vector'
import log from './log'
import {copy, whereAny} from 'fkit'

/**
 * Collides the given tetromino with the playfield.
 *
 * Returns true if the given tetromino collides with any other blocks in the
 * playfield or is outside the bounds of the playfield, false otherwise.
 *
 * @returns A boolean value.
 */
function collide (tetromino, playfield) {
  const collideBlock = b => playfield.blocks.some(a => a.x === b.x && a.y === b.y)
  const isOutside = b => b.x < 0 || b.x >= Playfield.WIDTH || b.y < 0 || b.y >= Playfield.HEIGHT + 2
  return tetromino.blocks.some(whereAny([collideBlock, isOutside]))
}

/**
 * Drops the given tetromino to the bottom of the playfield.
 */
function drop (tetromino, playfield) {
  const t = Vector.down
  while (!collide(tetromino.transform(t), playfield)) {
    tetromino = tetromino.transform(t)
  }
  return tetromino
}

/**
 * A tetrion controls the game state according to the rules of Tetris.
 */
export default class Tetrion {
  constructor () {
    this.bag = new Bag()
    this.fallingPiece = null
    this.ghostPiece = null
    this.playfield = new Playfield()
  }

  /**
   * Returns true if the falling piece can move down, false otherwise.
   */
  get canMoveDown () {
    return !collide(this.fallingPiece.transform(Vector.down), this.playfield)
  }

  /**
   * Spawns a new falling piece.
   *
   * @returns A new tetrion.
   */
  spawn () {
    log.info('spawn')
    const {bag, shape} = this.bag.shift()
    const fallingPiece = new Tetromino(shape)
    const ghostPiece = drop(fallingPiece, this.playfield)
    return copy(this, {bag, fallingPiece, ghostPiece})
  }

  /**
   * Moves the falling piece left.
   *
   * @returns A new tetrion.
   */
  moveLeft () {
    log.info('moveLeft')
    return this.transform(Vector.left)
  }

  /**
   * Moves the falling piece right.
   *
   * @returns A new tetrion.
   */
  moveRight () {
    log.info('moveRight')
    return this.transform(Vector.right)
  }

  /**
   * Moves the falling piece down.
   *
   * @returns A new tetrion.
   */
  moveDown () {
    log.info('moveDown')
    return this.transform(Vector.down)
  }

  /**
   * Rotates the falling piece left.
   *
   * @returns A new tetrion.
   */
  rotateLeft () {
    log.info('rotateLeft')
    return this.transform(Vector.rotateLeft)
  }

  /**
   * Rotates the falling piece right.
   *
   * @returns A new tetrion.
   */
  rotateRight () {
    log.info('rotateRight')
    return this.transform(Vector.rotateRight)
  }

  /**
   * Moves the falling piece down.
   *
   * @returns A new tetrion.
   */
  softDrop () {
    log.info('softDrop')
    return this.transform(Vector.down)
  }

  /**
   * Moves the falling piece to the bottom of the playfield.
   *
   * @returns A new tetrion.
   */
  firmDrop () {
    log.info('firmDrop')
    const fallingPiece = drop(this.fallingPiece, this.playfield)
    return copy(this, {fallingPiece})
  }

  /**
   * Moves the falling piece to the bottom of the playfield and immediately
   * locks it.
   *
   * @returns A new tetrion.
   */
  hardDrop () {
    log.info('hardDrop')
    const fallingPiece = drop(this.fallingPiece, this.playfield)
    const playfield = this.playfield.lock(fallingPiece)
    return copy(this, {fallingPiece: null, playfield})
  }

  /**
   * Locks the given tetromino into the playfield and clears any completed
   * rows.
   *
   * @returns A new tetrion.
   */
  lock () {
    log.info('lock')

    if (collide(this.fallingPiece, this.playfield)) {
      throw new Error('Cannot lock falling piece')
    }

    const playfield = this.playfield.lock(this.fallingPiece)
    return copy(this, {fallingPiece: null, playfield})
  }

  /**
   * Applies the given transform `t` to the falling piece.
   *
   * @returns A new tetrion.
   */
  transform (t) {
    log.info(`transform: ${t}`)

    // Try to find a wall kick transform that can be applied without colliding
    // with the playfield.
    const u = this.fallingPiece.calculateWallKickTransforms(t).find(u => {
      const fallingPiece = this.fallingPiece.transform(u)
      return !collide(fallingPiece, this.playfield)
    })

    if (u) {
      const fallingPiece = this.fallingPiece.transform(u)
      const ghostPiece = drop(fallingPiece, this.playfield)
      return copy(this, {fallingPiece, ghostPiece})
    } else {
      return this
    }
  }

  toString () {
    return `Tetrion (playfield: ${this.playfield}, fallingPiece: ${this.fallingPiece})`
  }
}
