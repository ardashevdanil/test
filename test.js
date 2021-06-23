const { exec } = require('child_process')

try {
  exec('git rev-parse --short HEAD', (err, hash) => {
    if (err) throw err
    if (!process.env.N) return console.log('Usage: N={server number} node test.js')

    const tag = `testing${process.env.N}-${hash}`
    
    exec(`git tag ${tag}`, () => {
      exec(`git push origin ${tag}`, (e) => {
        if (e) throw e
      })
    })
  })
} catch (e) {
  console.log(e)
}
