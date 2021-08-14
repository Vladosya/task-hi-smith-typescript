import { GetterTree, MutationTree } from 'vuex/types/index'
import json from '../server/data.json'
import { JsonType } from '~/types'

type StateType = {
  total: number
  content: any[]
  items: JsonType[]
  item: any[]
  title: string
  sortByDate: boolean
}

type ContentTypeImage = {
  link: string[]
  title: string[]
  url: string[]
}

type ContentType = {
  description: string[]
  image: ContentTypeImage[]
  item: JsonType[]
  link: string[]
  pubDate: string[]
  title: string[]
}

export const state = (): StateType => ({
  total: 0 as number,
  content: [] as ContentType[],
  items: [] as JsonType[],
  item: [] as JsonType[],
  title: '' as string,
  sortByDate: false as boolean,
})

export type RootState = ReturnType<typeof state>

export const mutations: MutationTree<RootState> = {
  getContent(state: StateType): void {
    state.content = json
    if (state.content.length > 0) {
      state.total = state.content[0].item.length
      state.title = state.content[0].title[0]

      state.items = state.content[0].item
      state.items = state.items.map((item: JsonType, index: number) => {
        return {
          id: index + 1,
          author: item.author,
          description: item.description,
          enclosure: item.enclosure,
          guid: item.guid,
          link: item.link,
          pubDate: item.pubDate,
          title: item.title,
        }
      })
    }
  },
  sortByLow(state: StateType): void {
    state.items = state.items.sort(function (a, b) {
      return +new Date(a.pubDate[0]) - +new Date(b.pubDate[0])
    })
    state.sortByDate = true
  },
  sortByHigh(state: StateType): void {
    state.items = state.items.sort(function (a, b) {
      return +new Date(b.pubDate[0]) - +new Date(a.pubDate[0])
    })
    state.sortByDate = false
  },
  getItemById(state: StateType, payload: number): void {
    state.item = state.items.filter((i) => {
      return i.id === payload
    })
  },
}

export const getters: GetterTree<StateType, RootState> = {
  items: (state): JsonType[] => state.items,
  item: (state): JsonType[] => state.item,
}
