import { makeMap } from 'shared/util'
import { isDef } from 'core/util/index'

export * from './class'
export * from './throttle'
export * from './aop'
export * from './buffer'
export * from './platform'
export * from './vars'

export const notEmpty = e => !!e
export const isPreTag = (tag) => tag === 'pre'

export const isReservedTag = makeMap(
  'template,script,style,element,content,slot,link,meta,svg,view,' +
  'a,div,img,image,text,span,richtext,input,switch,textarea,spinner,select,' +
  'slider,slider-neighbor,indicator,trisition,trisition-group,canvas,' +
  'list,cell,header,loading,loading-indicator,refresh,scrollable,scroller,' +
  'video,web,embed,tabbar,tabheader,datepicker,timepicker,marquee,countdown',
  true
)

// these are reserved for web because they are directly compiled away
// during template compilation
export const isReservedAttr = makeMap('style,class')

// Elements that you can, intentionally, leave open (and which close themselves)
// more flexable than web
export const canBeLeftOpenTag = makeMap(
  'web,spinner,switch,video,textarea,canvas,' +
  'indicator,marquee,countdown',
  true
)

export const isUnaryTag = makeMap(
  'embed,img,image,input,link,meta',
  true
)

export function mustUseProp () { /* console.log('mustUseProp') */ }
export function getTagNamespace () { /* console.log('getTagNamespace') */ }
export function isUnknownElement () { /* console.log('isUnknownElement') */ }

export const eventTypeMap = {
  tap: ['tap', 'click']
}

export function getValue (obj = {}, path = '') {
  const paths = typeof path === 'string' ? path.split('.') : path
  return paths.reduce((prev, k) => {
    /* istanbul ignore if */
    if (prev && isDef(prev)) {
      prev = prev[k]
    }
    return prev
  }, obj)
}

export function deepEqual (a, b) {
  const aType = typeof a
  const bType = typeof b
  if (aType !== 'object' || bType !== 'object' || aType !== bType) {
    return a === b || (a === '' && b === undefined) || (a === undefined && b === '')
  } else {
    if (Array.isArray(a)) {
      if (a.length !== b.length) {
        return false
      }
    }
    for (const k in a) {
      if (!deepEqual(a[k], b[k])) {
        return false
      }
    }
  }
  return true
}
