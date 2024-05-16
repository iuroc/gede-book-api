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
}

type ResCategory = {
    id: number
    cataName: string
    version: string
}