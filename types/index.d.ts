export type EnclosureType = {
  $: {
    length: string
    type: string
    url: string
  }
}

export type JsonType = {
  author: string[]
  description: string[]
  enclosure: EnclosureType[]
  guid: string[]
  id: number
  link: string[]
  pubDate: string[]
  title: number[]
}
