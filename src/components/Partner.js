import React from 'react'
import { aiel, aws, calculators, esmprop, magetsi, solvaxion, wildrose } from '../assets'

function Partner() {
  return (
    <div className='bodyP'>
      <div class="inline-flex w-full flex-nowrap overflow-hidden bg-white [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-200px),transparent_100%)]">
  <ul class="brands-wrapper">
    <li>
      <img src={solvaxion} width="250" height="100" />
    </li>
    <li>
      <img src={magetsi} width="250" height="100" />
    </li>
    <li><img src={wildrose} width="250" height="100" /></li>
    <li><img src={esmprop} width="250" height="100" /></li>
    <li><img src={calculators} width="250" height="100" /></li>
    <li><img src={aiel} width="250" height="100" /></li>
    <li><img src={aws} width="250" height="100" /></li>
  </ul>
  <ul class="brands-wrapper" aria-hidden="true">
    <li>
      <img src={solvaxion} width="250" height="100" />
    </li>
    <li>
      <img src={magetsi} width="250" height="100" />
    </li>
    <li><img src={wildrose} width="250" height="100" /></li>
    <li><img src={esmprop} width="250" height="100" /></li>
    <li><img src={calculators} width="250" height="100" /></li>
    <li><img src={aiel} width="250" height="100" /></li>
    <li><img src={aws} width="250" height="100" /></li>
  </ul>
</div>
    </div>
  )
}

export default Partner
