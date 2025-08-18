const fs = require("fs");
const path = require("path");
const { glob } = require("glob"); // destructuring car pas de default export

const SRC_DIR = path.resolve("./src");
const ALIAS = "@";

(async () => {
    try {
        const files = await glob(`${SRC_DIR}/**/*.{ts,tsx}`);

        files.forEach((file) => {
            let content = fs.readFileSync(file, "utf8");
            let updatedContent = content.replace(
                new RegExp(`from ['"]${ALIAS}/([^'"]+)['"]`, "g"),
                (match, importPath) => {
                    const absoluteImport = path.resolve(SRC_DIR, importPath);
                    const relativePath = path.relative(path.dirname(file), absoluteImport);
                    return `from "${relativePath.startsWith(".") ? relativePath : "./" + relativePath}"`;
                }
            );

            if (content !== updatedContent) {
                fs.writeFileSync(file, updatedContent, "utf8");
                console.log(`✅ Mis à jour : ${file}`);
            }
        });

        console.log("🎯 Remplacement terminé !");
    } catch (err) {
        console.error("Erreur :", err);
    }
})();
