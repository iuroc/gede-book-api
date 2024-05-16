import { Magazine } from './magazine.mjs'

const magazines = await Magazine.getList(3)
const issues = await Magazine.getIssues(magazines[0].id)
const data = await Magazine.getData(issues[0].surl, issues[0].issueId)
console.log(data)