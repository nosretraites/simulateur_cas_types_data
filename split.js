const fs = require('fs')

content = fs.readFileSync("Tableau.csv", "utf-8")
rows = content.split("\n")
header = rows.shift()

rowsByYear = {}
rows.forEach(r => {
  if (!r.length) {
    return
  }
  year = r.slice(0, '1969'.length)
  yearDataset = rowsByYear[year] || [header]
  yearDataset.push(r)
  rowsByYear[year] = yearDataset
})

const fileIds = Object.keys(rowsByYear)

fileIds.forEach(id => {
  fs.writeFileSync(`data/${id}.csv`, rowsByYear[id].join('\n'))
})
