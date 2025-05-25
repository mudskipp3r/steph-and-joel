import React from 'react'
import Image from 'next/image';

function BridalPartyCard(props) {
    const {name, image, info} = props;
  return (
    <div className="card"><Image src={image} width={300} height={400} alt={name}/></div>
  )
}

export default BridalPartyCard