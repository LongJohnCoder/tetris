import React from 'react'
import styles from '../styles.scss'

export default class HelpView extends React.PureComponent {
  render () {
    const {bus} = this.props

    return (
      <div className={styles.modal}>
        <h1>How to Play</h1>

        <p>The goal of Tetris is to score as many points as possible by
        clearing horizontal lines of blocks. The player must rotate, move, and
        drop the falling tetriminos inside the playfield. Lines are cleared when
        they are filled with blocks and have no empty spaces.</p>

        <p>As lines are cleared, the level increases and tetriminos fall
        faster, making the game progressively more challenging. If the blocks
        land above the top of the playfield, then the game is over.</p>

        <dl>
          <dt>LEFT</dt>
          <dd>Move the falling tetromino left.</dd>

          <dt>RIGHT</dt>
          <dd>Move the falling tetromino right.</dd>

          <dt>DOWN</dt>
          <dd>Move the falling tetromino down (soft drop).</dd>

          <dt>Z</dt>
          <dd>Rotate the falling tetromino left.</dd>

          <dt>X/UP</dt>
          <dd>Rotate the falling tetromino right.</dd>

          <dt>C</dt>
          <dd>Store the falling tetromino for later use.</dd>

          <dt>SPACE</dt>
          <dd>Drop the falling tetromino to the bottom of the playfield and lock it immediately (hard drop).</dd>

          <dt>RETURN</dt>
          <dd>Drop the falling tetromino to the bottom of the playfield, but don't lock it (firm drop).</dd>
        </dl>

        <h1>Credits</h1>

        <p>Copyright © 2018 Josh Bassett</p>

        <p className={styles.center}><button onClick={() => bus.emit('pause')}>Resume</button></p>
      </div>
    )
  }
}
