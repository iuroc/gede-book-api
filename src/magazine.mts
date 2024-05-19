/// <reference path="types.d.mts" />

export class Magazine {
    private static gedeId = 847516381
    /** 获取类别列表 */
    static async getCategories(): Promise<{ id: number, name: string }[]> {
        const url = `https://gede.5read.com/apis/magazine/magazineCatas.jspx?gedeid=${this.gedeId}`
        const data = await fetch(url).then(res => res.json()) as ResData<ResCategory[]>
        if (!data.result) throw new Error(data.errorMsg)
        return data.msg.map(item => ({
            id: item.id,
            name: item.cataName
        }))
    }

    /** 加载指定类别的期刊列表 */
    static async getList(catagoryId: number, page = 0, pageSize = 72): Promise<MagazineItem[]> {
        const params = new URLSearchParams({
            gedeid: '847516381',
            cataid: catagoryId.toString(),
            page: (page + 1).toString(),
            pageSize: pageSize.toString()
        }).toString()
        const url = `http://gede.5read.com/apis/magazine/magazines.jspx?${params}`
        const data = await fetch(url).then(res => res.json()) as ResData<{
            allCount: number
            list: ResMagazineItem[]
        }>
        if (!data.result) throw new Error(data.errorMsg)
        return data.msg.list.map(item => ({
            name: item.name,
            id: item.id,
            surl: item.surl,
            summary: item.summary,
            cover: item.coverPath,
            cn: item.cN,
            issn: item.iSSN
        }))
    }

    /**
     * 获取期刊的分期列表
     * @param id 期刊编号
     * @returns 
     */
    static async getIssues(id: number): Promise<IssueItem[]> {
        const url = `http://gede.5read.com/apis/magazine/magazineItems.jspx?magazineid=${id}`
        const data = await fetch(url).then(res => res.json()) as ResData<{
            itemList: ResIssueItem[],
            magazine: ResMagazineItem
        }>
        if (!data.result) throw new Error(data.errorMsg)
        return data.msg.itemList.map(item => ({
            issueId: item.magazineItemNum,
            name: item.issue,
            cover: item.coverPath,
            magazineName: item.name,
            qrCode: item.codeImg,
            surl: item.surl,
            webReader: `http://gede.5read.com/other/epub/read4tm.jsp?a=GEDE:${item.surl}`
        }))
    }

    /**
     * 获取期刊正文和目录数据
     * @param surl 某期的 `surl`
     * @param issueId 某期编号
     * @param page 页码
     * @param pageSize 数据条数
     * @param width 阅读器宽度像素，影响计算单页字数
     * @param height 阅读器高度像素，影响计算单页字数
     * @returns
     */
    static async getData(surl: string, issueId: string, page = 0, pageSize = 36, width = 1500, height = 1500): Promise<BookData> {
        const detailURL = await this.getDetailURL(surl)
        const params = new URLSearchParams({
            page: (page + 1).toString(),
            psize: pageSize.toString(),
            sid: issueId,
            w: width.toString(),
            h: height.toString(),
            /** 从在线阅读器 HTML 动态获取 */
            detailUrl: detailURL,
            /** 必填固定值 */
            from: '5'
        }).toString()
        const url = `http://gede.5read.com/other/epub_epubRead_read.jspx?${params}`
        const data = await fetch(url).then(res => res.json()) as ResData<ResBookData>
        if (!data.result) throw new Error(data.errorMsg)
        return {
            catalogs: data.msg.catalogs,
            contents: data.msg.contents
        }
    }

    /** 获取期刊目录数据 */
    static async getCatalog(surl: string, issueId: string) {
        return await this.getData(surl, issueId, 1, 0)
    }

    private static async getDetailURL(surl: string) {
        const url = `http://gede.5read.com/other/epub/read4tm.jsp?a=GEDE:${surl}`
        const data = await fetch(url).then(res => res.text())
        const detailUrlMatch = data.match(/var\s*detailUrl\s*=\s*"([^"]+)"/)
        if (!detailUrlMatch) throw new Error('获取 detailUrl 失败')
        return detailUrlMatch[1]
    }

}

type ResIssueItem = {
    coverPath: string
    issue: string
    codeImg: string
    name: string
    surl: string
    id: number
    sort: string
    magazineid: number
    urlid: number
    magazineItemNum: string
}

/** HTTP 响应中的期刊列表项 */
type ResMagazineItem = {
    /** 期刊介绍 */
    summary: string
    /** 封面地址 */
    coverPath: string
    magazineNum: string
    iSSN: string
    /** 期刊名称 */
    name: string
    surl: string
    cN: string
    /** 期刊编号，用于获取分期列表 */
    id: number
    urlid: number
}

export type MagazineItem = {
    /** 期刊名称 */
    name: string
    /** 在线阅读器所需参数 */
    surl: string
    /** 期刊编号 */
    id: number
    /** 国内刊号 */
    cn: string
    /** 国际刊号 */
    issn: string
    /** 期刊介绍 */
    summary: string
    /** 封面地址 */
    cover: string
}

export type IssueItem = {
    issueId: string
    magazineName: string
    cover: string
    name: string
    qrCode: string
    surl: string
    webReader: string
}

type ResCategory = {
    id: number
    cataName: string
    version: string
}