// lib/wdyr.ts
import React from 'react'
import whyDidYouRender from '@welldone-software/why-did-you-render'

if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  console.log('YESSS')
  whyDidYouRender(React, {
    trackAllPureComponents: true,
  })
}
