export type ResData<Data> = {
    result: true
    msg: Data
} | {
    result: false
    errorMsg: string
}

/** 图书正文和目录数据 */
export type BookData = {
    contents: string[]
    catalogs: {
        page: number,
        title: string
        children: BookData['catalogs']
    }[]
}

/** HTTP 响应中的图书正文和目录数据 */
export type ResBookData = BookData & {
    pageAll: number
    fontsize: number
    pageSize: number
    page: number
    hasGif: number
}