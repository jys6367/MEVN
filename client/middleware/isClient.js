export default function ({redirect}) {
    process.server && redirect("/")
}