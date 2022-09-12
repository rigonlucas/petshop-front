import { nextTick, reactive, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export default function useReactiveRouteParams<T extends Record<string, any>>(paramsObject: T) {
    const route = useRoute()
    const reactiveParams = reactive<T>({ ...paramsObject, ...route.query })
    const router = useRouter()

    watch(reactiveParams, (newObject: Record<string, any>) => {
        nextTick(() => {
            router.push({ query: { ...route.query, ...newObject } })
        })
    })

    return reactiveParams
}
