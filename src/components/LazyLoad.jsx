import React from 'react'
import { lazy } from 'react'

const LazyLoad = (path, namedExport) => {
    return lazy(() => {

        const promise = import(path /* @vite-ignore */)
        if (namedExport == null)
            return promise
        else return promise.then(module => ({ default: module[namedExport] }))
    })
}

export default LazyLoad