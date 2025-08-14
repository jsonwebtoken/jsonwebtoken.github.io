import fs from "fs"
import path from "path"

const filePath = path.join(process.cwd(), "/scripts/example-repos.json")
const reposGroup = JSON.parse(fs.readFileSync(filePath, "utf-8"))

async function getStars(repoUrl) {
    const match = repoUrl.match(/github\.com\/([^/]+)\/([^/]+)(?:\/|$)/)
    if(!match) throw new Error(`Invalid github repo URL: ${repoUrl}`)
    const [, owner, repo] = match
    const res = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
        headers: {
            Accept: "application/vnd.github+json"
        }
    })
    if(!res.ok) throw new Error(`${repoUrl} -> ${res.status} ${res.statusText}`)
    const data = await res.json()
    return data.stargazers_count ?? null
}

(async () => {
    const objectEntries = Object.values(reposGroup)
    for(const group of objectEntries) {
        for(const lib of group.libs) {
            try {
                const stars = await getStars(lib.repoUrl)
                lib.stars = stars
                console.log(`✅ ${lib.repoUrl} -> ${stars}`)
            } catch(e) {
                lib.stars = null
                console.error(`❌ ${lib.repoUrl}:  ${e.message}`)
            }
        }
    }
    fs.writeFileSync(filePath, JSON.stringify(reposGroup, null, 2) + "\n")
})()