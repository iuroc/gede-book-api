var p=Object.defineProperty;var i=(d,e)=>p(d,"name",{value:e,configurable:!0});class h{static{i(this,"Book")}static gedeId=847516381;static async getCategories(){const e=i(async r=>{const s=`https://gede.5read.com/apis/touchBook/bookCata.jspx${typeof r>"u"?"":`?gedeid=${r}`}`,n=await fetch(s).then(o=>o.json());if(!n.result)throw new Error(n.errorMsg);return n.msg.map(o=>({id:o.id,name:o.cataname}))},"getData");return(await Promise.all([e(this.gedeId),e()])).flat()}static async getList(e,r=0,t=72){const n=`https://gede.5read.com/apis/touchBook/books.jspx?${new URLSearchParams({cataid:e.toString(),page:(r+1).toString(),pageSize:t.toString()}).toString()}`,o=await fetch(n).then(a=>a.json());if(!o.result)throw new Error(o.errorMsg);return o.msg.list.map(a=>({name:a.title,author:a.author,bigCover:a.bcover,smallCover:a.cover,id:a.bookNum,price:a.price,publish:a.publish,summary:a.summary,surl:a.surl,webReader:`http://gede.5read.com/other/epub/read4tm.jsp?a=GEDE:${a.surl}`,type:a.type,isbn:a.isbn}))}static async getInfo(e){const r=`http://gede.5read.com/apis/touchBook/book.jspx?bookNum=${e}`,t=await fetch(r).then(s=>s.json());if(!t.result)throw new Error(t.errorMsg);return{name:t.msg.title,author:t.msg.author,bigCover:t.msg.bcover,smallCover:t.msg.cover,id:t.msg.bookNum,price:t.msg.price,publish:t.msg.publish,summary:t.msg.summary,surl:t.msg.surl,epub:t.msg.path,publishTime:t.msg.pubTime,webReader:`http://gede.5read.com/other/epub/read4tm.jsp?a=GEDE:${t.msg.surl}`,type:t.msg.type,isbn:t.msg.isbn}}static async getData(e,r=0,t=36,s=1500,n=1500){const a=`http://gede.5read.com/other/epub_epubRead_read.jspx?${new URLSearchParams({page:(r+1).toString(),psize:t.toString(),sid:e,w:s.toString(),h:n.toString(),detailUrl:`http://gede.5read.com/apis/touchBook/book.jspx?bookNum=${e}`,from:"4"}).toString()}`,c=await fetch(a).then(u=>u.json());if(!c.result)throw new Error(c.errorMsg);return{catalogs:c.msg.catalogs,contents:c.msg.contents}}static async getCatalog(e,r=1500,t=1500){return await this.getData(e,1,0,r,t)}}class l{static{i(this,"Magazine")}static gedeId=847516381;static async getCategories(){const e=`https://gede.5read.com/apis/magazine/magazineCatas.jspx?gedeid=${this.gedeId}`,r=await fetch(e).then(t=>t.json());if(!r.result)throw new Error(r.errorMsg);return r.msg.map(t=>({id:t.id,name:t.cataName}))}static async getList(e,r=0,t=72){const n=`http://gede.5read.com/apis/magazine/magazines.jspx?${new URLSearchParams({gedeid:"847516381",cataid:e.toString(),page:(r+1).toString(),pageSize:t.toString()}).toString()}`,o=await fetch(n).then(a=>a.json());if(!o.result)throw new Error(o.errorMsg);return o.msg.list.map(a=>({name:a.name,id:a.id,surl:a.surl,summary:a.summary,cover:a.coverPath,cn:a.cN,issn:a.iSSN}))}static async getIssues(e){const r=`http://gede.5read.com/apis/magazine/magazineItems.jspx?magazineid=${e}`,t=await fetch(r).then(s=>s.json());if(!t.result)throw new Error(t.errorMsg);return t.msg.itemList.map(s=>({issueId:s.magazineItemNum,name:s.issue,cover:s.coverPath,magazineName:s.name,qrCode:s.codeImg,surl:s.surl,webReader:`http://gede.5read.com/other/epub/read4tm.jsp?a=GEDE:${s.surl}`}))}static async getData(e,r,t=0,s=36,n=1500,o=1500){const a=await this.getDetailURL(e),u=`http://gede.5read.com/other/epub_epubRead_read.jspx?${new URLSearchParams({page:(t+1).toString(),psize:s.toString(),sid:r,w:n.toString(),h:o.toString(),detailUrl:a,from:"5"}).toString()}`,g=await fetch(u).then(m=>m.json());if(!g.result)throw new Error(g.errorMsg);return{catalogs:g.msg.catalogs,contents:g.msg.contents}}static async getCatalog(e,r,t=1500,s=1500){return await this.getData(e,r,1,0,t,s)}static async getDetailURL(e){const r=`http://gede.5read.com/other/epub/read4tm.jsp?a=GEDE:${e}`,s=(await fetch(r).then(n=>n.text())).match(/var\s*detailUrl\s*=\s*"([^"]+)"/);if(!s)throw new Error("\u83B7\u53D6 detailUrl \u5931\u8D25");return s[1]}}export{h as Book,l as Magazine};
//# sourceMappingURL=index.mjs.map