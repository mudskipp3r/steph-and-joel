import React from 'react'
import styles from './PrimaryButton.module.css'

function PrimaryButton({children}) {
  return (
    <button className={styles.wrapper}>{children}</button>
  )
}

export default PrimaryButton