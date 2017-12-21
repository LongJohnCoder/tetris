/**
 * A `Tetrion` controls the game state according to the rules of Tetris.
 */
export default class Tetrion {
  constructor () {
  }

  /**
   * Moves the falling piece left.
   */
  moveLeft () {
    console.log('moveLeft')
  }

  /**
   * Moves the falling piece right.
   */
  moveRight () {
    console.log('moveRight')
  }

  /**
   * Moves the falling piece down.
   */
  moveDown () {
  }

  /**
   * Rotates the falling piece left.
   */
  rotateLeft () {
  }

  /**
   * Rotates the falling piece right.
   */
  rotateRight () {
  }

  /**
   * Moves the falling piece down.
   */
  softDrop () {
  }

  /**
   * Moves the falling piece to the bottom of the playfield.
   */
  firmDrop () {
  }

  /**
   * Moves the falling piece to the bottom of the playfield and immediately locks it.
   */
  hardDrop () {
  }
}
